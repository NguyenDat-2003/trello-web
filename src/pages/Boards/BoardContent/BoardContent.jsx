import { useEffect, useState, useCallback, useRef } from 'react'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  rectIntersection,
  getFirstCollision,
  closestCenter
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

import { mapOrder } from '~/utils/sorts'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep } from 'lodash'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  // https://docs.dndkit.com/api-documentation/sensors
  //--- Yêu cầu chuột move khoảng 10px thì mới gọi hàm handleDragEnd, fix bug khi click vào bị gọi hàm handleDragEnd
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })

  //--- Nhấn giữ 100ms, dung sai cảm ứng 500px thì mới gọi hàm handleDragEndhandleDragEnd
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })

  // -- Ưu tiên sử dụng 2 loại sensors là mouse và touch để trải nghiệm trên mobile tốt nhất không bị bug
  const sensors = useSensors(mouseSensor, touchSensor)
  const [orderedColumns, setOrderedColumns] = useState([])
  // --- Cùng một thời điểm chỉ có một phần tử được kéo là column hoặc card
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemIdType] = useState(null)
  const [activeDragItemData, setActiveDragItemIdData] = useState(null)
  const [oldColumnWhenDragCard, setOldColumnWhenDragCard] = useState(null)

  const lastOverId = useRef(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) => column.cards.map((card) => card._id)?.includes(cardId))
  }

  const moveCardBetweenDifferentColumn = (overColumn, overCardId, active, over, activeColumn, activeCardId, activeCardData) => {
    setOrderedColumns((prevColumns) => {
      const overCardIndex = overColumn?.cards?.findIndex((card) => card._id === overCardId)

      // -- Logic tính toán cardActiveIndex mới sau khi kéo cardActive sang column mới
      let newCardIndex
      const isBelowOverItem = active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards.length + 1

      //--- Clone mảng columns cũ để xử lý data rồi return - cập nhật mảng columns mới
      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find((column) => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find((column) => column._id === overColumn._id)

      if (nextActiveColumn) {
        //-- Xóa card ở colum active
        nextActiveColumn.cards = nextActiveColumn.cards.filter((card) => card._id !== activeCardId)

        // --- Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((card) => card._id)
      }

      if (nextOverColumn) {
        //--- Kiểm tra card đang kéo có tồn tại ở overColumn hay ch, nếu có thì xóa nó trước
        nextOverColumn.cards = nextOverColumn.cards.filter((card) => card._id !== activeCardId)

        // --- Phải cập nhật lại columnId trong card khi kéo card sang column mới
        const rebuild_activeCardData = {
          ...activeCardData,
          columnId: nextOverColumn._id
        }

        // --- THêm card đang kéo vào overColumn theo vị trí Index mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeCardData)

        // --- Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card) => card._id)
      }
      return nextColumns
    })
  }

  //-- hành động khi kéo một phần tử
  const handleDragStart = (e) => {
    // console.log('handleDragStart', e)
    setActiveDragItemId(e?.active?.id)
    setActiveDragItemIdType(e?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemIdData(e?.active?.data?.current)

    if (e?.active?.data?.current?.columnId) {
      setOldColumnWhenDragCard(findColumnByCardId(e?.active?.id))
    }
  }

  //--- Trong quá trình kéo
  const handleDragOver = (e) => {
    //--- Không làm gì nếu dang kéo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    // --- Còn nếu kéo card thì xử lý thêm qua lại giữa cái columns
    // console.log(e)
    const { active, over } = e

    //--- Nếu vị trí sau khi kéo thả(over) không tồn taị trong mảng ban đầu thì return
    if (!active || !over) return

    // --- activeCardData là card đang được kéo
    const {
      id: activeCardId,
      data: { current: activeCardData }
    } = active
    // --- overCardData là card được tương tác với card đang được kéo đến
    const { id: overCardId } = over

    const activeColumn = findColumnByCardId(activeCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return

    // --- Khi chúng ta kéo thả card trong 2 columns khác nhau thì mới xử lý logic, nếu kéo trong cùng 1 column thì không làm gì
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumn(overColumn, overCardId, active, over, activeColumn, activeCardId, activeCardData)
    }
  }

  //-- hành động khi kết thúc việc kéo một phần tử
  const handleDragEnd = (e) => {
    // console.log(e)
    const { active, over } = e

    //--- Nếu vị trí sau khi kéo thả(over) không tồn taị trong mảng ban đầu thì return
    if (!active || !over) return

    // --- Xử lý kéo thả Card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // --- activeCardData là card đang được kéo
      const {
        id: activeCardId,
        data: { current: activeCardData }
      } = active
      // --- overCardData là card được tương tác với card đang được kéo đến
      const { id: overCardId } = over

      const activeColumn = findColumnByCardId(activeCardId)
      const overColumn = findColumnByCardId(overCardId)

      if (!activeColumn || !overColumn) return

      // --- Phải dùng state mới để lưu các card trong column cũ lại bởi vì sau khi qua onDragOver thì state của card đã được cập nhật mới lại r
      if (oldColumnWhenDragCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumn(overColumn, overCardId, active, over, activeColumn, activeCardId, activeCardData)
      } else {
        // --- Hành động kéo thả card trong cùng 1 column
        //---Lấy vị trí cũ từ oldColumnWhenDragCard
        const oldCardIndex = oldColumnWhenDragCard?.cards.findIndex((c) => c._id === activeDragItemId)
        const newCardIndex = overColumn?.cards.findIndex((c) => c._id === overCardId)

        //--- Dùng ArrayMove kéo card trong 1 column tương tự logic kéo columns trong BoardContent
        const dndOrderedCards = arrayMove(oldColumnWhenDragCard?.cards, oldCardIndex, newCardIndex)

        setOrderedColumns((prevColumns) => {
          //--- Clone mảng columns cũ để xử lý data rồi return - cập nhật mảng columns mới
          const nextColumns = cloneDeep(prevColumns)

          // --- Tìm tới column mà mình đang kéo thả
          const targetColumn = nextColumns.find((column) => column._id === overColumn._id)
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map((card) => card._id)
          return nextColumns
        })
      }
    }

    // --- Xử lý kéo thả Columns trong BoardContent
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      //--- Nếu vị trí sau khi kéo thả khác với vị trí ban đầu
      if (active.id !== over.id) {
        //---Lấy vị trí cũ từ active
        const oldColumnIndex = orderedColumns.findIndex((c) => c._id === active.id)
        const newColumnIndex = orderedColumns.findIndex((c) => c._id === over.id)

        //--- Logic kéo columns trong BoardContent (arrayMove)
        const dndOrderedComlumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
        // console.log(dndOrderedComlumns)
        // const orderColumnsIds = dndOrderedComlumns.map((c) => c._id)
        // console.log(orderColumnsIds)

        //--Cập nhật lại state columns ban đầu sau khi đã kéo thả
        setOrderedColumns(dndOrderedComlumns)
      }
    }

    setActiveDragItemId(null)
    setActiveDragItemIdType(null)
    setActiveDragItemIdData(null)
    setOldColumnWhenDragCard(null)
  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragItemType === activeDragItemType.COLUMN) {
        return closestCorners({ ...args })
      }

      const pointerIntersections = pointerWithin(args)
      const interSections = pointerIntersections?.length > 0 ? pointerIntersections : rectIntersection(args)

      let overId = getFirstCollision(interSections, 'id')

      if (overId) {
        const checkColumn = orderedColumns.find((column) => column._id === overId)
        if (checkColumn) {
          overId = closestCenter({
            ...args,
            droppableContainers: args.droppableContainers.filter((container) => container.id !== overId && checkColumn?.cardOrderIds?.includes(container.id))
          })[0]?.id
        }
        lastOverId.current = overId
        return [{ id: overId }]
      }

      return lastOverId.current ? [{ id: lastOverId }] : []
    },
    [activeDragItemType]
  )

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      // --- Thuật toán phát hiện va chạm ( nếu không có nó thì card với cover lớn sẽ không kéo qua column dc vì lúc này nó đang bị conflict giữa card và column ), chúng ta sử dụng closestCorners thay vì closestCenter
      // collisionDetection={closestCorners}
      // Tự custom nâng cao thuật toán phá hiện va chạm fix bug
      collisionDetection={collisionDetectionStrategy}
    >
      <Box
        sx={{
          width: ' 100%',
          height: (theme) => theme.trello.boardContentheight,
          bgcolor: (theme) => (theme.palette.mode == 'dark' ? '#34495e' : '#009688'),
          p: '10px 0px'
        }}
      >
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && <Column column={activeDragItemData} />}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent

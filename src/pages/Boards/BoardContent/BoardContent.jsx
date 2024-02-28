import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, DragOverlay, defaultDropAnimationSideEffects, closestCorners } from '@dnd-kit/core'
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

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) => column.cards.map((card) => card._id)?.includes(cardId))
  }

  //-- hành động khi kéo một phần tử
  const handleDragStart = (e) => {
    // console.log('handleDragStart', e)
    setActiveDragItemId(e?.active?.id)
    setActiveDragItemIdType(e?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemIdData(e?.active?.data?.current)
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
      setOrderedColumns((prevColumns) => {
        const overCardIndex = overColumn?.cards?.findIndex((card) => card._id === overCardId)

        // -- Logic tính toán cardActiveIndex mới sau khi kéo cardActive sang column mới
        let newCardIndex
        const isBelowOverItem = active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0
        newCardIndex = overCardId >= 0 ? overCardId + modifier : overColumn?.cards.length + 1

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

          // --- THêm card đang kéo vào overColumn theo vị trí Index mới
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeCardData)

          // --- Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
          // nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card) => card._id)
        }
        return nextColumns
      })
    }
  }

  //-- hành động khi kết thúc việc kéo một phần tử
  const handleDragEnd = (e) => {
    // console.log(e)

    // if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
    //   // console.log('card')
    // }

    const { active, over } = e

    //--- Nếu vị trí sau khi kéo thả(over) không tồn taị trong mảng ban đầu thì return
    if (!active || !over) return

    //--- Nếu vị trí sau khi kéo thả khác với vị trí ban đầu
    if (active.id !== over.id) {
      //---Lấy vị trí cũ từ active
      const oldIndex = orderedColumns.findIndex((c) => c._id === active.id)
      const newIndex = orderedColumns.findIndex((c) => c._id === over.id)

      const dndOrderedComlumns = arrayMove(orderedColumns, oldIndex, newIndex)
      // console.log(dndOrderedComlumns)
      // const orderColumnsIds = dndOrderedComlumns.map((c) => c._id)
      // console.log(orderColumnsIds)

      //--Cập nhật lại state columns ban đầu sau khi đã kéo thả
      setOrderedColumns(dndOrderedComlumns)
    }

    setActiveDragItemId(null)
    setActiveDragItemIdType(null)
    setActiveDragItemIdData(null)
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

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      // --- Thuật toán phát hiện va chạm ( nếu không có nó thì card với cover lớn sẽ không kéo qua column dc vì lúc này nó đang bị conflict giữa card và column ), chúng ta sử dụng closestCorners thay vì closestCenter
      collisionDetection={closestCorners}
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

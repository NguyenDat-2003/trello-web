import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

import { mapOrder } from '~/utils/sorts'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

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

  //-- hành động khi kéo một phần tử
  const handleDragStart = (e) => {
    // console.log('handleDragStart', e)
    setActiveDragItemId(e?.active?.id)
    setActiveDragItemIdType(e?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemIdData(e?.active?.data?.current)
  }

  //-- hành động khi kết thúc việc kéo một phần tử
  const handleDragEnd = (e) => {
    // console.log(e)
    const { active, over } = e

    //--- Nếu vị trí sau khi kéo thả(over) không tồn taị trong mảng ban đầu thì return
    if (!over) return

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
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
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

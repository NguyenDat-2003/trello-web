import Container from '@mui/material/Container'

import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import { createNewColumnAPI, fetchBoardDetailAPI, createNewCardAPI, updateBoardDetailAPI } from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '65e5d382880504b65405d846'
    fetchBoardDetailAPI(boardId).then((board) => {
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        }
      })
      // console.log(board)
      setBoard(board)
    })
  }, [])

  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })

    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    // ---Sau khi tạo mới thì cập nhật State dữ liệu board
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })

    // ---Sau khi tạo mới thì cập nhật dữ liệu Columns
    const newBoard = { ...board }
    const columntoUpdate = newBoard.columns.find((column) => column._id == createdCard.columnId)
    if (columntoUpdate) {
      columntoUpdate.cards.push(createdCard)
      columntoUpdate.cardOrderIds.push(createdCard._id)
    }
    setBoard(newBoard)
  }

  // Func này có nhiệm vụ gọi API sau khi kéo thả columns xong
  const moveColumn = async (dndOrderedComlumns) => {
    const dndOrderedColumnsIds = dndOrderedComlumns.map((c) => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedComlumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    // --- Gọi API Update Board
    await updateBoardDetailAPI(newBoard._id, {
      columnOrderIds: dndOrderedColumnsIds
    })
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      {/* Optional chaining  mockData?.board*/}
      <BoardBar board={board} />
      <BoardContent board={board} createNewColumn={createNewColumn} createNewCard={createNewCard} moveColumn={moveColumn} />
    </Container>
  )
}

export default Board

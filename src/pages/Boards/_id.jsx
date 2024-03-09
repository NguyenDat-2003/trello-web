import Container from '@mui/material/Container'

import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import { createNewColumnAPI, fetchBoardDetailAPI, createNewCardAPI, updateBoardDetailAPI, updateColumnDetailAPI } from '~/apis'
import { isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'
import { mapOrder } from '~/utils/sorts'
import { Box, CircularProgress, Typography } from '@mui/material'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '65e5d382880504b65405d846'
    fetchBoardDetailAPI(boardId).then((board) => {
      // --- Sắp xếp thứ tự các Column luôn ở đây trước khi đưa dữ liệu xuống dưới các component con
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          // --- Sắp xếp thứ tự các Card luôn ở đây trước khi đưa dữ liệu xuống dưới các component con
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
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
  const moveColumns = async (dndOrderedComlumns) => {
    // --- Update cho chuẩn dữ liệu State board
    const dndOrderedColumnsIds = dndOrderedComlumns.map((c) => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedComlumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    // --- Gọi API Update Board
    updateBoardDetailAPI(newBoard._id, {
      columnOrderIds: dndOrderedColumnsIds
    })
  }

  // Func này có nhiệm vụ gọi API sau khi kéo thả cards trong cùng một column
  const moveCardsInColumn = async (dndOrderedCards, dndOrderedCardIds, columnId) => {
    // --- Update cho chuẩn dữ liệu State board
    const newBoard = { ...board }
    const columntoUpdate = newBoard.columns.find((column) => column._id == columnId)
    if (columntoUpdate) {
      columntoUpdate.cards = dndOrderedCards
      columntoUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)

    // --- Gọi API Update Column
    updateColumnDetailAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }

  if (!board) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, width: '100vw', height: '100vh' }}>
        <CircularProgress />
        <Typography>Loading Board...</Typography>
      </Box>
    )
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      {/* Optional chaining  mockData?.board*/}
      <BoardBar board={board} />
      <BoardContent board={board} createNewColumn={createNewColumn} createNewCard={createNewCard} moveColumns={moveColumns} moveCardsInColumn={moveCardsInColumn} />
    </Container>
  )
}

export default Board

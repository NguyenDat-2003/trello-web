import Box from '@mui/material/Box'
import Card from './Card/Card'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

function ListCards({ cards }) {
  return (
    <SortableContext items={cards?.map((c) => c._id)} strategy={verticalListSortingStrategy}>
      <Box
        sx={{
          p: '0 5px 5px 5px',
          m: '0 5px ',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          maxHeight: (theme) => `calc( ${theme.trello.boardContentheight} - ${theme.spacing(5)} - ${theme.trello.column_footer_height} - ${theme.trello.column_header_height})`,
          '&::-webkit-scrollbar': {
            height: '6px',
            width: '6px'
          },
          '&::-webkit-scrollbar-thumb ': {
            backgroundColor: '#bdc3c7',
            borderRadius: '6px'
          },
          '&::-webkit-scrollbar-thumb:hover ': {
            backgroundColor: '#ced0de',
            borderRadius: '6px'
          }
        }}
      >
        {cards?.map((card) => (
          <Card key={card._id} card={card} />
        ))}
      </Box>
    </SortableContext>
  )
}

export default ListCards

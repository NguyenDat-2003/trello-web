import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'

function BoardContent() {
  return (
    <>
      <Box
        sx={{
          width: ' 100%',
          height: (theme) => theme.trello.boardContentheight,
          bgcolor: (theme) => (theme.palette.mode == 'dark' ? '#34495e' : '#009688'),
          p: '10px 0px'
        }}
      >
        <ListColumns />
      </Box>
    </>
  )
}

export default BoardContent

import Box from '@mui/material/Box'

function BoardContent() {
  return (
    <>
      <Box
        sx={{
          width: ' 100%',
          height: (theme) => `calc(100vh - ${theme.trello.headerBarheight} - ${theme.trello.boardBarheight})`,
          display: 'flex',
          alignItems: 'center',
          bgcolor: (theme) => (theme.palette.mode == 'dark' ? '#34495e' : '#009688')
        }}
      >
        Board Content
      </Box>
    </>
  )
}

export default BoardContent

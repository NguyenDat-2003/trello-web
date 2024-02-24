import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'

import Column from './Column/Column'

function ListColumns({ columns }) {
  return (
    <Box
      sx={{
        bgcolor: 'inherit',
        width: ' 100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'none',
        '&::-webkit-scrollbar-track ': {
          m: 2
        }
      }}
    >
      {/* Box Column 1 */}
      {columns?.map((column) => (
        <Column column={column} key={column._id} />
      ))}

      <Box
        sx={{
          minWidth: '200px',
          maxWidth: '200px',
          mx: 2,
          borderRadius: '6px',
          height: 'fit-content',
          bgcolor: '#ffffff3d'
        }}
      >
        <Button
          startIcon={<NoteAddIcon />}
          sx={{
            color: 'white',
            width: '100%',
            justifyContent: 'center'
          }}
        >
          Add new column
        </Button>
      </Box>
    </Box>
  )
}

export default ListColumns

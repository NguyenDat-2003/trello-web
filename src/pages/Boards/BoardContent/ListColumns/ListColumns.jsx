import { useState } from 'react'
import { toast } from 'react-toastify'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'

import Column from './Column/Column'

function ListColumns({ columns, createNewColumn, createNewCard, deleteColumnDetail }) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

  const [newColumntitle, setNewColumntitle] = useState('')
  const addNewColumn = async () => {
    if (!newColumntitle) {
      toast.error('Please Enter Column Title')
      return
    }
    // console.log(newColumntitle)
    const newColumnData = {
      title: newColumntitle
    }
    createNewColumn(newColumnData)

    toggleOpenNewColumnForm()
    setNewColumntitle('')
  }

  // *SortableContext yêu cầu items là một mảng dạng ['id-1','id-2'] chứ khong phải dạng [{id: 'id-1'},{'id: id-2'}]
  return (
    <SortableContext items={columns?.map((c) => c._id)} strategy={horizontalListSortingStrategy}>
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
          <Column column={column} key={column._id} createNewCard={createNewCard} deleteColumnDetail={deleteColumnDetail} />
        ))}
        {!openNewColumnForm ? (
          <Box
            onClick={toggleOpenNewColumnForm}
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
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
        ) : (
          <Box
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
              mx: 2,
              p: 1,
              borderRadius: '6px',
              height: 'fit-content',
              bgcolor: '#ffffff3d',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            <TextField
              type="text"
              label="Enter column title..."
              varient="outlined"
              autoFocus
              size="small"
              value={newColumntitle}
              onChange={(e) => setNewColumntitle(e.target.value)}
              sx={{
                '& label': { color: 'white' },
                '& input': { color: 'white' },
                '& label.Mui-focused': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldSet': {
                    borderColor: 'white'
                  },
                  '&:hover fieldSet': {
                    borderColor: 'white'
                  },
                  '&.Mui-focused fieldSet': {
                    borderColor: 'white'
                  }
                }
              }}
            />

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Button
                onClick={addNewColumn}
                variant="contained"
                color="info"
                size="small"
                sx={{
                  boxShadow: 'none',
                  border: '0.5px solid',
                  borderColor: (theme) => theme.palette.info.main,
                  '&:hover': { bgcolor: (theme) => theme.palette.info.main }
                }}
              >
                Add column
              </Button>
              <CloseIcon
                onClick={toggleOpenNewColumnForm}
                sx={{
                  color: 'white',
                  cursor: 'pointer',
                  '&:hover': { color: (theme) => theme.palette.warning.light }
                }}
                fontSize="small"
              />
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  )
}

export default ListColumns

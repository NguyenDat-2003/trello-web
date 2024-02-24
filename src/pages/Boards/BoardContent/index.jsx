import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import Tooltip from '@mui/material/Tooltip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import AddCardIcon from '@mui/icons-material/AddCard'
import Button from '@mui/material/Button'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

function BoardContent() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

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
          <Box
            sx={{
              minWidth: '300px',
              maxWidth: '300px',
              bgcolor: (theme) => (theme.palette.mode == 'dark' ? '#333643' : '#ebecf0'),
              ml: 2,
              borderRadius: '6px',
              height: 'fit-content',
              maxHeight: (theme) => `calc( ${theme.trello.boardContentheight} - ${theme.spacing(5)})`
            }}
          >
            {/* Box Column Header */}
            <Box
              sx={{
                height: COLUMN_HEADER_HEIGHT,
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Column title
              </Typography>
              <Box>
                <Tooltip title="More options">
                  <ExpandMoreIcon
                    id="basic-button-workspaces"
                    aria-controls={open ? 'basic-menu-columns-dropdown' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    endIcon={<ExpandMoreIcon />}
                    sx={{ color: 'text.primary', cursor: 'pointer' }}
                  />
                </Tooltip>
                <Menu
                  id="basic-menu-columns-dropdown"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button-workspaces'
                  }}
                >
                  <MenuItem>
                    <ListItemIcon>
                      <AddCardIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Add New Card</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ContentCut fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Cut</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ContentCopy fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Copy</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ContentPaste fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Paste</ListItemText>
                  </MenuItem>

                  <Divider />
                  <MenuItem>
                    <ListItemIcon>
                      <DeleteForeverIcon />
                    </ListItemIcon>
                    <ListItemText>Remove this column</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <Cloud fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Archieve this column</ListItemText>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>

            {/* Box Lisr Card */}
            <Box
              sx={{
                p: '0 5px ',
                m: '0 5px ',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                maxHeight: (theme) => `calc( ${theme.trello.boardContentheight} - ${theme.spacing(5)} - ${COLUMN_FOOTER_HEIGHT} - ${COLUMN_HEADER_HEIGHT})`,
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
              <Card
                sx={{
                  cursor: 'pointer',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                  overflow: 'unset'
                }}
              >
                <CardMedia sx={{ height: 140 }} image="	https://c4.wallpaperflare.com/wallpaper/965/883/624/manga-one-piece-wallpaper-preview.jpg" title="green iguana" />
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>DatDev MERN Stack</Typography>
                </CardContent>
                <CardActions sx={{ p: '0px 4px 8px 2px' }}>
                  <Button startIcon={<GroupIcon />} size="small">
                    20
                  </Button>
                  <Button startIcon={<CommentIcon />} size="small">
                    15
                  </Button>
                  <Button startIcon={<AttachmentIcon />} size="small">
                    2
                  </Button>
                </CardActions>
              </Card>

              <Card
                sx={{
                  cursor: 'pointer',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                  overflow: 'unset'
                }}
              >
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  cursor: 'pointer',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                  overflow: 'unset'
                }}
              >
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  cursor: 'pointer',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                  overflow: 'unset'
                }}
              >
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  cursor: 'pointer',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                  overflow: 'unset'
                }}
              >
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  cursor: 'pointer',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                  overflow: 'unset'
                }}
              >
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  cursor: 'pointer',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                  overflow: 'unset'
                }}
              >
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  cursor: 'pointer',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                  overflow: 'unset'
                }}
              >
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  cursor: 'pointer',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                  overflow: 'unset'
                }}
              >
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  cursor: 'pointer',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                  overflow: 'unset'
                }}
              >
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  cursor: 'pointer',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                  overflow: 'unset'
                }}
              >
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  cursor: 'pointer',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                  overflow: 'unset'
                }}
              >
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  cursor: 'pointer',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                  overflow: 'unset'
                }}
              >
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  cursor: 'pointer',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                  overflow: 'unset'
                }}
              >
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  cursor: 'pointer',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                  overflow: 'unset'
                }}
              >
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
            </Box>

            {/* Box Column Footer */}
            <Box
              sx={{
                height: COLUMN_FOOTER_HEIGHT,
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Button startIcon={<AddCardIcon />}>Add new card</Button>
              <Tooltip title="Drag to move">
                <DragHandleIcon sx={{ cursor: 'pointer' }} />
              </Tooltip>
            </Box>
          </Box>

          {/* Box Column 2 */}
          <Box
            sx={{
              minWidth: '300px',
              maxWidth: '300px',
              bgcolor: (theme) => (theme.palette.mode == 'dark' ? '#333643' : '#ebecf0'),
              ml: 2,
              borderRadius: '6px',
              height: 'fit-content',
              maxHeight: (theme) => `calc( ${theme.trello.boardContentheight} - ${theme.spacing(5)})`
            }}
          >
            {/* Box Column Header */}
            <Box
              sx={{
                height: COLUMN_HEADER_HEIGHT,
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Column title
              </Typography>
              <Box>
                <Tooltip title="More options">
                  <ExpandMoreIcon
                    id="basic-button-workspaces"
                    aria-controls={open ? 'basic-menu-columns-dropdown' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    endIcon={<ExpandMoreIcon />}
                    sx={{ color: 'text.primary', cursor: 'pointer' }}
                  />
                </Tooltip>
                <Menu
                  id="basic-menu-columns-dropdown"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button-workspaces'
                  }}
                >
                  <MenuItem>
                    <ListItemIcon>
                      <AddCardIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Add New Card</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ContentCut fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Cut</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ContentCopy fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Copy</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <ContentPaste fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Paste</ListItemText>
                  </MenuItem>

                  <Divider />
                  <MenuItem>
                    <ListItemIcon>
                      <DeleteForeverIcon />
                    </ListItemIcon>
                    <ListItemText>Remove this column</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon>
                      <Cloud fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Archieve this column</ListItemText>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>

            {/* Box Lisr Card */}
            <Box
              sx={{
                p: '0 5px ',
                m: '0 5px ',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                maxHeight: (theme) => `calc( ${theme.trello.boardContentheight} - ${theme.spacing(5)} - ${COLUMN_FOOTER_HEIGHT} - ${COLUMN_HEADER_HEIGHT})`,
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
              <Card
                sx={{
                  cursor: 'pointer',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                  overflow: 'unset'
                }}
              >
                <CardMedia sx={{ height: 140 }} image="	https://c4.wallpaperflare.com/wallpaper/965/883/624/manga-one-piece-wallpaper-preview.jpg" title="green iguana" />
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>DatDev MERN Stack</Typography>
                </CardContent>
                <CardActions sx={{ p: '0px 4px 8px 2px' }}>
                  <Button startIcon={<GroupIcon />} size="small">
                    20
                  </Button>
                  <Button startIcon={<CommentIcon />} size="small">
                    15
                  </Button>
                  <Button startIcon={<AttachmentIcon />} size="small">
                    2
                  </Button>
                </CardActions>
              </Card>

              <Card
                sx={{
                  cursor: 'pointer',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                  overflow: 'unset'
                }}
              >
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  cursor: 'pointer',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                  overflow: 'unset'
                }}
              >
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card 01</Typography>
                </CardContent>
              </Card>
            </Box>

            {/* Box Column Footer */}
            <Box
              sx={{
                height: COLUMN_FOOTER_HEIGHT,
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Button startIcon={<AddCardIcon />}>Add new card</Button>
              <Tooltip title="Drag to move">
                <DragHandleIcon sx={{ cursor: 'pointer' }} />
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default BoardContent

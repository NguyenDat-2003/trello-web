import { useState } from 'react'

import Box from '@mui/material/Box'
import AppsIcon from '@mui/icons-material/Apps'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

import ModeSelect from '~/components/ModeSelect/ModeSelect'
import { ReactComponent as TrelloLogo } from '~/assets/trello.svg'
import WorkSpace from './Menus/WorkSpace'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Profiles from './Menus/Profiles'
import { LibraryAdd } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import InputAdornment from '@mui/material/InputAdornment'

function AppBar() {
  const [searchValue, setSearchValue] = useState('')
  return (
    <>
      <Box
        sx={{
          width: ' 100%',
          height: (theme) => theme.trello.headerBarheight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          paddingX: 2,
          overflowX: 'auto',
          bgcolor: (theme) => (theme.palette.mode == 'dark' ? '#2c3e50' : '#00796b')
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AppsIcon sx={{ color: 'white' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <SvgIcon component={TrelloLogo} inheritViewBox sx={{ color: 'white' }} fontSize="small" />
            <Typography variant="span" sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>
              Trello
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex', gap: 3 } }}>
            <WorkSpace />
            <Recent />
            <Starred />
            <Templates />
            <Button
              variant="outlined"
              startIcon={<LibraryAdd />}
              sx={{
                color: 'white',
                border: 'none',
                '&:hover': {
                  border: 'none'
                }
              }}
            >
              Create
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            id="outlined-search"
            label="Search..."
            size="small"
            sx={{
              minWidth: '120px',
              maxWidth: '200px',
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'white' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <CloseIcon
                    onClick={() => setSearchValue('')}
                    sx={{
                      color: searchValue ? 'white' : 'transparent',
                      cursor: 'pointer'
                    }}
                    fontSize="small"
                  />
                </InputAdornment>
              )
            }}
          />
          <ModeSelect />
          <Tooltip title="Notifications">
            <Badge color="warning" variant="dot" sx={{ cursor: 'pointer' }}>
              <NotificationsNoneIcon sx={{ color: 'white' }} />
            </Badge>
          </Tooltip>

          <Tooltip title="Help">
            <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'white' }} />
          </Tooltip>

          <Profiles />
        </Box>
      </Box>
    </>
  )
}

export default AppBar

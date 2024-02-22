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

import ModeSelect from '~/components/ModeSelect'
import { ReactComponent as TrelloLogo } from '~/assets/trello.svg'
import WorkSpace from './Menus/WorkSpace'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Profiles from './Menus/Profiles'

function AppBar() {
  return (
    <>
      <Box
        px={2}
        sx={{
          width: ' 100%',
          height: (theme) => theme.trello.headerBarheight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AppsIcon sx={{ color: 'primary.main' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <SvgIcon component={TrelloLogo} inheritViewBox sx={{ color: 'primary.main' }} />
            <Typography variant="span" sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.main' }}>
              Trello
            </Typography>
          </Box>
          <WorkSpace />
          <Recent />
          <Starred />
          <Templates />
          <Button variant="outlined">Create</Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField type="search" id="outlined-search" label="Search..." size="small" />
          <ModeSelect />
          <Tooltip title="Notification">
            <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
              <NotificationsNoneIcon />
            </Badge>
          </Tooltip>

          <Tooltip title="Help" sx={{ cursor: 'pointer' }}>
            <HelpOutlineIcon />
          </Tooltip>

          <Profiles />
        </Box>
      </Box>
    </>
  )
}

export default AppBar

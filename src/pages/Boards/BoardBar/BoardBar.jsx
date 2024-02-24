import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitallizeFirstLetter } from '~/utils/formatters'

const MENU_STYLES = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.250'
  }
}

function BoardBar({ board }) {
  return (
    <Box
      sx={{
        width: ' 100%',
        height: (theme) => theme.trello.boardBarheight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        paddingX: 2,
        overflowX: 'auto',
        bgcolor: (theme) => (theme.palette.mode == 'dark' ? '#34495e' : '#009688')
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Chip sx={MENU_STYLES} icon={<SpaceDashboardIcon />} label={board?.title} clickable />
        <Chip sx={MENU_STYLES} icon={<VpnLockIcon />} label={capitallizeFirstLetter(board?.type)} clickable />
        <Chip sx={MENU_STYLES} icon={<AddToDriveIcon />} label="Add to Google Drive" clickable />
        <Chip sx={MENU_STYLES} icon={<BoltIcon />} label="Automation" clickable />
        <Chip sx={MENU_STYLES} icon={<FilterListIcon />} label="Filters" clickable />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button
          ariant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            border: '1px solid white',
            color: 'white'
          }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={6}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: '34px',
              height: '34px',
              fontSize: 16,
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              '&:first-of-type': { bgcolor: '#a4b0be' }
            }
          }}
        >
          <Tooltip title="DatDev">
            <Avatar
              src="https://scontent.fsgn17-1.fna.fbcdn.net/v/t39.30808-6/383496218_1513111766121143_3144856095428973168_n.jpg?_nc_cat=105&cb=99be929b-b574a898&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeEG5RTkkqsy6LSU3GiFLHwa3us57Yx7Dkze6zntjHsOTDcqQZznlMdtu1GTEB0jGtLfT7wBklnVux9ZFk38c7cL&_nc_ohc=WU8qx9BNNVoAX8GZk9S&_nc_ht=scontent.fsgn17-1.fna&oh=00_AfAApNOi8TNEkyxvm_J2apV-dmQg4XmbVesm-CRol80MZQ&oe=65DBCD01"
              alt="datdev"
            />
          </Tooltip>
          <Tooltip title="DatDev">
            <Avatar
              src="https://scontent.fsgn17-1.fna.fbcdn.net/v/t39.30808-6/383496218_1513111766121143_3144856095428973168_n.jpg?_nc_cat=105&cb=99be929b-b574a898&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeEG5RTkkqsy6LSU3GiFLHwa3us57Yx7Dkze6zntjHsOTDcqQZznlMdtu1GTEB0jGtLfT7wBklnVux9ZFk38c7cL&_nc_ohc=WU8qx9BNNVoAX8GZk9S&_nc_ht=scontent.fsgn17-1.fna&oh=00_AfAApNOi8TNEkyxvm_J2apV-dmQg4XmbVesm-CRol80MZQ&oe=65DBCD01"
              alt="datdev"
            />
          </Tooltip>
          <Tooltip title="DatDev">
            <Avatar
              src="https://scontent.fsgn17-1.fna.fbcdn.net/v/t39.30808-6/383496218_1513111766121143_3144856095428973168_n.jpg?_nc_cat=105&cb=99be929b-b574a898&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeEG5RTkkqsy6LSU3GiFLHwa3us57Yx7Dkze6zntjHsOTDcqQZznlMdtu1GTEB0jGtLfT7wBklnVux9ZFk38c7cL&_nc_ohc=WU8qx9BNNVoAX8GZk9S&_nc_ht=scontent.fsgn17-1.fna&oh=00_AfAApNOi8TNEkyxvm_J2apV-dmQg4XmbVesm-CRol80MZQ&oe=65DBCD01"
              alt="datdev"
            />
          </Tooltip>
          <Tooltip title="DatDev">
            <Avatar
              src="https://scontent.fsgn17-1.fna.fbcdn.net/v/t39.30808-6/383496218_1513111766121143_3144856095428973168_n.jpg?_nc_cat=105&cb=99be929b-b574a898&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeEG5RTkkqsy6LSU3GiFLHwa3us57Yx7Dkze6zntjHsOTDcqQZznlMdtu1GTEB0jGtLfT7wBklnVux9ZFk38c7cL&_nc_ohc=WU8qx9BNNVoAX8GZk9S&_nc_ht=scontent.fsgn17-1.fna&oh=00_AfAApNOi8TNEkyxvm_J2apV-dmQg4XmbVesm-CRol80MZQ&oe=65DBCD01"
              alt="datdev"
            />
          </Tooltip>
          <Tooltip title="DatDev">
            <Avatar
              src="https://scontent.fsgn17-1.fna.fbcdn.net/v/t39.30808-6/383496218_1513111766121143_3144856095428973168_n.jpg?_nc_cat=105&cb=99be929b-b574a898&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeEG5RTkkqsy6LSU3GiFLHwa3us57Yx7Dkze6zntjHsOTDcqQZznlMdtu1GTEB0jGtLfT7wBklnVux9ZFk38c7cL&_nc_ohc=WU8qx9BNNVoAX8GZk9S&_nc_ht=scontent.fsgn17-1.fna&oh=00_AfAApNOi8TNEkyxvm_J2apV-dmQg4XmbVesm-CRol80MZQ&oe=65DBCD01"
              alt="datdev"
            />
          </Tooltip>
          <Tooltip title="DatDev">
            <Avatar
              src="https://scontent.fsgn17-1.fna.fbcdn.net/v/t39.30808-6/383496218_1513111766121143_3144856095428973168_n.jpg?_nc_cat=105&cb=99be929b-b574a898&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeEG5RTkkqsy6LSU3GiFLHwa3us57Yx7Dkze6zntjHsOTDcqQZznlMdtu1GTEB0jGtLfT7wBklnVux9ZFk38c7cL&_nc_ohc=WU8qx9BNNVoAX8GZk9S&_nc_ht=scontent.fsgn17-1.fna&oh=00_AfAApNOi8TNEkyxvm_J2apV-dmQg4XmbVesm-CRol80MZQ&oe=65DBCD01"
              alt="datdev"
            />
          </Tooltip>
          <Tooltip title="DatDev">
            <Avatar
              src="https://scontent.fsgn17-1.fna.fbcdn.net/v/t39.30808-6/383496218_1513111766121143_3144856095428973168_n.jpg?_nc_cat=105&cb=99be929b-b574a898&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeEG5RTkkqsy6LSU3GiFLHwa3us57Yx7Dkze6zntjHsOTDcqQZznlMdtu1GTEB0jGtLfT7wBklnVux9ZFk38c7cL&_nc_ohc=WU8qx9BNNVoAX8GZk9S&_nc_ht=scontent.fsgn17-1.fna&oh=00_AfAApNOi8TNEkyxvm_J2apV-dmQg4XmbVesm-CRol80MZQ&oe=65DBCD01"
              alt="datdev"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar

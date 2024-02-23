import { useColorScheme } from '@mui/material/styles'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    const selectedMode = event.target.value
    setMode(selectedMode)
    // setAge(event.target.value)
  }

  return (
    <FormControl size="small" sx={{ minWidth: '120px' }}>
      <InputLabel
        id="label-select-light-dark-mode"
        sx={{
          color: 'white',
          '&.Mui-focused': {
            color: 'white'
          }
        }}
      >
        Mode
      </InputLabel>
      <Select
        labelId="label-select-light-dark-mode"
        id="select-light-dark-mode"
        value={mode}
        label="mode"
        onChange={handleChange}
        sx={{
          color: 'white',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'white'
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white'
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
            border: '1px solid white'
          },
          '& .MuiSvgIcon-root': {
            color: 'white'
          }
        }}
      >
        <MenuItem value="light">
          <Box style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <LightModeOutlinedIcon fontSize="small" /> Light
          </Box>
        </MenuItem>
        <MenuItem value="dark">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DarkModeOutlinedIcon fontSize="small" /> Dark
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SettingsBrightnessOutlinedIcon fontSize="small" /> System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default ModeSelect

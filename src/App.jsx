import Button from '@mui/material/Button'
import HomeIcon from '@mui/icons-material/Home'
import Typography from '@mui/material/Typography'

import { pink } from '@mui/material/colors'

function App() {
  return (
    <>
      <div>DatDev</div>
      <Typography variant="h2" color="text.secondary">
        h1. Heading
      </Typography>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>

      <HomeIcon />
      <HomeIcon color="primary" />
      <HomeIcon color="secondary" />
      <HomeIcon color="success" />
      <HomeIcon color="action" />
      <HomeIcon color="disabled" />
      <HomeIcon sx={{ color: pink[500] }} />
    </>
  )
}

export default App

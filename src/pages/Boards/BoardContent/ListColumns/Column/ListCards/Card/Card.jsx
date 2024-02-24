import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

function Card({ hideCardMedia }) {
  if (hideCardMedia) {
    return (
      <MuiCard
        sx={{
          cursor: 'pointer',
          boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
          overflow: 'unset'
        }}
      >
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography>Card test 01</Typography>
        </CardContent>
      </MuiCard>
    )
  }
  return (
    <MuiCard
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
        <Button
          sx={{
            color: '#03ab9b'
          }}
          startIcon={<GroupIcon />}
          size="small"
        >
          20
        </Button>
        <Button
          sx={{
            color: '#03ab9b'
          }}
          startIcon={<CommentIcon />}
          size="small"
        >
          15
        </Button>
        <Button
          sx={{
            color: '#03ab9b'
          }}
          startIcon={<AttachmentIcon />}
          size="small"
        >
          2
        </Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card

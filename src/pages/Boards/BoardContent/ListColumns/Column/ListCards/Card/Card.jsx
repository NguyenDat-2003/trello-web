import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function Card({ card }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card._id,
    data: { ...card }
  })

  const dndKitcardStyle = {
    // Issue: Variable sized sortables stretched when dragged
    // touchAction: 'none', // Dành cho sensor default dạng pointerSensor
    // ---https://github.com/clauderic/dnd-kit/issues/117
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid #2ecc71' : undefined
  }

  const shouldShowCardActions = () => {
    return card?.memberIds?.length > 0 || card?.comments?.length > 0 || !!card?.attachments?.length > 0
  }

  return (
    <MuiCard
      ref={setNodeRef}
      style={dndKitcardStyle}
      {...attributes}
      {...listeners}
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
        overflow: 'unset',
        display: card?.FE_PlaceholderCard ? 'none' : 'block',
        border: '1px solid transparent',
        '&:hover': { borderColor: (theme) => theme.palette.success.light }
      }}
    >
      {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover} />}
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>{card?.title}</Typography>
      </CardContent>
      {shouldShowCardActions() && (
        <CardActions sx={{ p: '0px 4px 8px 2px' }}>
          {card?.memberIds?.length > 0 && (
            <Button
              sx={{
                color: '#03ab9b'
              }}
              startIcon={<GroupIcon />}
              size="small"
            >
              {card?.memberIds?.length}
            </Button>
          )}
          {card?.comments?.length > 0 && (
            <Button
              sx={{
                color: '#03ab9b'
              }}
              startIcon={<CommentIcon />}
              size="small"
            >
              {card?.comments?.length}
            </Button>
          )}
          {card?.attachments?.length > 0 && (
            <Button
              sx={{
                color: '#03ab9b'
              }}
              startIcon={<AttachmentIcon />}
              size="small"
            >
              {card?.attachments?.length}
            </Button>
          )}
        </CardActions>
      )}
    </MuiCard>
  )
}

export default Card

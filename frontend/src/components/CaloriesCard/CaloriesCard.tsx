import { Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';
import './CaloriesCard.css'
import EmojiEvents from '@mui/icons-material/EmojiEvents';

const CaloriesCard = () => {
  return (
    <Card className="calories-card"
     sx={{
    backgroundColor: '#FFB324',
    color: 'white',
    borderRadius: 2,
  }}
    >
      <CardContent>
        <Typography className="card-title">
          <EmojiEvents /> Calories
        </Typography>
        <Box className="circle-container">
          <CircularProgress variant="determinate" value={65} className="calories-progress" />
          <Typography className="circle-label">Today</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CaloriesCard;
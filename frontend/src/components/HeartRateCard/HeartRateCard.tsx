import { Card, CardContent, Typography } from '@mui/material';
import Favorite from '@mui/icons-material/Favorite';

interface HeartRateCardProps {
  rate: number;
}

const HeartRateCard = ({ rate }: HeartRateCardProps) => {
  return (
    <Card className="health-card"  
    sx={{
    backgroundColor:"#FF5E5E",
    color: 'white',
    borderRadius: 2,
  }}>
      <CardContent className="heart-rate-content">
        <Typography className="card-title">
          <Favorite /> Heart Rate
        </Typography>
        <Typography variant="h4">{rate} bpm</Typography>
        <Typography className="heart-status">Normal</Typography>
      </CardContent>
    </Card>
  );
};

export default HeartRateCard;
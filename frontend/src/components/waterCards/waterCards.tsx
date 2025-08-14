import { Card, CardContent, Typography, LinearProgress } from '@mui/material';
import WaterDrop from '@mui/icons-material/WaterDrop';

interface WaterCardProps {
  water: number;
  goal: number;
}

const WaterCard = ({ water, goal }: WaterCardProps) => {
  const percent = Math.min((water / goal) * 100, 100);

  return (
    <Card className="health-card"
     sx={{
    backgroundColor: '#1DAEFF',
    color: 'white',
    borderRadius: 2,
  }}>
      <CardContent>
        <Typography className="card-title">
          <WaterDrop /> Water
        </Typography>
        <Typography variant="h5">{water} liters</Typography>
        <Typography className="progress-text">
          {percent.toFixed(0)}% of your goal
        </Typography>
        <LinearProgress variant="determinate" value={percent} className="water-progress" />
      </CardContent>
    </Card>
  );
};

export default WaterCard;
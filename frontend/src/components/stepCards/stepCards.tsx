import { Card, CardContent, Typography, LinearProgress } from '@mui/material';
import DirectionsWalk from '@mui/icons-material/DirectionsWalk';

interface StepsCardProps {
  steps: number;
  goal: number;
}

const StepsCard = ({ steps, goal }: StepsCardProps) => {
  const percent = Math.min((steps / goal) * 100, 100);

  return (
    <Card className="health-card" 
     sx={{
    backgroundColor:"#1FD179",
    color: 'white',
    borderRadius: 2,
  }}>
      <CardContent>
        <Typography className="card-title">
          <DirectionsWalk /> Steps
        </Typography>
        <Typography variant="h5">{steps} steps</Typography>
        <Typography className="progress-text">
          {percent.toFixed(0)}% of your goal
        </Typography>
        <LinearProgress variant="determinate" value={percent} className="steps-progress" />
      </CardContent>
    </Card>
  );
};

export default StepsCard;
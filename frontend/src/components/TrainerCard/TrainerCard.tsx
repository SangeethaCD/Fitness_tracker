import { Card, CardContent, Typography, Avatar } from '@mui/material';

interface TrainerCardProps {
  name: string;
  role: string;
  rating: number;
  reviews: number;
  avatar: string;
}

const TrainerCard = ({ name, role, rating, reviews, avatar }: TrainerCardProps) => {
  return (
    <Card className="trainer-card">
      <CardContent className="trainer-content">
        <Avatar src={avatar} className="trainer-avatar" />
        <Typography className="trainer-name">{name}</Typography>
        <Typography className="trainer-role">{role}</Typography>
        <div className="trainer-stats">
          <span>⭐ {rating}</span>
          <span>💬 {reviews}</span>
        </div>
        <button className="view-profile-btn">View Profile</button>
      </CardContent>
    </Card>
  );
};

export default TrainerCard;
import { ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';

interface MealItemProps {
  name: string;
  time: string;
  carbs: number;
  protein: number;
  fat: number;
  image: string;
}

const MealItem = ({ name,  carbs, protein, fat, image }: MealItemProps) => {
  return (
    <ListItem className="meal-item">
      <ListItemAvatar>
        <Avatar src={image} />
      </ListItemAvatar>
      <ListItemText
        primary={name}
        secondary={`${carbs}% carbs • ${protein}% protein • ${fat}% fat`}
        className="meal-text"
      />
    </ListItem>
  );
};

export default MealItem;
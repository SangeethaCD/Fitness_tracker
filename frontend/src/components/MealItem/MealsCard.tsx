import { Card, CardContent, Typography, List } from '@mui/material';
import MealItem from './MealItem';

const MealsCard = () => {
  return (
    <Card className="meals-card">
      <CardContent>
        <Typography className="section-title">Breakfast - 10:00 am</Typography>
        <List>
          <MealItem
            name="Avocado salad"
            time="10:00 am"
            carbs={8}
            protein={16}
            fat={6}
            image="https://source.unsplash.com/50x50/?avocado"
          />
          <MealItem
            name="Blueberry"
            time="10:00 am"
            carbs={8}
            protein={16}
            fat={6}
            image="https://source.unsplash.com/50x50/?blueberry"
          />
        </List>
      </CardContent>
    </Card>
  );
};

export default MealsCard;
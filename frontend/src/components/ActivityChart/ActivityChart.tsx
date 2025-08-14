import { Card, CardContent, Typography, Box } from '@mui/material';

const ActivityCard = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return (
    <Card sx={{ 
      borderRadius: 2, 
      p: 2, 
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      backgroundColor:'#ECFFCE'
    }}>
      <CardContent>
        {/* Title and Percentages */}
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Activity</Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, my: 1 }}>50%</Typography>
          <Typography variant="body2" color="text.secondary">Weekly 80%</Typography>
        </Box>

        {/* Weekday Bars */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          mt: 3
        }}>
          {days.map((day) => (
            <Box key={day} sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center'
            }}>
              <Box sx={{
                width: 30,
                height: 60,
                bgcolor: 'primary.main',
                borderRadius: 1,
                mb: 1
              }} />
              <Typography variant="caption">{day}</Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
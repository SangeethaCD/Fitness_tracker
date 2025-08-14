import { Card, CardContent, Typography, List, ListItem, ListItemText, Box } from '@mui/material';

const ProgressCard = () => {
  const activities = [
    { name: 'Cardio', hours: 30, color: '#FF5722' },
    { name: 'Stretching', hours: 40, color: '#4CAF50' },
    { name: 'Treadmill', hours: 30, color: '#2196F3' },
    { name: 'Strength', hours: 20, color: '#9C27B0' }
  ];

  const totalHours = activities.reduce((sum, activity) => sum + activity.hours, 0);

  return (
    <Card sx={{ 
      borderRadius: 2,
      p: 2,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      backgroundColor:'#ECFFCE'
    }}>
      <CardContent>
        {/* Title */}
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Progress</Typography>
        
        {/* Donut Chart */}
        <Box sx={{ 
          position: 'relative', 
          width: 150, 
          height: 150, 
          mx: 'auto',
          mb: 3
        }}>
          <svg width="100%" height="100%" viewBox="0 0 100 100">
           
            <circle cx="50" cy="50" r="45" fill="none" stroke="#f5f5f5" strokeWidth="10" />
            
            {/* Activity segments */}
            {activities.map((activity, index) => {
              const percent = (activity.hours / totalHours) * 100;
              const offset = activities.slice(0, index).reduce((sum, a) => sum + (a.hours / totalHours) * 100, 0);
              return (
                <circle
                  key={activity.name}
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={activity.color}
                  strokeWidth="10"
                  strokeDasharray={`${percent} ${100 - percent}`}
                  strokeDashoffset={-offset + 25}
                />
              );
            })}
            
            {/* Center hole */}
            <circle cx="50" cy="50" r="30" fill="white" />  
            <text 
              x="50" 
              y="50" 
              textAnchor="middle" 
              dominantBaseline="middle"
              style={{
                fontWeight: 500,
                fontSize: '12px',
                fontFamily: 'inherit'
              }}
            >
              {totalHours} hrs
            </text>
          </svg>
        </Box>

        {/* Highlighted Activity */}
        <Typography variant="body1" sx={{ 
          fontWeight: 500,
          mb: 3,
          textAlign: 'center'
        }}>
          Stretching 40 hrs
        </Typography>

        {/* Activity List */}
        <List dense sx={{ pt: 0 }}>
          {activities.map((activity) => (
            <ListItem key={activity.name} sx={{ px: 0 }}>
              <Box sx={{
                width: 10,
                height: 10,
                bgcolor: activity.color,
                borderRadius: '50%',
                mr: 2
              }} />
              <ListItemText 
                primary={`${activity.name} - ${activity.hours} hrs`}
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
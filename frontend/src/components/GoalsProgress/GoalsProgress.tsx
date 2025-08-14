import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import StepsCard from '../../components/stepCards/stepCards';
import WaterCard from "../../components/waterCards/waterCards";
import CaloriesCard from "../../components/CaloriesCard/CaloriesCard";
import HeartRateCard from '../../components/HeartRateCard/HeartRateCard';
import ActivityChart from '../../components/ActivityChart/ActivityChart';
import ProgressDonut from '../../components/ProgressDonut/ProgressDonut';
import TrainerCard from '../../components/TrainerCard/TrainerCard';
import MealsCard from '../../components/MealItem/MealsCard';

import './GoalsProgress.css';

interface Goals {
  steps?: number;
  running?: number;
  sleeping?: number;
  weight?: number;
  water?: number;
}

const HealthDashboard = () => {
  const [steps, setSteps] = useState(0);
  const [water, setWater] = useState(0);
  const [heartRate, setHeartRate] = useState(75);

  useEffect(() => {
    const fetchUserGoals = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        console.warn("Missing userId or token in localStorage");
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/user/goals/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user goals");
        }

        const goalData: Goals = await response.json();
        setSteps(goalData.steps || 0);
        setWater(goalData.water || 0);
       
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    fetchUserGoals();

    const interval = setInterval(() => {
      setHeartRate(Math.floor(Math.random() * 20) + 70);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      {/* Top Stats Row */}
      <Box className="top-stats-row">
        <StepsCard steps={steps} goal={10000} />
        <WaterCard water={water} goal={2} />
        <CaloriesCard />
        <HeartRateCard rate={heartRate} />
      </Box>

      {/* Middle Charts Row */}
      <Box className="charts-row">
        <ActivityChart />
        <ProgressDonut />
      </Box>

      {/* Trainers Section */}
      <Box className="trainers-section">
        <Typography variant="h6" className="section-header">Recommended Trainer for you</Typography>
        <Box className="trainers-row">
          <TrainerCard
            name="Cameron Williamson"
            role="Fitness Specialist"
            rating={25}
            reviews={104}
            avatar="https://i.pravatar.cc/150?img=3"
          />
          <TrainerCard
            name="Cameron Williamson"
            role="Fitness Specialist"
            rating={25}
            reviews={104}
            avatar="https://i.pravatar.cc/150?img=5"
          />
          <MealsCard />
        </Box>
      </Box>
    </div>
  );
};

export default HealthDashboard;

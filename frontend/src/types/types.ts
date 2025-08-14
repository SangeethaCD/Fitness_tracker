
export interface Goals {
  steps?: number;
  running?: number;
  sleeping?: number;
  weight?: number;
  water?: number;
}

export interface HealthDashboardProps {
  stepsGoal: number;
  waterGoalLiters: number;
  caloriesGoal: number;
  currentSteps: number;
  currentWaterLiters: number;
  currentCalories: number;
}
import "./Goals.css";
import type{ ReactNode } from "react";

interface GoalCardProps {
  icon: ReactNode;
  title: string;
  value: string;
}

const GoalCard = ({ icon, title, value }: GoalCardProps) => {
  return (
    <div className="goal-container">
      <div className="goal-icon">{icon}</div>
      <div className="goal-details">
        <h4>{title}</h4>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default GoalCard;

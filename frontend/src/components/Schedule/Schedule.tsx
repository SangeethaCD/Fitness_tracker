import "./Schedule.css";
import type { ReactNode } from "react";

interface ScheduledCardProps {
  icon: ReactNode;
  title: string;
  category: string;
  date: string;
}

const ScheduledCard = ({ icon, title, category, date }: ScheduledCardProps) => {
  return (
    <div className="scheduled-card">
      <div className="icon">{icon}</div>
      <div className="details">
        <h4>{title}</h4>
        <p>{category}</p>
      </div>
      <div className="date">{date}</div>
    </div>
  );
};

export default ScheduledCard;



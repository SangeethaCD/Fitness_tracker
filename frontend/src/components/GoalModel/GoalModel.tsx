
import { useState, useEffect } from "react";

interface Goals {
  steps?: number;
  running?: number;
  sleeping?: number;
  weight?: number;
  water?: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onGoalsUpdate: (goals: Goals) => void;
  initialGoals?: Goals;
}

const GoalModel = ({ open, onClose, onGoalsUpdate, initialGoals = {} }: Props) => {
  const [goalData, setGoalData] = useState<Goals>(initialGoals);

  useEffect(() => {
    setGoalData(initialGoals);
  }, [initialGoals]);

  if (!open) return null;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setGoalData({
      ...goalData,
      [name]: Number(value),
    });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:3000/user/goals/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(goalData),
      });

      if (!res.ok) throw new Error("there was an error updating goals");

      onGoalsUpdate(goalData);
      onClose();
    } catch (err) {
      console.error("There was an error updating the goals:", err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Set Your Goals</h2>
          <button className="close-button" onClick={onClose}>✖</button>
        </div>

        <div className="modal-body">
          <input
            name="steps"
            placeholder="Steps per day"
            value={goalData.steps || ""}
            onChange={handleChange}
          />
          <input
            name="running"
            placeholder="Running per day in km"
            value={goalData.running || ""}
            onChange={handleChange}
          />
          <input
            name="sleeping"
            placeholder="Sleep per day in hours"
            value={goalData.sleeping || ""}
            onChange={handleChange}
          />
          <input
            name="weight"
            placeholder="Target weight in kg"
            value={goalData.weight || ""}
            onChange={handleChange}
          />
          <input
            name="water"
            placeholder="Water (Ltr) per day"
            value={goalData.water || ""}
            onChange={handleChange}
          />
        </div>

        <div className="modal-actions">
          <button className="cancel-button" onClick={onClose}>Cancel</button>
          <button className="save-button" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default GoalModel;

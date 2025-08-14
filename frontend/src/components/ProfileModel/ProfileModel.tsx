import "./ProfileModel.css";
import { useState, useEffect } from "react";
import GoalModel from '../GoalModel/GoalModel'; 

interface Profile {
  name?: string;
  location?: string;
  birthDate?: string;
  height?: number;
  weight?: number;
}

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
  onProfileUpdate: (profile: Profile, completion: number) => void;
  onGoalsUpdate: (goals: Goals) => void;
  initialProfile?: Profile;
  initialGoals?: Goals;
}

const ProfileModal = ({
  open,
  onClose,
  onProfileUpdate,
  onGoalsUpdate,
  initialProfile = {},
  initialGoals = {},
}: Props) => {
  const [formData, setFormData] = useState<Profile>(initialProfile);
  const [goalsOpen, setGoalsOpen] = useState(false);

  useEffect(() => {
    setFormData(initialProfile);
  }, [initialProfile]);

 
  if (!open && !goalsOpen) return null;

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    const formattedProfile = {
      ...formData,
      dateOfBirth: formData.birthDate
        ? new Date(formData.birthDate).toISOString().split("T")[0]
        : undefined,
    };

    const totalFields = 5;
    let filled = 0;
    Object.values(formattedProfile).forEach((value) => {
      if (value !== undefined && value !== "") filled++;
    });
    const newCompletion = Math.round((filled / totalFields) * 100);

    try {
      const res = await fetch("http://localhost:3000/user/profile/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedProfile),
      });

      if (!res.ok) throw new Error("There was an error in updating the profile");

      onProfileUpdate(formattedProfile, newCompletion);
      onClose();
    } catch (err) {
      console.error("There was an error in updating the profile:", err);
    }
  };

  return (
    <>
      {open && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Set your profile</h2>
              <button className="close-button" onClick={onClose}>
                ✖
              </button>
            </div>

            <div className="tabs">
              <button className="tab active" onClick={() => {}}>
                Personal Information
              </button>
              <button
                className="tab"
                onClick={() => {
                  setGoalsOpen(true);
                  onClose();
                }}
              >
                Set your goals
              </button>
            </div>

            <div className="modal-body">
              <input
                name="Name"
                placeholder="Full Name"
                value={formData.name || ""}
                onChange={handleChange}
              />
              <input
                name="location"
                placeholder="Your Location"
                value={formData.location || ""}
                onChange={handleChange}
              />
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate || ""}
                onChange={handleChange}
              />
              <input
                type="number"
                name="height"
                placeholder="Your Height in cm"
                value={formData.height || ""}
                onChange={handleChange}
              />
              <input
                type="number"
                name="weight"
                placeholder="Your Weight in kg"
                value={formData.weight || ""}
                onChange={handleChange}
              />
            </div>

            <div className="modal-actions">
              <button className="cancel-button" onClick={onClose}>
                Cancel
              </button>
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <GoalModel
        open={goalsOpen}
        onClose={() => setGoalsOpen(false)}
        onGoalsUpdate={(updatedGoals) => {
          onGoalsUpdate(updatedGoals);
          setGoalsOpen(false);
        }}
        initialGoals={initialGoals}
      />
    </>
  );
};

export default ProfileModal;

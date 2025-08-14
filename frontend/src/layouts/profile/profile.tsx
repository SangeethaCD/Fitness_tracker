import "./profile.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileModel from "../../components/ProfileModel/ProfileModel";
import GoalCard from "../../components/Goals/Goals";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import HotelIcon from "@mui/icons-material/Hotel";
import Schedule from "../../components/Schedule/Schedule";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";

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

const Profile = () => {
  const [userProfile, setUserProfile] = useState<Profile>({});
  const [userGoals, setUserGoals] = useState<Goals>({});
  const [completion, setCompletion] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedModal = localStorage.getItem("modalOpen");
    if (savedModal === "true") setModalOpen(true);

   
    const savedGoals = localStorage.getItem("userGoals");
    if (savedGoals) {
      setUserGoals(JSON.parse(savedGoals));
    }

    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (!token || !userId) return;

      const res = await fetch(`http://localhost:3000/user/profile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setUserProfile(data);
        let filled = 0;
        Object.values(data).forEach((val) => {
          if (val) filled++;
        });
        setCompletion(Math.round((filled / 5) * 100));
      }
    };

    const fetchGoals = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (!token || !userId) return;

      const res = await fetch(`http://localhost:3000/user/goals/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setUserGoals(data);
      }
    };

    fetchProfile();
    fetchGoals();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/user/login");
  };

  const openModal = () => {
    setModalOpen(true);
    localStorage.setItem("modalOpen", "true");
  };

  const closeModal = () => {
    setModalOpen(false);
    localStorage.setItem("modalOpen", "false");
  };

  const calculateAge = (dob?: string) => {
    if (!dob) return 0;
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  return (
    <div className="profile-section">
      <div className="profile-header">
        <div className="profile-info">
          <AccountCircleIcon  fontSize="large" />
          <div>
            <h4 className="profile-name">{userProfile.name || "Username"}</h4>
            <div className="profile-location">
              <LocationOnIcon fontSize="small" />
              <span>{userProfile.location || "Location"}</span>
            </div>
          </div>
        </div>
        <button onClick={handleLogout}>
          <PowerSettingsNewIcon className="logout-icon" />
        </button>
      </div>

      <div className="Profile-Completion">
        <div className="completion-top">
          <div className="completion">
            <span className="completion-percentage">{completion}%</span>
            <p>Your profile is set up!</p>
          </div>
          <button className="edit-button" onClick={openModal}>
            Edit your profile
          </button>
        </div>

        <div className="Completion-Statistics">
          <div className="Statistics">
            <span className="statistics-value">{userProfile.weight || 0}</span>
            <span className="statistics-unit">kg</span>
            <p>Weight</p>
          </div>
          <div className="Statistics">
            <span className="statistics-value">{userProfile.height || 0}</span>
            <p>Height</p>
          </div>
          <div className="Statistics">
            <span className="statistics-value">{calculateAge(userProfile.birthDate)}</span>
            <span className="statistics-unit">yrs</span>
            <p>Age</p>
          </div>
        </div>
      </div>

      <div className="goals-section">
        <h3>Your Goals</h3>
        <div className="goals-grid">
          <GoalCard
            icon={<DirectionsWalkIcon />}
            title="Steps"
            value={`${userGoals.steps || 0} / day`}
          />
          <GoalCard
            icon={<DirectionsRunIcon />}
            title="Running"
            value={`${userGoals.running || 0} km/day`}
          />
          <GoalCard
            icon={<HotelIcon />}
            title="Sleep"
            value={`${userGoals.sleeping || 0} hrs/day`}
          />
        </div>
      </div>

      <div className="scheduled-section">
        <h3>Scheduled</h3>
        <Schedule
          icon={<SelfImprovementIcon />}
          title="Training - Yoga Class"
          category="Fitness"
          date="22 Mar 2025"
        />
        <Schedule
          icon={<SelfImprovementIcon />}
          title="Training - Swimming"
          category="Fitness"
          date="22 Mar 2025"
        />
      </div>

      <ProfileModel
        open={isModalOpen}
        onClose={closeModal}
        initialProfile={userProfile}
        initialGoals={userGoals}
        onProfileUpdate={(updated, completion) => {
          setUserProfile(updated);
          setCompletion(completion);
        }}
        onGoalsUpdate={(updatedGoals) => {
          setUserGoals(updatedGoals)
        }}
      />
    </div>
  );
};

export default Profile;

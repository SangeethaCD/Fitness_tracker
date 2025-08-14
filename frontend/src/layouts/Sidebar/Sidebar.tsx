import "./Sidebar.css";
import HomeIcon from "@mui/icons-material/Home";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import CompassCalibrationIcon from "@mui/icons-material/CompassCalibration";
import SettingsIcon from "@mui/icons-material/Settings";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Fitness from "../../assets/Fitness.png";

const Sidebar = () => {
  const menuItems = [
    { icon: <HomeIcon />, active: true },
    { icon: <ShowChartIcon /> },
    { icon: <DirectionsRunIcon /> },
    { icon: <ChatBubbleIcon /> },
    { icon: <CompassCalibrationIcon /> },
    { icon: <SettingsIcon /> },
    { icon: <CreditCardIcon /> }
  ];

  return (
    <div className="sidebar">
      <div className="logo-section">
        <div className="logo-circle">
            <img src={Fitness} alt="fitness photo" />
        </div>
        <span className="logo-text">Healthy</span>
      </div>
      <div className="menu-items">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`menu-button ${item.active ? "active" : ""}`}
          >
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

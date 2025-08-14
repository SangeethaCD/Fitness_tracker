import "./Header.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const Header = () => {
  const getGreeting = (): string => {
    const hour: number = new Date().getHours();
    if (hour >= 0 && hour < 5) {
    return "Good Night";
   } else if (hour < 12) {
    return "Good Morning";
   } else if (hour < 18) {
    return "Good Afternoon";
   } else {
    return "Good Evening";
   }
  };

  return (
    <div className="header">
      <div className="header-left">
        <p className="greeting">{getGreeting()}</p>
        <h2 className="welcome">Welcome Back 🎉</h2>
      </div>
      <div className="header-right">
        <button className="subscribe-button">Subscribe</button>
        <NotificationsNoneIcon className="notification-icon" />
      </div>
    </div>
  );
};

export default Header;

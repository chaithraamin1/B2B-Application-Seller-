import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import '../Profile/Profile.css'
import { assets } from "../../assets/assets";

const Profile = ({ setShowUserProfile }) => {
  var loginData = localStorage.getItem("login_result");
  console.log("login result", JSON.parse(loginData));
  const loginResultObject = JSON.parse(loginData);

  const navigate = useNavigate();
  const redirectToCompanyDetailsPage = () => {
    setShowUserProfile(false);
    navigate("/company-details");
  };
  const redirectToPurchaseHistoryPage = () => {
    setShowUserProfile(false);
    navigate("/purchase-history");
  };

  const redirectToPreferencePage = () => {
    setShowUserProfile(false);
    navigate("/preferences");
  };
  const redirectToBudgetPage = () => {
    setShowUserProfile(false);
    navigate("/budget");
  };
  const redirectToLoginPage = () => {
    setShowUserProfile(false);
    localStorage.removeItem("authToken");
    navigate("/");
  };
  return (
    <div className="user-profile-popup">
      <div className="user-profile-popup-container">
        <div className="profile-top-bg">
          <img
            src={assets.cross_icon}
            alt="close-icon"
            className="img-close"
            onClick={() => setShowUserProfile(false)}
          />
          {loginResultObject && (
            <>
              <h2>Hey {loginResultObject.name}</h2>
              <p>{loginResultObject.email}</p>
            </>
          )}
        </div>

        <ul className="list-group-profile">
          <li class="list-group-item" onClick={redirectToCompanyDetailsPage}>
            Company Details
          </li>
          <li class="list-group-item" onClick={redirectToPurchaseHistoryPage}>
            Purchase History
          </li>
          <li class="list-group-item" onClick={redirectToPreferencePage}>
            Preferences
          </li>
          <li class="list-group-item" onClick={redirectToBudgetPage}>
            Budget
          </li>
          <li class="list-group-item" onClick={redirectToLoginPage}>
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};
const styles = {
  profileContainer: {
    width: "300px",
    margin: "0 auto",
    textAlign: "center",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginBottom: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: "10px",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  textarea: {
    marginBottom: "10px",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    resize: "none",
    height: "60px",
  },
  button: {
    padding: "8px 12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Profile;

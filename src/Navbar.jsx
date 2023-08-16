import { NavLink } from "react-router-dom";

export default function Navbar(props) {
  const { loginData, setLoginData } = props;
  function redirectToHomeOnClick() {
    setLoginData({});
  }
  return (
    <>
      <div className="navbar">
        <div className="nav-brand">
          <img src="./assets/brand.png" alt="" className="company-logo" />
        </div>

        {loginData.jwt && (
          <div className="onOff">
            <div className="navbar-username">
              <img
                src="https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"
                alt=""
              />
            </div>
            <div className="nav-logout">
              <NavLink to="/" className="btn" onClick={redirectToHomeOnClick}>
                Logout
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

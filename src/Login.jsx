import useFetch from "./useFetch";
import { useNavigate } from "react-router-dom";
import AlertMessage from "./AlertMessage";

export default function Login(props) {
  const {
    email,
    password,
    setEmail,
    setPassword,
    setLoginData,
    setStatusBase,
    status,
  } = props;
  const navigate = useNavigate();
  const { post } = useFetch("https://myphysio.digitaldarwin.in/");
  const user_details = {
    uid: email,
    password: password,
    blocked: 0,
  };
  function fetchOnClick(event) {
    event.preventDefault();
    post("api/login_v1/", {
      payload: btoa(JSON.stringify(user_details)),
    }).then((data) => {
      let responseData = JSON.parse(atob(data.response));
      setLoginData(responseData);
      const regex = /login successfully$/i;
      if (regex.test(responseData.message)) {
        setStatusBase({ msg: "Login Successful!!", key: Math.random() });
        navigate(`/user/${responseData.user_id}`);
      } else {
        setStatusBase({
          msg: "Invalid Username & Password!!",
          key: Math.random(),
        });
      }
    });
  }

  return (
    <>
      <form onSubmit={fetchOnClick}>
        <div className="login-container">
          <div className="login-block">
            <div className="login-header">
              <h1>Log in</h1>
            </div>
            <div className="email-block">
              <div className="email-label">
                <label htmlFor="username">Email</label>
              </div>
              <div className="email-input">
                <input
                  type="text"
                  name="username"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
            </div>
            <div className="password-block">
              <div className="password-label">
                <label htmlFor="password">Password</label>
              </div>
              <div className="password-input">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
            </div>
            <div className="login-button">
              <input type="submit" value="Log in" />
              {status.msg === "Invalid Username & Password!!" ? (
                <AlertMessage key={status.key} message={status.msg} />
              ) : null}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

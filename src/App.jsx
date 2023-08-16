import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./Login";
import Navbar from "./Navbar";
import LineComparisonGraph from "./LineComparisonGraph";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginData, setLoginData] = useState({});
  const [status, setStatusBase] = useState("");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar loginData={loginData} />
                <Login
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  setLoginData={setLoginData}
                  setStatusBase={setStatusBase}
                  status={status}
                />
              </>
            }
          />

          {loginData.jwt && (
            <Route
              path="/user/:id"
              element={
                <>
                  <Navbar loginData={loginData} setLoginData={setLoginData} />
                  <LineComparisonGraph status={status} />
                </>
              }
            />
          )}

          <Route path="*" element={<h1>Url Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

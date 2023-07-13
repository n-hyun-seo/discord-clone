import { useState } from "react";
import LogInBox from "./LogInBox";
import RegisterBox from "./RegisterBox";

export default function LogInPage() {
  const [logInRef, setLogInRef] = useState({});
  const [registerRef, setRegisterRef] = useState({});
  const [onRegisterPage, setOnRegisterPage] = useState(false);

  return (
    <div className="log-in-page">
      <LogInBox
        setOnRegisterPage={setOnRegisterPage}
        setLogInRef={setLogInRef}
        registerRef={registerRef}
      />
      <RegisterBox
        setOnRegisterPage={setOnRegisterPage}
        setRegisterRef={setRegisterRef}
        logInRef={logInRef}
      />
    </div>
  );
}

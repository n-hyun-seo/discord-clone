import { auth } from "../../../config/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { CurrentUserUidContext } from "../../../context/CurrentUserUidContext";

export default function LogInBox(props) {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInFail, setSignInFail] = useState(false);

  const loginBoxRef = useRef();

  const [currentUserUid, setCurrentUserUid] = useContext(CurrentUserUidContext);

  props.setLogInRef(loginBoxRef);

  async function signIn(e) {
    e.preventDefault();
    try {
      if (signInFail) setSignInFail(false);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setSignInFail(true);
    }
  }

  async function checkLoggedIn() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserUid(user.uid);
        navigate("/discord-clone/main/friends/online");
      } else {
        return;
      }
    });
  }

  return (
    <div className="log-in-box" ref={loginBoxRef}>
      <h2>Welcome back!</h2>
      <p>We're so excited to see you again!</p>
      <form
        className="log-in-form"
        onSubmit={(e) => {
          signIn(e).then(() => checkLoggedIn());
        }}
      >
        <label htmlFor="email" className="email-label">
          EMAIL{" "}
          {signInFail ? (
            <span className="invalid-log-in">
              <i>- Login or password is invalid.</i>
            </span>
          ) : (
            <span className="required-star">*</span>
          )}
        </label>
        <input
          name="email"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        ></input>
        <label htmlFor="password" className="password-label">
          PASSWORD{" "}
          {signInFail ? (
            <span className="invalid-log-in">
              <i>- Login or password is invalid.</i>
            </span>
          ) : (
            <span className="required-star">*</span>
          )}
        </label>
        <input
          name="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button type="submit" className="log-in-button">
          Log In
        </button>
        <div className="register-description-text">
          Need an account?{" "}
          <button
            className="register-button"
            type="button"
            onClick={() => {
              props.setOnRegisterPage(true);
              props.registerRef.current.style.opacity = "100%";
              loginBoxRef.current.style.marginLeft = "-430px";
              loginBoxRef.current.style.opacity = "0%";
            }}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

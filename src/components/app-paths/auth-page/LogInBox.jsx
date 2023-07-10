import { auth } from "../../../config/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router";
export default function LogInBox(props) {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInFail, setSignInFail] = useState(false);

  async function signIn(e) {
    e.preventDefault();
    try {
      if (signInFail) setSignInFail(false);
      const data = await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setSignInFail(true);
    }
  }

  async function checkLoggedIn() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("main/friends/online");
        console.log("you have logged in!");
      } else {
        console.log("user is not signed in");
      }
    });
  }

  return (
    <div className="log-in-box">
      <h2>Welcome back!</h2>
      <p>We're so excited to see you again!</p>
      <form
        className="log-in-form"
        onSubmit={(e) => {
          signIn(e).then(() => checkLoggedIn());
        }}
      >
        <label for="email" className="email-label">
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
        <label for="password" className="password-label">
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
            onClick={() => props.setOnRegisterPage(true)}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

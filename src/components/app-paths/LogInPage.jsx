import { useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router";

export default function LogInPage() {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInFail, setSignInFail] = useState(true);

  async function createAccount() {
    try {
      const data = await createUserWithEmailAndPassword(auth, email, password);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function signIn() {
    try {
      if (signInFail) setSignInFail(false);
      const data = await signInWithEmailAndPassword(auth, email, password);
      console.log(data);
    } catch (err) {
      console.log("no user exists");
    }
  }

  useEffect(() => {
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

    checkLoggedIn();
  }, []);

  return (
    <div className="log-in-page">
      <div className="log-in-box">
        <h2>Welcome back!</h2>
        <p>We're so excited to see you again!</p>
        <form className="log-in-form">
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
          <button onClick={signIn} className="log-in-button">
            Log In
          </button>
          <div className="register-description-text">
            Need an account?{" "}
            <button className="register-button">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { auth } from "../../../config/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function RegisterBox(props) {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInFail, setSignInFail] = useState(false);

  async function createAccount(e) {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
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
    <div className="register-box">
      <h2>Create an account</h2>
      <form
        className="log-in-form"
        onSubmit={(e) => {
          createAccount(e).then(() => checkLoggedIn())
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
          required
        ></input>
        <button type="submit" className="log-in-button">
          Continue
        </button>
        <div className="register-description-text">
          <button
            className="register-button"
            onClick={() => {
              props.setOnRegisterPage(false);
            }}
          >
            Already have an account?
          </button>
        </div>
      </form>
    </div>
  );
}

import { auth, db } from "../../../config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { doc, setDoc } from "firebase/firestore";
import { CurrentUserUidContext } from "../../../context/CurrentUserUidContext";

export default function RegisterBox(props) {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [signInFail, setSignInFail] = useState(false);

  const [currentUserUid, setCurrentUserUid] = useContext(CurrentUserUidContext);

  const registerBoxRef = useRef();

  props.setRegisterRef(registerBoxRef);

  async function createAccount(e) {
    e.preventDefault();
    try {
      const data = await createUserWithEmailAndPassword(auth, email, password);
      setDoc(doc(db, "users", data.user.uid), {
        friends: {
          pending: [],
          blocked: [],
          all: [],
        },
        directMessages: [],
        userInfo: {
          ...data.user.metadata,
          email: data.user.email,
          username: username,
          uid: data.user.uid,
          photoURL: "",
          statusMessage: "",
          onlineStatus: "online",
        },
      });
    } catch (err) {
      console.log(err);
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
    <div className="register-box" ref={registerBoxRef}>
      <h2>Create an account</h2>
      <form
        className="log-in-form"
        onSubmit={(e) => {
          createAccount(e).then(() => checkLoggedIn());
        }}
      >
        <label htmlFor="email" className="email-label">
          EMAIL
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
        <label htmlFor="username" className="email-label">
          USERNAME
          {signInFail ? (
            <span className="invalid-log-in">
              <i>- Login or password is invalid.</i>
            </span>
          ) : (
            <span className="required-star">*</span>
          )}
        </label>
        <input
          name="username"
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        ></input>
        <label htmlFor="password" className="password-label">
          PASSWORD
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
            type="button"
            onClick={() => {
              props.setOnRegisterPage(false);
              props.logInRef.current.style.opacity = "100%";
              props.logInRef.current.style.marginLeft = "530px";
              registerBoxRef.current.style.opacity = "0%";
            }}
          >
            Already have an account?
          </button>
        </div>
      </form>
    </div>
  );
}

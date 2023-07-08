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
    <div>
      <p>This is the log in page</p>
      <input
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={createAccount}>create account</button>
      <button onClick={signIn}>sign in</button>
    </div>
  );
}

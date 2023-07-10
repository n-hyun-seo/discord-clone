import { useEffect, useRef, useState } from "react";
import { auth } from "../../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router";
import LogInBox from "./LogInBox";
import RegisterBox from "./RegisterBox";

export default function LogInPage() {
  let navigate = useNavigate();

  const [onRegisterPage, setOnRegisterPage] = useState(false);

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
      {onRegisterPage ? (
        <RegisterBox setOnRegisterPage={setOnRegisterPage} />
      ) : (
        <LogInBox setOnRegisterPage={setOnRegisterPage} />
      )}
    </div>
  );
}

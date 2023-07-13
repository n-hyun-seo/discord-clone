import { Route, Routes } from "react-router";
import LogInPage from "../auth-page/LogInPage";
import MainPage from "../MainPage";
import { useQuery } from "@tanstack/react-query";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../config/firebase";
import { useNavigate } from "react-router";
import LoadingVisual from "./LoadingVisual";

export default function LoadingPage() {
  let navigate = useNavigate();
  const { isLoading } = useQuery(["loading"], () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/discord-clone/main/friends/online");
        console.log("you have logged in!");
      } else {
        console.log("user is not signed in");
        navigate("discord-clone/login");
      }
    });
  });

  if (isLoading) return <LoadingVisual />;

  return (
    <div className="loading-page">
      <Routes>
        <Route path="discord-clone/login" element={<LogInPage />} />
        <Route path="discord-clone/main/*" element={<MainPage />} />
      </Routes>
    </div>
  );
}

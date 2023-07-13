import { Route, Routes } from "react-router";
import LogInPage from "../auth-page/LogInPage";
import DiscordClone from "../../app-itself/DiscordClone";
import { useQuery } from "@tanstack/react-query";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../config/firebase";
import { useNavigate } from "react-router";
import LoadingVisual from "./LoadingVisual";
import { useState } from "react";
import { CurrentUserUidContext } from "../../../context/CurrentUserUidContext";

export default function LoadingPage() {
  let navigate = useNavigate();
  const [currentUserUid, setCurrentUserUid] = useState("initial");

  const { isLoading } = useQuery(["loading"], async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserUid(user.uid);
        navigate("/discord-clone/main/friends/online");
      } else {
        navigate("/discord-clone/login");
      }
    });
  });

  if (isLoading) return <LoadingVisual />;

  return (
    <div className="loading-page">
      <CurrentUserUidContext.Provider
        value={[currentUserUid, setCurrentUserUid]}
      >
        <Routes>
          <Route path="discord-clone/login" element={<LogInPage />} />
          <Route path="discord-clone/main/*" element={<DiscordClone />} />
        </Routes>
      </CurrentUserUidContext.Provider>
    </div>
  );
}

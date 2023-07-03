import Left from "./Left";
import Right from "../home_right/Right";
import { Routes, Route } from "react-router-dom";
import UserDM from "./direct_messages/UserDM";

export default function Home() {
  return (
    <section className="content">
      <Left />

      <Routes>
        <Route path="*" element={<Right />} />
        <Route path="/dm/*" element={<UserDM />} />
      </Routes>
    </section>
  );
}

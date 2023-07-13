import Left from "./main-page-left/Left";
import Right from "./main-page-right/Right";
import { Routes, Route } from "react-router-dom";
import UserDM from "./main-page-left/direct_messages/dm-chatroom/UserDM";

export default function MainPage() {
  return (
    <section className="content">
      <Left />

      <Routes>
        <Route path="friends/*" element={<Right />} />
        <Route path="dm/*" element={<UserDM />} />
      </Routes>
    </section>
  );
}

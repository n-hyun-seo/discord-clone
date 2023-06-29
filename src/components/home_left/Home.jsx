import Left from "./Left";
import Right from "../home_right/Right";
import { Routes, Route } from "react-router-dom";
import DMTest from "../../DMTest";

export default function Home() {
  return (
    <section className="content">
      <Left />

      <Routes>
        <Route path="*" element={<Right />} />
        <Route path="/dm/*" element={<DMTest />} />
      </Routes>
    </section>
  );
}

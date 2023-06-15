import Left from "./Left";
import Right from "../home_right/Right";
import { Link, Routes, Route } from "react-router-dom";
import DMtest from "../../Testthing2DM";

export default function Home() {
  return (
    <div className="content">
      <Left />

      <Routes>
        <Route path="*" element={<Right />} />
        <Route path="/dm" element={<DMtest />} />
      </Routes>
    </div>
  );
}



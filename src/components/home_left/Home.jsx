import Left from "./Left";
import Right from "../home_right/Right";
import { Routes, Route } from "react-router-dom";



export default function Home() {
  return (
    <div className="content">
      <Left />

      <Routes>
        <Route path="*" element={<Right />} />
        {/* <Route path="/dm/*" element={<DMtest />} /> */}
       
      </Routes>
    </div>
  );
}

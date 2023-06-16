import { useContext } from "react";
import { CurrentDMIdContext } from "./components/context/CurrentDMIdContext";

export default function DMtest() {
  const [currentDMId, setCurrentDMId] = useContext(CurrentDMIdContext);
  return (
    <div>
      <p className="testtext">DM messages with userID:{currentDMId}</p>
    </div>
  );
}

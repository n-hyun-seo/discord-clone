import { useContext } from "react";
import { CurrentSectionContext } from "./components/context/CurrentSectionContext";

export default function TestComp() {
  const [currentSection, setCurrentSection] = useContext(CurrentSectionContext);
  return (
    <div>
      <p className="testtext">{currentSection} section</p>
    </div>
  );
}

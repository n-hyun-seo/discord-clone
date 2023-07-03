import { useContext } from "react";
import { CurrentSectionContext } from "../../context/CurrentSectionContext";
import { CurrentSectionLeftContext } from "../../context/CurrentSectionLeftContext";
import { randomUsersList } from "./randomUsersList";

export default function UserDM() {
  const [currentSectionLeft, setCurrentSectionLeft] = useContext(
    CurrentSectionLeftContext
  );
  const [currentSection, setCurrentSection] = useContext(CurrentSectionContext);

  return <div>dm messages</div>;
}

import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { useContext } from "react";
import { CurrentPageContext } from "../../../context/CurrentPageContext";

export default function AddServerButton(props) {
  const [currentPage, setCurrentPage] = useContext(CurrentPageContext);
  const [hoverState, setHoverState] = useState(false);

  const serverHoverText = useRef();

  function checkCurrentPageOnLeave() {
    setHoverState(false);
    serverHoverText.current.classList.remove("hovered");
  }

  function checkCurrentPageOnEnter() {
    setHoverState(true);
    serverHoverText.current.classList.add("hovered");
  }

  function changeButtonClass() {
    if (hoverState) return "logo-button-hovered-aas";
    if (!hoverState) return "logo-button-unhovered-aas";
  }
  return (
    <div className="logo-container-2 add-a-server">
      <Link
        className={changeButtonClass()}
        onMouseEnter={checkCurrentPageOnEnter}
        onMouseLeave={checkCurrentPageOnLeave}
      >
        <p>+</p>
      </Link>
      <div ref={serverHoverText} className="hover-text">
        {props.serverTitle}
      </div>
    </div>
  );
}

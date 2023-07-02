import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { CurrentPageContext } from "../context/CurrentPageContext";
import { CurrentSectionContext } from "../context/CurrentSectionContext";
import { CurrentSectionLeftContext } from "../context/CurrentSectionLeftContext";
import { CurrentDMIdContext } from "../context/CurrentDMIdContext";
import { CurrentIncomingFRContext } from "../context/CurrentIncomingFRContext";

export default function DiscordHomeButton() {
  const [hoverState, setHoverState] = useState(false);

  const [currentPage, setCurrentPage] = useContext(CurrentPageContext);
  const [currentSection, setCurrentSection] = useContext(CurrentSectionContext);
  const [currentSectionLeft, setCurrentSectionLeft] = useContext(
    CurrentSectionLeftContext
  );
  const [currentDMId, setCurrentDMId] = useContext(CurrentDMIdContext);
  const [currentIncomingFR, setCurrentIncomingFR] = useContext(
    CurrentIncomingFRContext
  );

  const blob = useRef();
  const serverHoverText = useRef();

  function checkCurrentPageOnLeave() {
    setHoverState(false);
    serverHoverText.current.classList.remove("hovered");
  }

  function checkCurrentPageOnEnter() {
    setHoverState(true);
    serverHoverText.current.classList.add("hovered");
  }

  function changeBlobClass() {
    if (currentPage === "home") return "white-blob-highlighted";
    if (
      !hoverState &&
      (blob.current.classList.contains("white-blob-unhovered-2") ||
        blob.current.classList.contains("white-blob-gone"))
    )
      return "white-blob-gone";
    if (currentPage !== "home") {
      if (blob.current.classList.contains("white-blob-highlighted"))
        return "white-blob-unhovered-2";
      if (hoverState) return "white-blob-hovered";
      if (!hoverState) return "white-blob-unhovered";
    }
  }

  function changeButtonClass() {
    if (currentPage === "home") return "logo-button-highlighted";
    if (currentPage !== "home") {
      if (hoverState) return "logo-button-hovered";
      if (!hoverState) return "logo-button-unhovered";
    }
  }

  function changeLogoClass() {
    if (currentPage === "home") return "logo-highlighted";
    if (currentPage !== "home") {
      if (hoverState) return "logo-hovered";
      if (!hoverState) return "logo-unhovered";
    }
  }

  return (
    <div className="logo-container">
      <div className={changeBlobClass()} ref={blob}></div>

      <Link
        to={`${currentSectionLeft}/${
          currentSectionLeft === "dm" ? currentDMId : currentSection
        }`}
        className={changeButtonClass()}
        onMouseEnter={checkCurrentPageOnEnter}
        onMouseLeave={checkCurrentPageOnLeave}
        onClick={() => {
          setCurrentPage("home");
        }}
      >
        <img
          src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6cc3c481a15a141738_icon_clyde_white_RGB.png"
          className={changeLogoClass()}
          alt="discord logo"
        ></img>
        {currentIncomingFR > 0 && (
          <div className="incoming-FR-home-circle">
            <div className="incoming-FR-home">
              <p>{currentIncomingFR}</p>
            </div>
          </div>
        )}
      </Link>
      <div ref={serverHoverText} className="hover-text">
        Direct Messages
      </div>
    </div>
  );
}

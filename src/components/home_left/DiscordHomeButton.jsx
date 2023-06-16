import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { CurrentPageContext } from "../context/CurrentPageContext";
import { CurrentSectionContext } from "../context/CurrentSectionContext";
import { CurrentSectionLeftContext } from "../context/CurrentSectionLeftContext";

export default function DiscordHomeButton() {
  const [hoverState, setHoverState] = useState(false);

  const [currentPage, setCurrentPage] = useContext(CurrentPageContext);
  const [currentSection, setCurrentSection] = useContext(CurrentSectionContext);
  const [currentSectionLeft, setCurrentSectionLeft] = useContext(
    CurrentSectionLeftContext
  );

  const blob = useRef();

  function checkCurrentPageOnLeave() {
    setHoverState(false);
  }

  function checkCurrentPageOnEnter() {
    setHoverState(true);
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

  function changeHoverTextClass() {
    if (hoverState) return "hover-text-hovered";
    if (!hoverState) return "hover-text-unhovered";
  }

  return (
    <div className="logo-container">
      <div className={changeBlobClass()} ref={blob}></div>

      <Link
        to={`${currentSectionLeft}/${
          currentSectionLeft === "dm" ? "" : currentSection
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
      </Link>
      <div className={changeHoverTextClass()}>Direct Messages</div>
    </div>
  );
}

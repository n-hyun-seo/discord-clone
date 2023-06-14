import { Link } from "react-router-dom";
import { useContext, useState, useRef } from "react";
import { CurrentPageContext } from "../context/CurrentPageContext";

export default function RandomServerButton() {
  const [currentPage, setCurrentPage] = useContext(CurrentPageContext);

  const [hoverState, setHoverState] = useState(false);

  const blob2 = useRef();

  function checkCurrentPageOnLeave() {
    setHoverState(false);
  }

  function checkCurrentPageOnEnter() {
    setHoverState(true);
  }

  function changeBlobClass() {
    if (currentPage === "test-server") return "white-blob-highlighted";
    if (currentPage !== "test-server") {
      if (blob2?.current?.classList?.contains("white-blob-highlighted"))
        return "white-blob-unhovered-2";
      if (hoverState) return "white-blob-hovered";
      if (!hoverState) return "white-blob-unhovered";
    }
  }

  function changeButtonClass() {
    if (currentPage === "test-server") return "logo-button-highlighted-2";
    if (currentPage !== "test-server") {
      if (hoverState) return "logo-button-hovered-2";
      if (!hoverState) return "logo-button-unhovered-2";
    }
  }

  return (
    <div className="logo-container-2">
      <div className={changeBlobClass()} ref={blob2}></div>

      <Link
        to="/test-server"
        className={changeButtonClass()}
        onMouseEnter={checkCurrentPageOnEnter}
        onMouseLeave={checkCurrentPageOnLeave}
        onClick={() => {
          setCurrentPage("test-server");
        }}
      >
      </Link>
    </div>
  );
}

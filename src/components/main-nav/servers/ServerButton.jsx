import { Link } from "react-router-dom";
import { useContext, useState, useRef } from "react";
import { CurrentPageContext } from "../../../context/CurrentPageContext";

export default function RandomServerButton(props) {
  const [currentPage, setCurrentPage] = useContext(CurrentPageContext);

  const [hoverState, setHoverState] = useState(false);

  const blob2 = useRef();
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
    // if (currentPage === "home") {
    //   return "white-blob-gone";
    // }
    if (currentPage === props.serverName) return "white-blob-highlighted";
    if (
      !hoverState &&
      (blob2?.current?.classList?.contains("white-blob-unhovered-2") ||
        blob2?.current?.classList?.contains("white-blob-gone"))
    )
      return "white-blob-gone";
    if (currentPage !== props.serverName) {
      if (blob2?.current?.classList?.contains("white-blob-highlighted"))
        return "white-blob-unhovered-2";
      if (hoverState) return "white-blob-hovered";
      if (!hoverState) return "white-blob-unhovered";
    }
  }

  function changeButtonClass() {
    // if (currentPage === "home") return "logo-button-unhovered-3";
    if (currentPage === props.serverName) return "logo-button-highlighted-2";
    if (currentPage !== props.serverName) {
      if (hoverState) return "logo-button-hovered-2";
      if (!hoverState) return "logo-button-unhovered-2";
    }
  }

  return (
    <div className="logo-container-2">
      <div className={changeBlobClass()} ref={blob2}></div>

      <Link
        to={`${props.serverName}`}
        className={changeButtonClass()}
        onMouseEnter={checkCurrentPageOnEnter}
        onMouseLeave={checkCurrentPageOnLeave}
        onClick={() => {
          setCurrentPage(props.serverName);
        }}
        style={{
          backgroundImage: `url(${props.ImgUrl})`,
        }}
      ></Link>
      <div ref={serverHoverText} className="hover-text">
        {props.serverTitle}
      </div>
    </div>
  );
}

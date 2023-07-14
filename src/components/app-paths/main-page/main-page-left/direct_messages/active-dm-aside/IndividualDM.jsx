import { useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentSectionLeftContext } from "../../../../../../context/CurrentSectionLeftContext";
import { CurrentDMIdContext } from "../../../../../../context/CurrentDMIdContext";
import { DmButtonRefContext } from "../../../../../../context/DmButtonRef";
import { CurrentSectionContext } from "../../../../../../context/CurrentSectionContext";
import Online from "../status_icons/Online";
import Offline from "../status_icons/Offline";
import Moon from "../status_icons/Moon";
import Dnd from "../status_icons/Dnd";
import { randomUsersList, removeDM } from "../users-list-data/randomUsersList";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../../config/firebase";
import { queryClient } from "../../../../../../App";
import { CurrentUserUidContext } from "../../../../../../context/CurrentUserUidContext";

export function IndividualDM(props) {
  let navigate = useNavigate();

  const [hoverState, setHoverState] = useState(false);

  const [currentSectionLeft, setCurrentSectionLeft] = useContext(
    CurrentSectionLeftContext
  );
  const [currentSection, setCurrentSection] = useContext(CurrentSectionContext);
  const [currentDMId, setCurrentDMId] = useContext(CurrentDMIdContext);
  const [dmButtonRef, setDmButtonRef] = useContext(DmButtonRefContext);
  const [currentUserUid, setCurrentUserUid] = useContext(CurrentUserUidContext);

  const delete_button = useRef();
  const dm_button = useRef();

  function changeNameClass() {
    if (hoverState) return "user-name-dm-hovered";
    if (!hoverState) return "user-name-dm-unhovered";
  }

  function changeDMStatusClass() {
    if (props.status !== "") {
      if (hoverState) {
        return "has-user-status-dm status-hovered";
      } else if (!hoverState) {
        return "has-user-status-dm";
      }
    } else if (props.status === "") {
      return "no-user-status-dm";
    }
  }

  function changeDMStatusIconClass() {
    if (props.status === "") return "no-status-icon";
    if (hoverState || currentDMId === props.id_number)
      return "status-message-icon-hovered";
    if (!hoverState) return "status-message-icon-unhovered";
  }

  function changeButtonClass() {
    if (currentSectionLeft !== "dm") return "personal-dm";
    if (currentDMId === props.id_number) {
      setDmButtonRef(dm_button);
      dm_button?.current?.focus();
      return "personal-dm pressed";
    }
    return "personal-dm";
  }

  const { mutate: closeDm } = useMutation(async () => {
    await updateDoc(doc(db, "users", currentUserUid), {
      directMessages: arrayRemove(props.id_number),
    });

    queryClient.setQueryData(["dmList"], (old) => {
      let filteredList = old.filter((user) => user.uid !== props.id_number);
      return filteredList;
    });
  });

  return (
    <Link
      to={`/discord-clone/main/dm/${props.id_number}`}
      className={changeButtonClass()}
      ref={dm_button}
      onMouseEnter={() => {
        delete_button.current.classList.remove("hidden");
        setHoverState(true);
      }}
      onMouseLeave={() => {
        delete_button.current.classList.add("hidden");
        setHoverState(false);
      }}
      onClick={() => {
        setCurrentSectionLeft("dm");
        setCurrentDMId(props.id_number);
      }}
    >
      <div className="pfp-container">
        <div
          className="pfp-circle"
          style={{
            backgroundImage: `url(${props.ImgUrl})`,
          }}
        >
          <div className="online-status-outer">
            {props.online_status === "online" && <Online />}
            {props.online_status === "offline" && <Offline />}
            {props.online_status === "moon" && <Moon />}
            {props.online_status === "dnd" && <Dnd />}
          </div>
        </div>
      </div>
      <section className="user-info-dm">
        <p className={changeNameClass()}>
          {props.username ? props.username : "randomName123"}
        </p>
        <div className="user-status-dm-container">
          <p className={changeDMStatusClass()}>
            {props.status ? props.status : ""}
          </p>
          <img
            src="https://icon-library.com/images/texting-icon-png/texting-icon-png-25.jpg"
            alt="status message"
            className={changeDMStatusIconClass()}
          />
        </div>
      </section>
      <div ref={delete_button} className="dm-delete-button hidden">
        <p
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            closeDm();
            if (currentDMId === props.id_number) {
              setCurrentSectionLeft("friends");
              navigate(`/discord-clone/main/friends/${currentSection}`);
            }
          }}
          className="x-button"
        >
          ×
        </p>
      </div>
    </Link>
  );
}

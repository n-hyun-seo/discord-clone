import {
  randomUsersList,
  addUserToList,
} from "../../../main-page-left/direct_messages/users-list-data/randomUsersList";
import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { CurrentDMIdContext } from "../../../../../../context/CurrentDMIdContext";
import { CurrentSectionLeftContext } from "../../../../../../context/CurrentSectionLeftContext";
import { DmButtonRefContext } from "../../../../../../context/DmButtonRef";
import { removeBlocked } from "./BlockedFriendsList";
import { useMutation } from "@tanstack/react-query";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../../../config/firebase";
import { CurrentUserUidContext } from "../../../../../../context/CurrentUserUidContext";
import { queryClient } from "../../../../../../App";

export default function PendingPageUser(props) {
  const [currentSectionLeft, setCurrentSectionLeft] = useContext(
    CurrentSectionLeftContext
  );
  const [currentDMId, setCurrentDMId] = useContext(CurrentDMIdContext);
  const [dmButtonRef, setDmButtonRef] = useContext(DmButtonRefContext);
  const [currentUserUid, setCurrentUserUid] = useContext(CurrentUserUidContext);

  const [listOfDMIds, setListOfDMIds] = useState([]);
  const [hoverState, setHoverState] = useState(false);
  const [moreHoverState, setMoreHoverState] = useState(false);
  const [messageHoverState, setMessageHoverState] = useState(false);

  const moreHoverRef = useRef();
  const moreImageRef = useRef();
  const moreCircleRef = useRef();

  function changeNameClass() {
    if (hoverState) return "user-name-dm-hovered nolimit";
    if (!hoverState) return "user-name-dm-unhovered nolimit";
  }

  function changeDMStatusIconClass() {
    if (props.status === "") return "no-status-icon";
    return "status-message-icon-unhovered";
  }

  const { mutate } = useMutation(async () => {
    await updateDoc(doc(db, "users", currentUserUid), {
      directMessages: arrayUnion(props.id_number),
    });

    const userInfoSnapshot = await getDoc(doc(db, "users", props.id_number));
    const userInfoData = await userInfoSnapshot.data().userInfo;

    queryClient.setQueryData(["dmList"], (old) => {
      if (old.filter((user) => user.uid === props.id_number).length === 0)
        return [...old, userInfoData];

      return old;
    });
  });

  const { mutate: unblockUser } = useMutation(async () => {
    await updateDoc(doc(db, "users", currentUserUid), {
      "friends.blocked": arrayRemove(props.id_number),
    });

    queryClient.setQueryData(["blockedList"], (old) => {
      let filteredList = old.filter((user) => user.uid !== props.id_number);
      return filteredList;
    });
  });

  return (
    <Link
      to={`../../dm/${props.id_number}`}
      className="test-test"
      onClick={(e) => {
        mutate();
        setCurrentSectionLeft("dm");
        setCurrentDMId(props.id_number);
      }}
      onMouseEnter={() => {
        setHoverState(true);
        moreCircleRef.current.style.backgroundColor = "#1b1c1e";
      }}
      onMouseLeave={() => {
        setHoverState(false);
        moreCircleRef.current.style.backgroundColor = "#2b2d31";
      }}
    >
      <div className="pfp-container">
        <div
          className="pfp-circle"
          style={{
            backgroundImage: `url("${props.ImgUrl}")`,
          }}
        ></div>
      </div>
      <section className="user-info-dm">
        <p className={changeNameClass()}>
          {props.username ? props.username : "error"}
        </p>
        <div className="user-status-dm-container">
          <p className="has-user-status-dm friend-request">Blocked</p>
          <img
            src="https://icon-library.com/images/texting-icon-png/texting-icon-png-25.jpg"
            alt="status message"
            className={changeDMStatusIconClass()}
          />
        </div>
      </section>
      <div className="text-more-box-container">
        <div
          className="pfp-circle text-box"
          ref={moreCircleRef}
          onMouseEnter={() => {
            setMoreHoverState(true);
            moreHoverRef.current.classList.add("hovered");
            moreImageRef.current.style.filter = "grayscale(0%)";
          }}
          onMouseLeave={() => {
            setMoreHoverState(false);
            moreHoverRef.current.classList.remove("hovered");
            moreImageRef.current.style.filter = "grayscale(100%)";
          }}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            unblockUser();
          }}
        >
          <div alt="chat" className="more-box-dm cancel">
            <img
              src="https://www.pngkit.com/png/full/52-522020_close-button-red-x.png"
              alt="cancel"
              ref={moreImageRef}
            />
          </div>
        </div>
        <div ref={moreHoverRef} className="more-hover-box unblock">
          Unblock
        </div>
      </div>
    </Link>
  );
}

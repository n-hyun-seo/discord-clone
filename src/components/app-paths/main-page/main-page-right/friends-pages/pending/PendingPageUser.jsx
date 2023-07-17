import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { CurrentDMIdContext } from "../../../../../../context/CurrentDMIdContext";
import { CurrentSectionLeftContext } from "../../../../../../context/CurrentSectionLeftContext";
import { CurrentIncomingFRContext } from "../../../../../../context/CurrentIncomingFRContext";
import Online from "../../../main-page-left/direct_messages/status_icons/Online";
import Offline from "../../../main-page-left/direct_messages/status_icons/Offline";
import Moon from "../../../main-page-left/direct_messages/status_icons/Moon";
import Dnd from "../../../main-page-left/direct_messages/status_icons/Dnd";
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
  const [currentIncomingFR, setCurrentIncomingFR] = useContext(
    CurrentIncomingFRContext
  );
  const [currentUserUid, setCurrentUserUid] = useContext(CurrentUserUidContext);

  const [hoverState, setHoverState] = useState(false);
  const [moreHoverState, setMoreHoverState] = useState(false);
  const [messageHoverState, setMessageHoverState] = useState(false);

  const moreHoverRef = useRef();
  const moreImageRef = useRef();
  const moreCircleRef = useRef();
  const messageHoverRef = useRef();
  const messageImageRef = useRef();
  const messageCircleRef = useRef();

  function changeNameClass() {
    if (hoverState) return "user-name-dm-hovered nolimit";
    if (!hoverState) return "user-name-dm-unhovered nolimit";
  }

  const { mutate: updateDmList } = useMutation(async () => {
    const personInfoSnapshot = await getDoc(doc(db, "users", props.id_number));
    const personInfoData = await personInfoSnapshot.data().userInfo;

    await updateDoc(doc(db, "users", currentUserUid), {
      directMessages: arrayUnion({ ...personInfoData }),
    });
  });

  const { mutate: acceptRequest } = useMutation(async () => {
    const personInfoSnapshot = await getDoc(doc(db, "users", props.id_number));
    const personInfoData = await personInfoSnapshot.data().userInfo;

    const userInfoSnapshot = await getDoc(doc(db, "users", currentUserUid));
    const userInfoData = await userInfoSnapshot.data().userInfo;

    await updateDoc(doc(db, "users", currentUserUid), {
      "friends.pending": arrayRemove({
        ...personInfoData,
        requestType: props.isIncoming,
      }),
    }); // remove person from my pending list

    await updateDoc(doc(db, "users", props.id_number), {
      "friends.pending": arrayRemove({
        ...userInfoData,
        requestType: "outgoing",
      }),
    }); // remove myself from person's pending list

    await updateDoc(doc(db, "users", currentUserUid), {
      "friends.all": arrayUnion({ ...personInfoData }),
    }); // add person to my friends list

    await updateDoc(doc(db, "users", props.id_number), {
      "friends.all": arrayUnion({ ...userInfoData }),
    }); // add myself to person's friends list
  });

  const { mutate: cancelIgnoreRequest } = useMutation(async () => {
    const personInfoSnapshot = await getDoc(doc(db, "users", props.id_number));
    const personInfoData = await personInfoSnapshot.data().userInfo;

    const userInfoSnapshot = await getDoc(doc(db, "users", currentUserUid));
    const userInfoData = await userInfoSnapshot.data().userInfo;
    await updateDoc(doc(db, "users", currentUserUid), {
      "friends.pending": arrayRemove({
        ...personInfoData,
        requestType: props.isIncoming,
      }),
    }); //remove person from my pending list

    await updateDoc(doc(db, "users", props.id_number), {
      "friends.pending": arrayRemove({
        ...userInfoData,
        requestType: "outgoing",
      }),
    }); //remove myself from person's pending list (outgoing)

    await updateDoc(doc(db, "users", props.id_number), {
      "friends.pending": arrayRemove({
        ...userInfoData,
        requestType: "incoming",
      }),
    }); //remove myself from person's pending list (incoming)
  });

  return (
    <Link
      to={`../../dm/${props.id_number}`}
      className="test-test"
      onClick={(e) => {
        updateDmList();
        setCurrentSectionLeft("dm");
        setCurrentDMId(props.id_number);
      }}
      onMouseEnter={() => {
        setHoverState(true);
        if (props.isIncoming === "incoming") {
          moreCircleRef.current.style.backgroundColor = "#1b1c1e";
          messageCircleRef.current.style.backgroundColor = "#1b1c1e";
        } else {
          moreCircleRef.current.style.backgroundColor = "#1b1c1e";
        }
      }}
      onMouseLeave={() => {
        setHoverState(false);
        if (props.isIncoming === "incoming") {
          moreCircleRef.current.style.backgroundColor = "#2b2d31";
          messageCircleRef.current.style.backgroundColor = "#2b2d31";
        } else {
          moreCircleRef.current.style.backgroundColor = "#2b2d31";
        }
      }}
    >
      <div className="pfp-container">
        <div
          className="pfp-circle"
          style={{
            backgroundImage: `url("${props.ImgUrl}")`,
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
          {props.username ? props.username : "error"}
        </p>
        <div className="user-status-dm-container">
          <p className="has-user-status-dm friend-request">
            {props.isIncoming === "incoming"
              ? "Incoming Friend Request"
              : "Outgoing Friend Request"}
          </p>
          <img
            src="https://icon-library.com/images/texting-icon-png/texting-icon-png-25.jpg"
            alt="status message"
            className="no-status-icon"
          />
        </div>
      </section>
      {props.isIncoming === "incoming" ? (
        <div className="text-more-box-container">
          <div
            className="pfp-circle text-box"
            ref={messageCircleRef}
            onMouseEnter={() => {
              setMessageHoverState(true);
              messageHoverRef.current.classList.add("hovered");
              messageImageRef.current.style.filter =
                "grayscale(0%) hue-rotate(90deg) brightness(85%)";
            }}
            onMouseLeave={() => {
              setMessageHoverState(false);
              messageHoverRef.current.classList.remove("hovered");
              messageImageRef.current.style.filter = "grayscale(100%)";
            }}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              acceptRequest();
            }}
          >
            <div alt="chat" className="text-box-dm accept">
              <img
                src="https://www.clker.com/cliparts/o/G/t/1/j/B/red-check-mark-hi.png"
                alt="accept"
                ref={messageImageRef}
              />
            </div>
          </div>
          <div ref={messageHoverRef} className="message-hover-box accept">
            Accept
          </div>
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
              cancelIgnoreRequest();
            }}
          >
            <div alt="chat" className="more-box-dm ignore">
              <img
                src="https://www.pngkit.com/png/full/52-522020_close-button-red-x.png"
                alt="ignore"
                ref={moreImageRef}
              />
            </div>
          </div>
          <div ref={moreHoverRef} className="more-hover-box cancel">
            Ignore
          </div>
        </div>
      ) : props.isIncoming === "outgoing" ? (
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
              cancelIgnoreRequest();
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
          <div ref={moreHoverRef} className="more-hover-box cancel">
            Cancel
          </div>
        </div>
      ) : (
        ""
      )}
    </Link>
  );
}

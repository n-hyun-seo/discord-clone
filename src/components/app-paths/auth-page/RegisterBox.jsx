import { auth, db, storage } from "../../../config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { CurrentUserUidContext } from "../../../context/CurrentUserUidContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function RegisterBox(props) {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [signInFail, setSignInFail] = useState(false);
  const [file, setFile] = useState("");
  const [filePath, setFilePath] = useState("");
  const [uploadFile, setUploadFile] = useState(null);

  const [currentUserUid, setCurrentUserUid] = useContext(CurrentUserUidContext);

  const registerBoxRef = useRef();

  props.setRegisterRef(registerBoxRef);

  async function createAccount(url = "") {
    try {
      const data = await createUserWithEmailAndPassword(auth, email, password);
      let userInfo = {
        friends: {
          pending: [],
          blocked: [],
          all: [],
          isBlockedBy: [],
        },
        directMessages: [],
        unreadMessages: [],
        userInfo: {
          ...data.user.metadata,
          email: data.user.email,
          username: username,
          uid: data.user.uid,
          photoURL: url,
          statusMessage: "",
          onlineStatus: "online",
          aboutMe: "",
          userTag: "placeholder#0000",
        },
      };
      setDoc(doc(db, "users", data.user.uid), userInfo);
      updateDoc(doc(db, "users", "allUsersList"), {
        everyUserList: arrayUnion({
          ...data.user.metadata,
          email: data.user.email,
          username: username,
          uid: data.user.uid,
          photoURL: url,
          statusMessage: "",
          onlineStatus: "online",
          aboutMe: "",
          userTag: "placeholder#0000",
        }),
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function checkLoggedIn() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserUid(user.uid);
        navigate("/discord-clone/main/friends/online");
      } else {
        return;
      }
    });
  }

  return (
    <div className="register-box" ref={registerBoxRef}>
      <h2>Create an account</h2>
      <form
        className="log-in-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (uploadFile === null) {
            createAccount(
              "https://firebasestorage.googleapis.com/v0/b/discord-clone-bd531.appspot.com/o/discordgrey.png?alt=media&token=827d2860-6b19-4789-948f-25e77d1c11f4"
            ).then(() => checkLoggedIn());
            return;
          }
          uploadBytesResumable(ref(storage, `pfp/${file}`), uploadFile)
            .then(() => getDownloadURL(ref(storage, `pfp/${file}`)))
            .then((data) => {
              createAccount(data);
            })
            .then(() => checkLoggedIn());
        }}
      >
        <label htmlFor="email" className="email-label">
          EMAIL
          {signInFail ? (
            <span className="invalid-log-in">
              <i>- Login or password is invalid.</i>
            </span>
          ) : (
            <span className="required-star">*</span>
          )}
        </label>
        <input
          name="email"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        ></input>
        <label htmlFor="username" className="email-label">
          USERNAME
          {signInFail ? (
            <span className="invalid-log-in">
              <i>- Login or password is invalid.</i>
            </span>
          ) : (
            <span className="required-star">*</span>
          )}
        </label>
        <input
          name="username"
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        ></input>
        <label htmlFor="password" className="password-label">
          PASSWORD
          {signInFail ? (
            <span className="invalid-log-in">
              <i>- Login or password is invalid.</i>
            </span>
          ) : (
            <span className="required-star">*</span>
          )}
        </label>
        <input
          name="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        ></input>
        <p className="pfp-label">PROFILE PICTURE</p>
        <div className="register-box-pfp-container">
          <input
            type="file"
            id="register-file"
            accept="image/png, image/jpeg, image/gif"
            onChange={(e) => {
              setFile(e.target.files[0].name);
              setFilePath(URL.createObjectURL(e.target.files[0]));
              setUploadFile(e.target.files[0]);
            }}
          />
          <label htmlFor="register-file" className="register-pfp">
            <img
              src="https://cdn4.iconfinder.com/data/icons/documents-36/25/add-picture-512.png"
              alt="Add pfp"
            />
          </label>
          <p className="filename-pfp">{file}</p>
        </div>
        {uploadFile && (
          <div className="preview-pic-box">
            <p className="pfp-label">PREVIEW</p>
            <div className="pfp-container preview">
              <div
                className="pfp-circle"
                style={{
                  backgroundImage: `url("${filePath}")`,
                }}
              >
                <div className="online-status-outer preview">
                  <div className="online-status"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <button type="submit" className="log-in-button">
          Continue
        </button>
        <div className="register-description-text">
          <button
            className="register-button"
            type="button"
            onClick={() => {
              props.setOnRegisterPage(false);
              props.logInRef.current.style.opacity = "100%";
              props.logInRef.current.style.marginLeft = "530px";
              registerBoxRef.current.style.opacity = "0%";
            }}
          >
            Already have an account?
          </button>
        </div>
        <p className="disclaimer-text">DISCLAIMER: This personal project has nothing to do with actual Discord.</p>
      </form>
    </div>
  );
}

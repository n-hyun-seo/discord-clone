import { useState } from "react";
import { useRef } from "react";

export default function FriendsNavSearchBar(props) {
  const [inputValue, setInputValue] = useState("");
  const [focusState, setFocusState] = useState(false);

  const searchWindow = useRef();
  return (
    <div ref={searchWindow} className="dm-search-input-container">
      <input
        className="dm-search-input"
        placeholder="Search"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onFocus={(e) => {
          setFocusState(true);
          searchWindow.current.style.width = "225px";
        }}
        onBlur={(e) => {
          setFocusState(false);
          searchWindow.current.style.width = "130px";
        }}
      ></input>
    </div>
  );
}

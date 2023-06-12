import { Link } from "react-router-dom";

export default function Button(props) {
  return (
    <div className={`left-button-container ${props.containerClass}`}>
      <Link>
        <button className={props.buttonClass}>{props.text}</button>
      </Link>
    </div>
  );
}

import { Link } from "react-router-dom";

export default function Button(props) {
  return (
    <div className={`left-button-container ${props.containerClass}`}>
        <button className={props.buttonClass}>
          <div className="button-img-container">
            <img src={props.source} alt="icon"></img>
          </div>
          <p>{props.text}</p>
        </button>
      
    </div>
  );
}

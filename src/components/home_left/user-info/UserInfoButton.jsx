export default function UserInfoButton(props) {
  return (
    <div className={`icon-container ${props.containerClassName}`}>
      <img
        className={props.ImgClassName}
        src={props.ImgUrl}
        alt={props.alt}
      ></img>
    </div>
  );
}

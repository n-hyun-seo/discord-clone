export default function FriendsNavRightButton(props) {
  return (
    <div className={props.containerClass}>
      <img
        className={props.childClass}
        src={props.ImgUrl}
        alt={props.alt}
      ></img>
    </div>
  );
}

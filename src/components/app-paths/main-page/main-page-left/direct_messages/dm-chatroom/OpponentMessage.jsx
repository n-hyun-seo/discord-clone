export default function Opponentprops(props) {
  return (
    <div>
      <p>{props.propsContent}</p>
      <p>{props.sentBy}</p>
      <p>{props.timestamp}</p>
      <p>opponent message</p>
    </div>
  );
}

export default function MyMessage(props) {
  return (
    <div>
      <p>{props.propsContent}</p>
      <p>{props.sentBy}</p>
      <p>{props.timestamp}</p>
      <p>my message</p>
    </div>
  );
}

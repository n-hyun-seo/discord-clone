export default function SearchInput(props) {
  return (
    <div className="search-input-container">
      <input type="text" className={props.classNaming} placeholder="Find or start a conversation"></input>
    </div>
  );
}

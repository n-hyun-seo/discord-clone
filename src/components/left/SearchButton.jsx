export default function SearchButton(props) {
  return (
    <div className="search-button-container">
      <button type="text" className={props.classNaming}>
        Find or start a conversation
      </button>
    </div>
  );
}

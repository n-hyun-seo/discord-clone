export default function LoadingVisual() {
  return (
    <div className="dm-messages loading">
      <div className="dm-header loading">
        <p>DIRECT MESSAGES</p>
        <div className="add-sign">+</div>
      </div>
      <img
        src="https://www.istitutomarangoni.com/fe-web/img/marangoni/loader.gif"
        alt="loading list"
        style={{ width: "150px", marginTop: "50px", position: "absolute" }}
      />
    </div>
  );
}

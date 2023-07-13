export default function LoadingVisual() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src="https://www.istitutomarangoni.com/fe-web/img/marangoni/loader.gif"
        alt="loading list"
        style={{ width: "150px", marginTop: "100px" }}
      />
    </div>
  );
}

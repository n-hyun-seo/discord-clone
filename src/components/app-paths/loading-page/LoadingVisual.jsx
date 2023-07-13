export default function LoadingVisual() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img
        src="https://www.istitutomarangoni.com/fe-web/img/marangoni/loader.gif"
        alt="loading gif"
        style={{ scale: "150%", height: "80px", marginTop: "-80px" }}
      />
      <p style={{ color: "white", fontSize: "12px", marginTop: "-15px" }}>
        Loading...
      </p>
    </div>
  );
}

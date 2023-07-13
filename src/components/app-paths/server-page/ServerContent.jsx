import UserInfo from "../main-page/main-page-left/current-user-info/UserInfo";

export default function RandomServer() {
  return (
    <div className="content">
      <div className="left-server">
        <div className="channels"></div>
        <UserInfo ImgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9O7zceDn3TKJA6lgUpjbb32m23z9P7gwCGw&usqp=CAU" />
      </div>
      <div className="right-server"></div>
    </div>
  );
}

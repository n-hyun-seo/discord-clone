import { useRef } from "react";
import IndividualDM from "./IndividualDM";
export default function DirectMessages(props) {
  const dm_text = useRef();

  return (
    <div className="direct-messages-container">
      <div
        className="dm-header"
        onMouseEnter={() => {
          dm_text.current.classList.add("hovered");
        }}
        onMouseLeave={() => {
          dm_text.current.classList.remove("hovered");
        }}
      >
        <p ref={dm_text}>DIRECT MESSAGES</p>
        <div className="add-sign">+</div>
      </div>
      <div className="dm-messages">
        <IndividualDM ImgUrl="https://pbs.twimg.com/profile_images/980145664712740864/aNWjR7MB_400x400.jpg" />
        <IndividualDM ImgUrl="https://qph.cf2.quoracdn.net/main-qimg-89380dcfb5e239d42d8ee3475bedcd36-lq" />
        <IndividualDM ImgUrl="https://doitbeforeme.com/wp-content/uploads/2022/12/pfp-anime.webp" />
        <IndividualDM ImgUrl="https://archive.org/download/discordprofilepictures/discordblue.png" />
        <IndividualDM ImgUrl="https://xsgames.co/randomusers/assets/avatars/male/8.jpg" />
        <IndividualDM ImgUrl="https://cdnstorage.sendbig.com/unreal/female.webp" />
        <IndividualDM ImgUrl="https://preview.redd.it/3z11zoc0rhv51.jpg?width=474&format=pjpg&auto=webp&s=7c317ebaa78a0ed72273220c3113bcf2a3666ec6" />
        <IndividualDM ImgUrl="https://i.pinimg.com/280x280_RS/37/77/3f/37773f14fac74cdeff6c00e3b8d79ec7.jpg" />
        <IndividualDM ImgUrl="https://www.asiamediajournal.com/wp-content/uploads/2022/10/Cool-PFP-download.jpg" />
        <IndividualDM ImgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMnq9Mhgpm3ETi9Bc262c480GEprcI7aAlSA&usqp=CAU" />
        <IndividualDM ImgUrl="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&w=1000&q=80" />
        <IndividualDM ImgUrl="https://images.theconversation.com/files/438138/original/file-20211216-25-1hu3e65.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop" />
        <IndividualDM ImgUrl="https://i.ytimg.com/vi/QWEx8HxPSls/maxresdefault.jpg" />
      </div>
    </div>
  );
}

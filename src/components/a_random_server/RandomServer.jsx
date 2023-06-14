import { useContext } from "react";
import { CurrentPageContext } from "../../CurrentPageContext";

export default function RandomServer(props) {
  
  const [currentPage, setCurrentPage] = useContext(CurrentPageContext);
  return <div className="content">
    <div className="left-test-server"></div>
    <div className="right-test-server"></div>
  </div>;
}

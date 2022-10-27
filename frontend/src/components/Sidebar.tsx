import "@styles/Components/Sidebar.css";

interface props {
  show: boolean;
  setShow(show: boolean): void;
}

const Sidebar = ({ show, setShow }: props) => {
  return (
    <aside className={`sidebar ${show ? "active" : ""}`}>
      <div className="side-header" onClick={() => setShow(!show)}>
        <p>Template</p>
      </div>

      <div className="side-body">
        <ul>
          <li>
            <a href="#">Option A</a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

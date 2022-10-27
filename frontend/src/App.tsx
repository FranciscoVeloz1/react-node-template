import { useState } from "react";
import Sidebar from "@components/Sidebar";

const App = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Sidebar show={show} setShow={setShow} />

      <div>
        <p>Hello world</p>
        <button onClick={() => setShow(!show)}>=</button>
      </div>
    </>
  );
};

export default App;

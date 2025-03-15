import { useState } from "react"
//import HomePage from "./components/HomePage"
import SignInModal from "./components/SignInModal";

function App() {
  const [displayList, setDisplayList] = useState(true);

  return (
    <div className="m-5">
      {displayList && <SignInModal />}
      <button className="btn btn-primary" onClick={() => { setDisplayList(!displayList) }}>Toggle</button>
    </div>

  )
}


export default App
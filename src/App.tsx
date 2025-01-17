import { useState } from "react"
import PostsList from "./components/PostsList"

function App() {
  const [displayList, setDisplayList] = useState(true);

  return (
    <div className="m-5">
      {displayList && <PostsList />}
      <button className="btn btn-primary" onClick={() => { setDisplayList(!displayList) }}>Toggle</button>
    </div>

  )
}


export default App
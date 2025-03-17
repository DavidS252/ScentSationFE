import ItemsList from "./ItemsLIst"
import usePosts from "../../hooks/usePosts"

function HomePage() {

  const { posts, error, isLoading } = usePosts();

  return (
    <div className="m-5">
      <h1 style={{ textAlign: 'center' }}>Find Your Scent</h1>

      <br></br>
      <br></br>

      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      <ItemsList posts={posts} onItemsSelected={() => { }}/>
    </div>

  )
}

export default HomePage
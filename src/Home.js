import Feed from './Feed';

const Home = ({ posts, fetchError, isLoading }) => {
    return (
      <main className="Home">
          {isLoading && <p className='statusMsg'>Loading posts........</p>}
          {fetchError && <p className='statusMsg' style={{color: "red"}}>Can't load posts</p>}
          {posts.length ? (
            <Feed posts = {posts} />
          ) : (
            <p style = {{ marginTop: "2rem" }}>
              No Posts to Display 
            </p>
          )}
      </main>
    )
  }
  
  export default Home
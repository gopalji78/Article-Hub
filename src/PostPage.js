import { useParams, Link } from "react-router-dom"

const PostPage = ({ posts, handleDelete }) => {
  const { id } = useParams();
  // console.log(id);
  const post = posts.find((post) => (
    (post.id).toString() === id
  ));

  // console.log(1);

  // console.log(post)
    return (
      <main className="PostPage">
        <article className="post">
            {post &&
                <>
                  <h1>{post.title}</h1>
                  <p className="postDate">{post.datetime}</p>
                  <p className="postBody">{post.body}</p>
                  <Link to={`/edit/${post.id}`}> <button className="editButton">Update</button> </Link>
                  <button className = "deleteButton" onClick={() => handleDelete(post.id)}>
                      Delete Post 
                  </button>
                </>
            }
            {!post && 
                <>
                  
                  <h1>PostPage Not Found</h1>
                  <p>Very disappointing</p>
                  <Link to='/'>Home Page</Link>
              </>
            }
        </article>
      </main>
    )
  }
  
  export default PostPage
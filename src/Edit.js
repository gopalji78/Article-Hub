import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Edit = ({
    posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle
}) => {
    const { id } = useParams();
    // console.log(typeof(id));
    const post = posts.find(post => post.id.toString() == id);

    useEffect(() => {
        if (post) {
            setEditBody(post.body);
            // console.log(editBody);
            setEditTitle(post.title);
        }
    }, [post, editBody, editTitle])

  return (
    <main className="NewPost">
        {editTitle && 
            <>
                <h2>New Post</h2>
                <form className="newPostForm" onSubmit= {(e) => e.preventDefault()}>
                    <label htmlFor="postTitle">Title:</label>
                    <input 
                        id = 'PostTitle' 
                        type="text" 
                        required
                        value = {editTitle}
                        onChange = {(e) => setEditTitle(e.target.value)}
                    />
                    <label htmlFor="postBody">Post:</label>
                    <textarea 
                        type="textarea" 
                        required
                        value = {editBody}
                        onChange = {(e) => setEditBody(e.target.value)}
                    />
                    <button type='submit' onClick = {() => handleEdit(id)}>Submit</button>
                </form>
            </>
        }
        {!editTitle && 
            <>
                
                <h1>EditPage Not Found</h1>
                <p>Very disappointing</p>
                <Link to='/'>Home Page</Link>
            </>
        }
      </main>
  )
}

export default Edit

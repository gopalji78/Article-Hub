import Home from './Home';
import NewPost from './NewPost';
import Edit from './Edit';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import Layout from './Layout';
import api from './api/items';
import useAxiosFetch from './hooks/useAxiosFetch';

function App() {
  const [posts, setPosts] = useState([])
  const [search, setSearch ] = useState(" ");
  const [searchResult, setSearchResult] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate();
  
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/items');

  useEffect(()=>{
    setPosts(data);
  }, [data])

  // console.log(data);
  // console.log(typeof(data))

  //this is not used because we are now useing custom hook to fetch data 

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get('/items');
        console.log(response);
        //this can be used to check for the case where the response can be recieved or cannot be 
        // if (!response.ok) throw Error("Kuch toh gadbad hai") 
        setPosts(response.data);
        // console.log(posts);
      } catch (err) {
          // Not in range of 200 range 
          if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.header);
          }
          else {
            console.log(`Error: ${err.message}`);
          }
      }
    }

    fetchPost();
  }, [])


  useEffect(() => {
    const filteredResult = posts.filter((post) => (
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase())
    ))

    setSearchResult(filteredResult.reverse());
  }, [posts, search])

  const handleDelete = async (id) => {
    try{
      api.delete(`/items/${id}`);
      const postList = posts.filter((post) => post.id !== id);
      setPosts(postList);
      navigate('/')
    }catch(err){
      console.log(`Error ${err.message}`);
    }
  }

  const handleEdit = async (id) => {
    const postDate = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime: postDate, body: editBody}
    try {
      const response = await api.put(`/items/${id}`, updatedPost);
      setPosts(posts.map(post => post.id.tostring() === id ? response.data : post));
      setEditBody('');
      setEditTitle('');
    }catch(err){
      console.log(`Error ${err.message}`);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length-1].id + 1 : 1;
    const postDate = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime: postDate, body: postBody}
    try{
      const response = await api.post('/items', newPost)
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostBody('');
      setPostTitle('');
      navigate('/');
    }catch(err){
      console.log(`Error ${err.response.message}`);
    }
  }

  return (
   
        <Routes>
          <Route path='/' element= {<Layout
            search={search}
            setSearch={setSearch} 
          />}>
            <Route index element={<Home 
                posts = {searchResult} 
                fetchError = {fetchError}
                isLoading = {isLoading}
                />} />
            <Route path='post'>
              <Route index element={<NewPost 
                postTitle = {postTitle}
                setPostTitle = {setPostTitle}
                postBody = {postBody}
                setPostBody = {setPostBody}
                handleSubmit = {handleSubmit}
              />} />
              <Route  path=':id' element={<PostPage posts={posts} handleDelete={handleDelete}/>} />
            </Route>
            <Route path='edit/:id' element={<Edit
                posts = {posts}
                handleEdit = {handleEdit}
                editBody = {editBody}
                setEditBody = {setEditBody}
                editTitle = {editTitle}
                setEditTitle = {setEditTitle}
              />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<Missing />} />
          </Route>
        </Routes>
  
  );
}

export default App;

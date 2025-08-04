import PostCards from '../components/PostCards';
import { useContext } from 'react';
import { PostsContext } from '../contexts/PostsContext';

function Home() {
  const posts = useContext(PostsContext);

  return (
    <div>
      <h1>Posts</h1>
      <PostCards postsArray={posts}></PostCards>
    </div>
  );
}

export default Home;

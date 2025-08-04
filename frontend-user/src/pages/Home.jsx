import PostCards from '../components/PostCards';
import { useContext } from 'react';
import { PostsContext } from '../contexts/PostsContext';

function Home() {
  const posts = useContext(PostsContext);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
      <PostCards postsArray={posts} />
    </div>
  );
}

export default Home;

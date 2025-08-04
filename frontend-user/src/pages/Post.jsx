import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PostsContext } from '../contexts/PostsContext';

function Post() {
  const posts = useContext(PostsContext);
  const { id } = useParams();

  if (!posts) return <p>Loading post...</p>;

  const post = posts.find((post) => post.id.toString() === id);
  console.log(post, id);

  if (!post) return <p>Post not found.</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

export default Post;

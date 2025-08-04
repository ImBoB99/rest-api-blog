import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PostsContext } from '../contexts/PostsContext';

function Post() {
  const posts = useContext(PostsContext);
  const { id } = useParams();

  if (!posts) return <p className="text-gray-500">Loading post...</p>;

  const post = posts.find((post) => post.id.toString() === id);
  if (!post) return <p className="text-red-500">Post not found.</p>;

  return (
    <article className="prose lg:prose-xl max-w-3xl mx-auto">
      <h1 className="mb-4">{post.title}</h1>
      <p className="text-sm text-gray-400 mb-6">Published on {new Date(post.createdAt).toLocaleDateString()}</p>
      <div className="text-gray-800 leading-relaxed">{post.content}</div>
    </article>
  );
}

export default Post;

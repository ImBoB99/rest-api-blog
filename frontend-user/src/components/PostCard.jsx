import { Link } from 'react-router-dom';

function PostCard({ title, id, content, publishedOn }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
      <small>{publishedOn}</small>
      <Link to={`/post/${id}`}>Read More</Link>
    </div>
  );
}

export default PostCard;

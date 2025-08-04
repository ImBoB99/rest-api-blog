import { Link } from 'react-router-dom';

function PostCard({ title, id, content, publishedOn }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow hover:shadow-md transition-shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-3 line-clamp-3">{content}</p>
      <small className="block text-sm text-gray-400 mb-3">{new Date(publishedOn).toLocaleDateString()}</small>
      <Link to={`/post/${id}`} className="inline-block text-blue-600 hover:underline font-medium">
        Read More →
      </Link>
    </div>
  );
}

export default PostCard;

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/posts/${id}`);
        if (!res.ok) throw new Error('Failed to fetch post');
        const data = await res.json();

        setTitle(data.title);
        setContent(data.content);
        setIsPublished(data.published);
        setLoading(false);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          isPublished,
        }),
      });

      if (!res.ok) throw new Error('Post update failed');

      const updated = await res.json();
      console.log('Post updated:', updated);
      navigate('/admin/posts');
    } catch (err) {
      console.error(err.message);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading post data...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 shadow-md rounded mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Post</h1>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows="6"
          className="border border-gray-300 rounded px-4 py-2 resize-none focus:outline-none focus:ring focus:ring-blue-300"
        />

        <label className="inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="accent-blue-600"
          />
          Publish?
        </label>

        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditPost;

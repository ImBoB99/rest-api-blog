import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, isPublished }),
      });

      if (!response.ok) throw new Error('Post creation failed');

      const data = await response.json();
      console.log('Post created:', data);
      navigate('/admin/posts');
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 shadow-md rounded mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Create New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          Create Post
        </button>
      </form>
    </div>
  );
}

export default AddPost;

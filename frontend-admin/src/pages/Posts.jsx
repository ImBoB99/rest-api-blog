import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/posts/', { mode: 'cors' });
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.log('Error fetching posts', error);
      }
    };

    fetchPosts();
  }, []);

  const deletePost = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        mode: 'cors',
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to delete post');
      const data = await res.json();

      console.log(data);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (error) {
      console.log('Error deleting post', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Posts Admin Page</h1>
        <Link to="/admin/add-post" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          + New Post
        </Link>
      </div>

      <div className="grid gap-4">
        {posts.length === 0 ? (
          <p className="text-gray-600">No posts available.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="bg-white shadow-md rounded p-4 border border-gray-200">
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-500">Created at: {new Date(post.createdAt).toLocaleString()}</p>
              <p className={`text-sm font-medium mt-1 ${post.published ? 'text-green-600' : 'text-red-600'}`}>
                {post.published ? 'Published' : 'Not Published'}
              </p>
              <button
                type="button"
                onClick={() => deletePost(post.id)}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
              >
                Delete Post
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Posts;

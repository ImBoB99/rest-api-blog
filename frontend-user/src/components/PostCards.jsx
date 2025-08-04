import PostCard from './PostCard';

function PostCards({ postsArray }) {
  if (!postsArray || postsArray.length === 0) {
    return <p className="text-gray-500">No posts to display.</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {postsArray.map((post) => (
        <PostCard key={post.id} id={post.id} title={post.title} content={post.content} publishedOn={post.createdAt} />
      ))}
    </div>
  );
}

export default PostCards;

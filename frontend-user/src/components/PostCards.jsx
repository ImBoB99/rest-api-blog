import PostCard from "./PostCard";

function PostCards({ postsArray }) {
  return (
    <div>
      <p>Post Cards Container</p>

      {postsArray &&
        postsArray.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            content={post.content}
            publishedOn={post.createdAt}
          />
        ))}
    </div>
  );
}

export default PostCards;

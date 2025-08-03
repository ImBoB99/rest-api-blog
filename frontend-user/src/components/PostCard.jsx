function PostCard({ title, content, publishedOn }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
      <small>{publishedOn}</small>
    </div>
  );
}

export default PostCard;

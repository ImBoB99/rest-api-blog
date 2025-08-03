import { useEffect, useState } from 'react';
import { getPosts } from '../helpers/postHelpers';
import PostCards from '../components/PostCards';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Home() {
  const [postsArray, setPostsArray] = useState(null);
  console.log(postsArray);

  useEffect(() => {
    getPosts()
      .then((data) => {
        setPostsArray(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <PostCards postsArray={postsArray}></PostCards>
    </div>
  );
}

export default Home;

import { useEffect, useState } from "react";
import { getPosts } from "../helpers/postHelpers";
import PostCards from "./PostCards";
import Header from "./Header";
import Footer from "./Footer";

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
      <Header></Header>
      <h1>Posts</h1>
      <PostCards postsArray={postsArray}></PostCards>
      <Footer></Footer>
    </div>
  );
}

export default Home;

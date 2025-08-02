import { useEffect } from "react";
import { getPosts } from "../helpers/postHelpers";

function Home() {
  useEffect(() => {
    getPosts()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Posts</h1>
    </div>
  );
}

export default Home;

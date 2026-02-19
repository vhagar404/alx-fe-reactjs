import { useParams } from "react-router-dom";

const BlogPost = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Blog Post</h2>
      <p>Viewing blog post with ID: {id}</p>
    </div>
  );
};

export default BlogPost;

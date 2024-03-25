import axios from "axios";
import { useState, useEffect } from "react";
import BlogComponent from "../components/BlogComponent";
import { useNavigate } from "react-router-dom";

const URL = "https://backend.mediyyumm.workers.dev";

export const BlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<{ title: string; content: string }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${URL}/api/v1/blog/bulk`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        console.log(response);
        if (response.status === 200) {
          setBlogs(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    console.log(blogs);
    fetchBlogs();
  }, []);

  const navigateToNewBlog = () => {
    navigate("/newBlog");
  };

  return (
    <div className="px-20 py-5 ">
      <div className=" flex justify-between">
        <div className="text-3xl font-extrabold ">mediyYUMM</div>
        <div className="text-md font-bold">
          <button
            className="border rounded-lg border-black p-2"
            onClick={navigateToNewBlog}
          >
            + New
          </button>
        </div>
      </div>

      <div className="w-8/12 mx-auto my-10">
        {blogs &&
          blogs.map((blog) => {
            return <BlogComponent blog={blog} />;
          })}
      </div>
    </div>
  );
};

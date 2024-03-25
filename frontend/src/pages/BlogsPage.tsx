import { useState } from "react";

export const BlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<{ title: string; content: string }[]>([]);
  return (
    <div>
      {blogs &&
        blogs.map((blog) => {
          return (
            <div>
              <div>{blog.title}</div>
              <div>{blog.content}</div>
            </div>
          );
        })}
    </div>
  );
};

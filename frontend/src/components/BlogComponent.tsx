import React from "react";

type Blog = { title: string; content: string };

const BlogComponent = ({ blog }:any) => {
  // const {blog} = props;
  return (
    <div className="px-20">
      <div className="font-bold text-2xl">{blog.title}</div>
      <div className="my-4">{blog.content}</div>
      <hr className="my-10" />
    </div>
  );
};

export default BlogComponent;

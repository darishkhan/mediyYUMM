import React from "react";

const NewBlog = () => {

    const 
  return (
    <div className="px-20 py-5">
      <div className=" flex justify-between">
        <div className="text-3xl font-extrabold ">mediyYUMM</div>
        <div className="text-md font-bold"></div>
      </div>
      <div className="w-7/12 mx-auto my-20">
        <div>
          <input className="text-5xl  " type="text" placeholder="Title..." />
        </div>
        <div>
          <input type="text" className="text-xl" placeholder="content..." />
        </div>
      </div>
    </div>
  );
};

export default NewBlog;

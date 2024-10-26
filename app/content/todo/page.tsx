import React from "react";

interface Props {}

const Page: React.FC<Props> = ({}) => {
  return (
    <div className="bg-[#e3e9ff] w-full min-h-[calc(100vh-80px)] flex justify-center text-black">
      <div className="w-1/2 h-3/4 flex justify-center items-center border bg-white"></div>
    </div>
  );
};

export default Page;

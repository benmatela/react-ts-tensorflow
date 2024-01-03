import React from "react";
import { Button } from "../Button";

export const Footer = () => {
  return (
    <div id="footer" className="bg-black p-0 m-0">
      <div className="container flex flex-col items-center justify-between px-6 py-24 mx-auto space-y-12 md:py-12 md:flex-row md:space-y-0">
        <h2 className="text-2xl font-bold leading-tight text-center text-white md:text-4xl md:max-w-xl md:text-left">
          TensorFlow is amazing!
        </h2>
        <Button
          label="Like"
          className="p-3 px-6 pt-2 text-black-700 hover:text-white bg-white rounded-full shadow-2xl baseline hover:bg-gray-600 cursor-pointer"
        />
      </div>
    </div>
  );
};

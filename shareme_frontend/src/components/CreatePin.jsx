import React, { useState } from "react";
import { AiOutlineCloud, AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { client } from "../client";
import Spinner from "./Spinner";

//list of categories
import { categories } from "../uitls/data";

const CreatePin = ({ user }) => {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState();
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState();
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5  ">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in ">
          Please fill out all fields.
        </p>
      )}
      <div className="flex lg:flex-row flex-col justify-end items-center gb-white lg:p-5 p3 lg:w-4/5 w-full ">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner />}
            {wrongImageType && <p>Wrong image type</p>}
            {!imageAsset ? (
              <label htmlFor="">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg"> Click to upload</p>
                  </div>
                </div>
              </label>
            ) : (
              <p>Something else here</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;

import React, { useState } from "react";
import { urlFor, client } from "../client";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { fetchUser } from "../uitls/fetchUser";

const Pin = ({ pin: { postedby, image, _id, destination, save } }) => {
  const [postHovered, setPostHovered] = useState(false);

  const navigate = useNavigate();
  const user = fetchUser();
  const Saved = save?.filter((item) => {
    return item.postedBy._id == user.googleId;
  })?.length;
  console.log(postedby);

  const alreadySaved = !!Saved;

  const savePin = (id) => {
    if (alreadySaved?.length === 0) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user?.googleId,
            postedBy: {
              _type: "postedBy",
              _ref: user?.googleId,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
        });
    }
  };

  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out "
      >
        <img
          className="rounded-lg w-full"
          src={urlFor(image).width(250).url()}
          alt="user-post"
        />
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2  z-50"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl= `}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white  w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none "
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {save?.length} saved
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                >
                  save
                </button>
              )}
            </div>
            <div className="flex justify-between items-center gap-2 w-full ">
              {destination && (
                <a
                  href={destination}
                  target="_blank"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                  rel="noreferrer"
                >
                  <BsFillArrowRightCircleFill />
                  {destination.length > 21
                    ? destination.slice(8, 21)
                    : destination.slice(8)}
                </a>
              )}

              {postedby?._id === user.googleId && (
                <button
                  type="button"
                  className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`/user-profile/${postedby?._id}`}
        className="flex gap-2 mt-2 items-center"
      >
        <img
          className="w- 8 h-8 rounded-full object-cover"
          src={postedby?.image}
          alt="user-profile"
        />
        <p className="font-semibold capitalize">{postedby?.userName}</p>
      </Link>
    </div>
  );
};

export default Pin;

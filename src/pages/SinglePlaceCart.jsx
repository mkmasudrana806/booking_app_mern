import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SinglePlaceCart = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get("/page/places")
      .then((response) => setPlaces(response.data))
      .catch((error) => console.error(error));
  }, []);

  console.log("all places", places);

  return (
    <div className="mt-4">
      {places.length > 0 &&
        places.map((place, index) => (
          <div key={index}>
            <Link
              to={`/account/places/new?id=${place._id}`}
              className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded"
            >
              <div className=" w-32 h-32 bg-gray-300 grow shrink-0">
                {place.photos.length > 0 && (
                  <img src={place.photos[0]} alt="" />
                )}
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default SinglePlaceCart;

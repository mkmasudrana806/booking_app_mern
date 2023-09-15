
import { Link,  useParams } from "react-router-dom";
// import axios from "axios";

import SinglePlaceCart from "./SinglePlaceCart";
import PlaceCreateForm from "./PlaceCreateForm";

const PlacePages = () => {
  // use params to recieve routes parameters
  const { action } = useParams();
 
  return (
    <div>
      {/* when route param is not 'new' then show add places button and previous added places */}
      {action !== "new" && (
        <>
          <div className="text-center">
            <Link
              to={"/account/places/new"}
              className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
              Add new place
            </Link>
          </div>
          <SinglePlaceCart />
        </>
      )}
      {/* when route param is 'new' then show a form to create place */}
      {action === "new" && (
       <PlaceCreateForm />
      )}
      {action === "bookings" && (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-gray-900">Booking</h1>
          <p className="text-gray-500 text-sm mt-4">
            Please wait while we process your booking
          </p>
          <button className="primary my-4">Book</button>
        </div>
      )}
    </div>
  );
};

export default PlacePages;

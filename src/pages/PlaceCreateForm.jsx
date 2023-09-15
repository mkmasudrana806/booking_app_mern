import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PhotosUploader from "../PhotosUploader";

const PlaceCreateForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhoto, setAddedPhoto] = useState([]);
  const [description, setDescription] = useState("");

  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState("");

  // fetch data when single cart is selected
  // by default this is createPlaceForm
  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get("/page/places/" + id)
      .then(({ data }) => {
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhoto(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
      })
      .catch((err) => {
        console.log(err);
      });
    // axios.get("/page/places/")
  }, [id]);

  // handlePerksCheckbox
  const handlePerksCheckbox = (event) => {
    const label = event.target.closest("label");
    const span = label.querySelector("span");
    const itemName = span.textContent;
    if (event.target.checked) {
      setPerks((prev) => [...prev, itemName]);
    } else {
      setPerks((prev) => prev.filter((item) => item !== itemName));
    }
  };

  // addNewPage
  const handleAddNewPage = async (event) => {
    event.preventDefault();
    const placeData = {
      title,
      address,
      addedPhoto,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    };
    console.log("added photo after save button", addedPhoto);
    try {
      await axios.post("/page/accomodation/new", { placeData });
      // .then((response) => console.log(response));
      navigate("/account/places");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <form onSubmit={handleAddNewPage} action="">
        <h2 className="text-2xl mt-4">Title</h2>
        <p className="text-gray-500 text-sm ">
          Title for your place. should be short and catchy as in advertise
        </p>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="title, for example: My lovely apt."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h2 className="text-2xl mt-4">Address</h2>
        <input
          type="text"
          name="address"
          id="address"
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <h2 className="text-2xl mt-4">Photos</h2>
        <p className="text-gra-500 text-sm">more = better</p>
        {/* photos uploader function  */}
        <PhotosUploader addedPhoto={addedPhoto} setAddedPhoto={setAddedPhoto} />
        <h2 className="text-2xl mt-4">Description</h2>
        <p className="text-gray-500 text-sm ">Description of the place</p>
        <textarea
          className="border mt-2 p-2"
          cols={50}
          rows={5}
          type="text"
          name="description"
          id="description"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* perks checkbox fields */}
        <h2 className="text-2xl mt-4">Perks</h2>
        <p className="text-gray-500 text-sm my-2 ">Perks of the place</p>
        <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <label
            className="border p-4 flex rounded-xl gap-2 items-center cursor-pointer"
            htmlFor="wifi"
          >
            <input
              type="checkbox"
              onChange={handlePerksCheckbox}
              name="wifi"
              id="wifi"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
              />
            </svg>
            <span>WiFi</span>
          </label>
          <label
            className="border p-4 flex rounded-xl gap-2 items-center cursor-pointer"
            htmlFor="spot"
          >
            <input
              type="checkbox"
              onChange={handlePerksCheckbox}
              name="spot"
              id="spot"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
            <span>Free parking spot</span>
          </label>
          <label
            className="border p-4 flex rounded-xl gap-2 items-center cursor-pointer"
            htmlFor="pets"
          >
            <input
              type="checkbox"
              onChange={handlePerksCheckbox}
              name="pets"
              id="pets"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
              />
            </svg>

            <span>Pets</span>
          </label>
          <label
            className="border p-4 flex rounded-xl gap-2 items-center cursor-pointer"
            htmlFor="entrance"
          >
            <input
              type="checkbox"
              onChange={handlePerksCheckbox}
              name="entrance"
              id="entrance"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>

            <span>Private entrance</span>
          </label>
        </div>
        <h2 className="text-2xl mt-4">Extra info</h2>
        <p className="text-gray-500 text-sm">hous rules, etc</p>
        <textarea
          cols={50}
          rows={5}
          className="border p-2 mt-2"
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        {/* check in and out times  */}
        <h2 className="text-2xl mt-4">Check in & out times</h2>
        <p className="text-gray-500 text-sm">add check in and out</p>
        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="number"
              name=""
              id=""
              placeholder="14"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check Out time</h3>
            <input
              type="number"
              name=""
              id=""
              placeholder="11"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              type="number"
              name=""
              id=""
              placeholder="1"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
};

export default PlaceCreateForm;

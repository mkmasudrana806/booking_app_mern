import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types"; // Import PropTypes

const PhotosUploader = ({ addedPhoto, setAddedPhoto }) => {
  const [photoLink, setPhotoLink] = useState("");
  //   const [addedPhoto, setAddedPhoto] = useState([]);
  // upload photo by link
  const addPhotoByLink = async (event) => {
    event.preventDefault();
    await axios
      .post("/upload/photo-by-link", { link: photoLink })
      .then((res) => {
        setAddedPhoto((prev) => [...prev, res.data]);
      })
      .catch((error) => console.log(error));
    setPhotoLink("");
  };

  // upload photo from local machine
  const uploadPhoto = (event) => {
    const files = event.target.files;
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload/photo-from-local", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        const { data: filename } = res;
        setAddedPhoto((prev) => [...prev, ...filename]);
      });
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-2">
        <input
          type="text"
          placeholder="Add using a link...jpg"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
        />
        <button
          onClick={addPhotoByLink}
          className="bg-gray-200 w-[140px] h-[45px] grow px-4 rounded-full"
        >
          Add photo
        </button>
      </div>
      <div className="mt-2 grid gap-2  grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhoto.length > 0 &&
          addedPhoto.map((link, index) => (
            <div className="h-[120px] rounded-lg overflow-hidden" key={index}>
              <img
                src={`http://localhost:5000/uploads/photos/${link}`}
                className="w-full h-full rounded-lg object-cover"
                alt="photo"
              />
            </div>
          ))}

        <label className="hover:bg-gray-100 h-[120px] inline-flex gap-1 justify-center items-center border bg-transparent rounded-lg p-8 text-2xl text-gray-600 cursor-pointer">
          <input
            onChange={uploadPhoto}
            type="file"
            name="file"
            id="file"
            multiple // for multiple photos selection
            className="hidden"
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
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          Upload
        </label>
      </div>
    </div>
  );
};

// Define PropTypes for addedPhoto
PhotosUploader.propTypes = {
  addedPhoto: PropTypes.arrayOf(PropTypes.object).isRequired,
  setAddedPhoto: PropTypes.func.isRequired,
};
export default PhotosUploader;

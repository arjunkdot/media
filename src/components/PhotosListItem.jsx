import React from "react";
import { GoTrashcan } from "react-icons/go";
import { useRemovePhotoMutation } from "../store";
function PhotosListItem({ photo }) {
  const [removePhoto, results] = useRemovePhotoMutation();

  const handleRemovePhoto = () => {
    removePhoto(photo);
  };
  return (
    <div
      onClick={handleRemovePhoto}
      className="m-2 relative cursor-pointer overflow-hidden">
      <img src={photo.url} alt={photo.title} className="h-20 w-20 rounded-sm" />
      <div className="absolute inset-0 flex items-center justify-center w-full h-full hover:bg-gray-200 opacity-0 hover:opacity-80">
        <GoTrashcan className="text-3xl text-gray-500" />
      </div>
    </div>
  );
}

export default PhotosListItem;

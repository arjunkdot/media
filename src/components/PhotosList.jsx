import React from "react";
import { useFetchPhotosQuery, useAddPhotoMutation } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";
import PhotosListItem from "./PhotosListItem";
function PhotosList({ album }) {
  const { data, isFetching, error } = useFetchPhotosQuery(album);
  const [addPhoto, results] = useAddPhotoMutation();

  const handleAddPhoto = () => {
    addPhoto(album);
  };

  let content;
  if(isFetching) {
    content = <Skeleton className="h-10 w-full" times={4} />
  }else if(error) {
    content = <div>Error fetching photos.</div>
  }else {
    content = data.map(photo => <PhotosListItem key={photo.id} photo={photo} />)
  }
  return (
    <div>
      <div className="m-2 flex flex-row justify-between items-center">
        <h3 className="text-lg font-bold">Photos in {album.title}</h3>
        <Button onClick={handleAddPhoto} loading={results.isLoading}>
          + Add Photo
        </Button>
      </div>
      <div className="flex flex-row flex-wrap">
        {content}
      </div>
    </div>
  );
}

export default PhotosList;

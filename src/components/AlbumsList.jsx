import React from "react";
import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";

import Button from "./Button";
import Skeleton from "./Skeleton";
import AlbumListItem from "./AlbumListItem";
function AlbumsList({ user }) {
  const { data, error, isFetching } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  let content;
  if (isFetching) {
    content = <Skeleton className="h-10 w-full" times={3} />;
  } else if (error) {
    content = <div>Error loading data.</div>;
  } else {
    content = data.map((album) => <AlbumListItem key={album.id} album={album} />);
  }

  return (
    <div>
      <div className="flex justify-between items-center pb-2 mb-3 border-b">
        <span className="font-bold">Albums for {user.name}</span>
        <Button onClick={handleAddAlbum} loading={isFetching}>
          + Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;

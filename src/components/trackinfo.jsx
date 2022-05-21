import React from "react";

const Trackinfo = ({ album, artists, name }) => {
  return (
    <div className="offset-md-1 col-sm-4">
      <div className="px-0">
        <img src={album.images[0].url} alt={name}></img>
      </div>
      <div>
        <label htmlFor={name}>{name}</label>
      </div>
      <div>
        <label htmlFor={artists[0].name}>{artists[0].name}</label>
      </div>
    </div>
  );
};

export default Trackinfo;

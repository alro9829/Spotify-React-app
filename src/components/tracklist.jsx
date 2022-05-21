import React from "react";

const Tracklist = (props) => {
  const clicked = (e) => {
    e.preventDefault();
    //console.log("e target value: ", e.target.id);
    props.clicked(e.target.id);
  };

  return (
    <div className="col-sm-5 px-0">
      <div className="list-group">
        {props.items.map((item, idx) => (
          <button
            key={idx}
            id={item.track.id}
            onClick={clicked}
            className="list-group-item list-group-item-action list-group-item-dark"
          >
            {item.track.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tracklist;

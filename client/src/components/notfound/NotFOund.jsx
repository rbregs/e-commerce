import React from 'react';
import NotFoundImage from "../images/4041.svg"; 

export default function NotFound() {
  return (
    <div className="row">
      <div className="d-flex justify-content-center page-not-found-wrapper">
        <img
          src={NotFoundImage}
          height="550"
          width="550"
          alt="404_not_found"
        />
      </div>
      <h5 className="text-center">
        Page Not Found. Go to <a href="/">Homepage</a>
      </h5>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <div role="alert">
        <h1> Böyle bir sayfa bulunamadı!!! Error404</h1>
        <Link to="/">
          anasayfa'ya git
        </Link>
      </div>
    </div>
  );
};

export default Error;

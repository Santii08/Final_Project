import React from "react";
import { Link } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">HOME</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default DefaultLayout;

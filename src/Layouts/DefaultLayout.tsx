import React, { Children } from "react";
import { Link } from "react-router-dom";
interface DefaultLayout {
  children: React.ReactNode;
}
const DefaultLayout = ({ children }: DefaultLayout) => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
            <li>
              <Link to="/salir">Message</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
};

export default DefaultLayout;

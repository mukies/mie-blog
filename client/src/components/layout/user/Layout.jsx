/* eslint-disable react/prop-types */
import Nav from "./Navbar";

export default function Layout({ children }) {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
}

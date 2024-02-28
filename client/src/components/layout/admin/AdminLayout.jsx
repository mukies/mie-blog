/* eslint-disable react/prop-types */
import Nav from "./Nav";

export default function AdminLayout({ children }) {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
}

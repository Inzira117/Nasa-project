import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <Link
        to="/rovers"
        className="header-title"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <h2>NASA Rover Photos</h2>
      </Link>
    </header>
  );
}

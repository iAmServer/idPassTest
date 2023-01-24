import { Link } from "react-router-dom";

const Header: React.FunctionComponent = () => {
  return (
    <nav className="navigator">
      <ul>
        <li>
          <Link to="/">Quotes</Link>
        </li>
        <li>
          <Link to="/covid">Covid</Link>
        </li>
        <li>
          <Link to="/names">Names</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;

import { FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom"; // <-- use react-router-dom for NavLink
import type { RootState } from "../../app/store";

const Footer: React.FC = () => {
  // Explicitly type user to avoid PersistPartial issues
  const user = useSelector((state: RootState) => state.user.user) as { role: string } | null;
  const userrole = user?.role;
  const isAdmin = userrole === "admin";
  const isUser = userrole === "user";

  return (
    <footer className="footer sm:footer-horizontal bg-red-300 text-base-content p-10">
      <nav>
        <h6 className="footer-title">Services</h6>
        <li className="link link-hover list-none hover:text-gray-100">
          <NavLink to={isAdmin ? "/admin/dashboard/venues" : isUser ? "/user/dashboard/venues" : "/login"}>
            Venues
          </NavLink>
        </li>
        <li className="link link-hover list-none hover:text-gray-100">
          <NavLink to={isAdmin ? "/admin/dashboard/events" : isUser ? "/user/dashboard/events" : "/login"}>
            Events
          </NavLink>
        </li>
        <li className="link link-hover list-none hover:text-gray-100">
          <NavLink to={isUser ? "/user/dashboard/bookings" : "/login"}>
            Booking an Event
          </NavLink>
        </li>
        <li className="link link-hover list-none hover:text-gray-100">
          <NavLink to={isUser ? "/user/dashboard/customerSupport" : "/login"}>
            Customer Support
          </NavLink>
        </li>
      </nav>

      <nav>
        <h6 className="footer-title">Company</h6>
        <li className="link link-hover list-none hover:text-gray-100">
          <NavLink to="/about">About Us</NavLink>
        </li>
        <li className="link link-hover list-none hover:text-gray-100">Contact Us</li>
      </nav>

      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <a href="#" aria-label="Twitter">
            <FaTwitter className="text-2xl cursor-pointer hover:text-gray-100" />
          </a>
          <a href="#" aria-label="YouTube">
            <FaYoutube className="text-2xl cursor-pointer hover:text-gray-100" />
          </a>
          <a href="#" aria-label="Facebook">
            <FaFacebook className="text-2xl cursor-pointer hover:text-gray-100" />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;

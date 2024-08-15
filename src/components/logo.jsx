import { Link } from "react-router-dom";
import logo from "@/assets/img/logo.png";

const Logo = () => {
    return (
        <Link to="/" className="flex-none">
            <img className="w-16 h-16" src={logo} alt="Logo" />
        </Link>
    );
};

export default Logo;

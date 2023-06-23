import { BeakerIcon, QrCodeIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function Navbar() {
   return (
      <nav className="py-7">
         <Link
            to="/"
            className="flex items-center justify-center bg-primary-button p-10 gap-10"
         >
            <QrCodeIcon className="h-12 w-12" />
            <span className="text-5xl">Dev Support</span>
         </Link>
      </nav>
   );
}

export default Navbar;

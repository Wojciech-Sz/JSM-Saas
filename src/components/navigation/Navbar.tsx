import { ROUTES } from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import NavItems from "./NavItems";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href={ROUTES.HOME}>
        <div className="flex cursor-pointer items-center gap-2.5">
          <Image src="/images/logo.svg" alt="Logo" width={46} height={44} />
        </div>
      </Link>

      <div className="flex items-center gap-8">
        <NavItems />
      </div>
    </nav>
  );
};

export default Navbar;

import Link from "next/link";
import NavHeader from "./NavHeader";
import { getCurrentUser } from "@/utils/getCurrentUser";
import ThemeToggle from "../theme/theme-toggle";

const Header = async () => {
  const currentUser = await getCurrentUser();

  return (
    <header className="border-b border-border py-1.5 sticky top-0">
      <nav className="container mx-auto flex flex-row justify-between">
        <Link href="/" className="text-2xl font-bold">
          GitTix
        </Link>

        <div className="flex flex-row gap-8 align-middle">
          <NavHeader currentUser={currentUser} />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;

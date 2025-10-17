import { Menu, CircleUserRound } from "lucide-react";

function NavBar(){
    return (
      <nav className="flex justify-between mb-4">
        <div>
          {/* hamburger menu */}
          <Menu color="white" />
        </div>
        <div>
          {/* avatar */}
          <CircleUserRound color="white" />
        </div>
      </nav>
    );
}

export default NavBar;
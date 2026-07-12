import {
  Search,
  Bell,
  Moon,
  UserCircle,
} from "lucide-react";

function Navbar() {
  return (
    <header className="bg-white shadow-sm h-20 px-8 flex items-center justify-between">

      <div className="flex items-center gap-3 border rounded-xl px-4 py-2 w-96">
        <Search size={18} />
        <input
          className="outline-none w-full"
          placeholder="Search..."
        />
      </div>

      <div className="flex items-center gap-6">

        <Bell className="cursor-pointer" />

        <Moon className="cursor-pointer" />

        <UserCircle size={36} />

      </div>
    </header>
  );
}

export default Navbar;
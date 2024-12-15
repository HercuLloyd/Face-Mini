import BottomBar from "./bottombar/bottombar";
import CompactSideBar from "./sidebar/compactsidebar";
import Sidebar from "./sidebar/sidebar";
export default function NavBar() {
  return (
    <div>
      <Sidebar />
      <CompactSideBar />
      <BottomBar />
    </div>
  );
}

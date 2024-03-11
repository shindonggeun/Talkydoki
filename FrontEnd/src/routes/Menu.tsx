import Navbar from "@/components/Menu/Navbar";
import Sidebar from "@/components/Menu/Sidebar";

type Props = {};

function Menu({}: Props) {
  return (
    <>
      <Sidebar />
      <Navbar />
    </>
  );
}

export default Menu;

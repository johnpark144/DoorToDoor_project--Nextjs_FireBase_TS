import Image from "next/image";
import SearchBox from "./SearchBox";
import { useSelector } from 'react-redux';
import { AiOutlineMenu } from "react-icons/ai";
import { BsMap } from "react-icons/bs";

export default function Navbar({ setSelectPosition, setSeeMenu, setIsSatellite, isSatellite }: NavbarProps) {
  const status = useSelector((state: IsFocusedInfoStateProps) => state?.isFocusedSlice);

  return (
    <>
      {/* Navbar */}
      <div className="flex px-4 py-2 justify-between items-start text-xl">
        {/* Logo */}
        <div onClick={()=>location.reload()} className={`${status ? "hidden sm:flex":"flex"} ml-2 relative w-28 h-10 cursor-pointer`}>
          <Image
            src="https://user-images.githubusercontent.com/106279616/213213918-4d36a2d8-93a6-4d47-b56e-4f7c71e569aa.png"
            fill
            alt="DoorToDoor-Logo"
          />
        </div>
        {/* Search */}
        <div className="w-[95%]">
          <SearchBox setSelectPosition={setSelectPosition} />
        </div>
        <div className="flex relative top-3 -left-4">
          {/* Menu */}
          <button onClick={() => setSeeMenu(true)} className="cursor-pointer">
            <AiOutlineMenu />
          </button>
          {/* Map-change */}
          <button
            onClick={() => setIsSatellite(!isSatellite)}
            className="cursor-pointer relative left-2"
          >
            <BsMap />
          </button>
        </div>
      </div>
    </>
  );
}



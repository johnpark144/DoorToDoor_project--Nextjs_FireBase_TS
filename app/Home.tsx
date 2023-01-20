"use client";
import { useRef, useState, useEffect } from "react";
import Navbar from "./Navbar";
import Menu from "./Menu";
import dynamic from "next/dynamic";
const Maps = dynamic(() => import("./Maps"), { ssr: false }); // Import witout SSR // To prevent from Error "window is not defined"

export default function Home() {
  const [selectPosition, setSelectPosition] = useState();
  const [editMode, setEditMode] = useState(false);
  const [seeMenu, setSeeMenu] = useState(false);
  const [isSatellite, setIsSatellite] = useState(false);

  const refOne = useRef<HTMLInputElement>(null);

  // Hide Menu When Clicked outside of it
  useEffect(() => {
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);
  const hideOnClickOutside = (e: Event) => {
    if (refOne.current && !refOne.current.contains(e.target as Node)) {
      setSeeMenu(false);
    }
  };

  return (
    <div className="overflow-hidden flex">
      <div>
        {/* Navbar */}
        <Navbar
          setSelectPosition={setSelectPosition}
          setSeeMenu={setSeeMenu}
          setIsSatellite={setIsSatellite}
          isSatellite={isSatellite}
        />
        {/* Menu */}
        {seeMenu ? (
          <>
            <div ref={refOne}>
              <Menu setEditMode={setEditMode} editMode={editMode} />
            </div>
          </>
        ) : (
          ""
        )}
        {/* Map */}
        <div className="w-[100vw] h-full">
          {!editMode ? (
            <Maps selectPosition={selectPosition} isSatellite={isSatellite} />
          ) : (
            <Maps
              selectPosition={selectPosition}
              editMode={editMode}
              setEditMode={setEditMode}
              isSatellite={isSatellite}
              seeMenu={seeMenu}
            />
          )}
        </div>
      </div>
    </div>
  );
}


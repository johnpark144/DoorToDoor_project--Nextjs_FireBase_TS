import React from "react";
import { addDoc, collection } from "firebase/firestore";
import { dbService } from "../fBase";
import { AiFillSave } from "react-icons/ai";
import { MdCancelPresentation } from "react-icons/md";
import { BsArrowReturnLeft } from "react-icons/bs";

export default function MapEditMenu({ setIsGreenMarker, isGreenMarker, marked, 
userObjStatus, dateStatus, setEditMode, setMarkers, markers }: MapEditMenuProps) {
  return (
    <div className="text-2xl flex justify-evenly px-4 py-2">
      {/* Green Marker Mode */}
      <button
        onClick={() => setIsGreenMarker(!isGreenMarker)}
        className={`cursor-pointer py-2 px-4 text-white w-40 
            ${
              isGreenMarker
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            }
             transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-xl`}
      >
        Switch to {isGreenMarker ? "Blue" : "Green"}
      </button>

      {/* Save */}
      <button
        onClick={async () => {
          if (!marked[0]) {
            alert("Please mark and save");
            return;
          }
          const confirmation = window.confirm("You wanna save?");
          if (confirmation) {
            const markedObj = {
              userName: userObjStatus.userName,
              email: userObjStatus.email,
              uid: userObjStatus.uid,
              date: dateStatus,
              parsedDate: Date.parse(String(dateStatus)),
              isInterested: isGreenMarker,
              marked,
            };
            await addDoc(collection(dbService, "markedDatas"), markedObj);
            setEditMode(false);
            setIsGreenMarker(false);
            setMarkers([]);
          }
        }}
        className="cursor-pointer text-blue-500"
      >
        <h1 className="flex justify-center">
          <AiFillSave />
        </h1>
        <h1 className="hidden sm:flex ml-2">Save</h1>
      </button>

      {/* Cancel */}
      <button
        onClick={() => {
          const confirmation = window.confirm("You wanna cancel?");
          if (confirmation) {
            setEditMode(false);
            setIsGreenMarker(false);
            setMarkers([]);
          }
        }}
        className="cursor-pointer text-red-500"
      >
        <h1 className="flex justify-center">
          <MdCancelPresentation />
        </h1>
        <h1 className="hidden sm:flex ml-2">Cancel</h1>
      </button>

      {/* return */}
      <button
        onClick={() => {
          let cloneMarkers = [...markers];
          cloneMarkers.pop();
          setMarkers(cloneMarkers);
        }}
        className="cursor-pointer text-yellow-500"
      >
        <h1 className="flex justify-center">
          <BsArrowReturnLeft />
        </h1>
        <h1 className="hidden sm:flex ml-2">Return</h1>
      </button>
    </div>
  );
}



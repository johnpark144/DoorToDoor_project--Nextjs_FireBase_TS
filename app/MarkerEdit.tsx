import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addDoc,
  collection,
  GeoPoint,
  query,
  doc,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { dbService } from "../fBase";
import { allMarkedDataInfo } from "../store/store";

export default function MarkerEdit({ markedData }: MarkerEdit) {
  const [editMode, setEditMode] = useState(false);
  const [text, setText] = useState("");
  const pointerEmail = markedData[2].email.stringValue;

  const dispatch = useDispatch();

  // Redux State (User, Date, MarkedData)
  const userObjStatus = useSelector(
    (state: userInfoStateProps) => state?.userObjSlice
  );
  const allMarkedDataStatus = useSelector(
    (state: allMarkedDataInfoStateProps) => state?.allMarkedDataSlice
  );
  
   // Call Datas with Same latitude, longitude
  useEffect(() => {
    const callDataDetail = async () => {
      const q = query(
        collection(dbService, "markedDataDetail"),
        where("marked", "==", new GeoPoint(markedData[0], markedData[1]))
      );
      const docsSnap: any = await getDocs(q);
      setText(
        docsSnap.docs[0]?._document.data.value.mapValue.fields.text.stringValue
      );
    };

    if (!editMode) {
      callDataDetail();
    }
  }, [markedData, editMode]);

  // ####### Delete Marker fuction
  const deleteMarker = async () => {
    const confirmation = confirm("You wannna Delete it?");
    if (confirmation) {
      // To look for DB with Same GeoPoint
      const q = query(
        collection(dbService, "markedDatas"),
        where(
          "marked",
          "array-contains",
          new GeoPoint(markedData[0], markedData[1])
        )
      );
      const docsSnap: any = await getDocs(q);
      if (docsSnap.docs?.length) {
        // To make Array Data without selected to delete in Marked in DB
        const markedArr = await docsSnap.docs[0]?._document.data.value.mapValue
          .fields.marked.arrayValue.values;
        const tempEditedMarkedArr = await markedArr.filter(
          (arr: GeoPointArr) => {
            return !(
              arr.geoPointValue.latitude == markedData[0] &&
              arr.geoPointValue.longitude == markedData[1]
            );
          }
        );
        const editedMarkedArr = await tempEditedMarkedArr.map(
          (arr: GeoPointArr) =>
            new GeoPoint(
              arr.geoPointValue.latitude,
              arr.geoPointValue.longitude
            )
        );
        //  If GeoPoint-Data still exist in that Array, (Update-Doc) // If not, (Deletet-Doc )
        const geoRef = doc(dbService, "markedDatas", docsSnap.docs[0].id);
        if (editedMarkedArr?.length) {
          await updateDoc(geoRef, {
            marked: [...editedMarkedArr],
          });
        } else {
          await deleteDoc(geoRef);
        }
        // If Detail data exist, (Deletet-Doc)
        const q2 = query(
          collection(dbService, "markedDataDetail"),
          where("marked", "==", new GeoPoint(markedData[0], markedData[1]))
        );
        const docsSnap2 = await getDocs(q2);
        if (docsSnap2?.docs?.length) {
          const geoRef2 = doc(
            dbService,
            "markedDataDetail",
            docsSnap2.docs[0].id
          );
          await deleteDoc(geoRef2);
        }
        // To apply in realtime
        const newStatus = allMarkedDataStatus?.filter((arr) => {
          return arr[0] !== markedData[0] || arr[1] !== markedData[1];
        });
        dispatch(allMarkedDataInfo(newStatus));
      }
    }
  };

  // ####### Edited-Marker-Saving fuction
  const saveMarkerInfo = async () => {
    if (text) {
      const q = query(
        collection(dbService, "markedDataDetail"),
        where("marked", "==", new GeoPoint(markedData[0], markedData[1]))
      );
      const docsSnap = await getDocs(q);
      // If Detail data already exist, (updateDoc)
      if (docsSnap.docs[0]) {
        const geoRef = doc(dbService, "markedDataDetail", docsSnap.docs[0].id);
        updateDoc(geoRef, {
          text,
        });
        // If not, (addDoc)
      } else {
        const markedDataDetailObj = {
          marked: new GeoPoint(markedData[0], markedData[1]),
          parsedDate: markedData[2].parsedDate.integerValue,
          userName: markedData[2].userName.stringValue,
          email: markedData[2].email.stringValue,
          text: text,
        };
        await addDoc(
          collection(dbService, "markedDataDetail"),
          markedDataDetailObj
        );
      }
      setEditMode(false);
    }
  };

  return (
    <>
      {!editMode ? (
        <>
          {/* Marker Detail */}
          <h1 className="italic">{text}</h1>
          {/* Only for the User who input */}
          {userObjStatus.email === pointerEmail && (
            <>
              {/* Edit button */}
              <h1
                onClick={() => setEditMode(true)}
                className="bg-blue-200 rounded-xl text-center cursor-pointer"
              >
                Edit
              </h1>
              {/* Delete button */}
              <h1
                onClick={deleteMarker}
                className="bg-red-200 rounded-xl text-center cursor-pointer"
              >
                Delete
              </h1>
            </>
          )}
        </>
      ) : (
        <>
          {/* Textarea for Detail */}
          <textarea
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="We value privacy of others, Please don't input any private info."
            className="w-full h-12"
          />
          <div>
            {/* Save button */}
            <button
              onClick={saveMarkerInfo}
              className={`p-1 rounded-xl text-center ${
                !text
                  ? "text-slate-300 bg-blue-100 "
                  : "bg-blue-400 cursor-pointer"
              }`}
              disabled={!text}
            >
              Save
            </button>
            {/* Cancle button */}
            <button
              className="p-1 bg-red-400 rounded-xl text-center cursor-pointer"
              onClick={() => {
                const confirmation = confirm("You wannna cancle the 'Edit'?");
                if (confirmation) {
                  setEditMode(false);
                }
              }}
            >
              Cancle
            </button>
          </div>
        </>
      )}
    </>
  );
}


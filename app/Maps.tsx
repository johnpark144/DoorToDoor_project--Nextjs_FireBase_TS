"use client";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allMarkedDataInfo } from "../store/store";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { collection, GeoPoint, query, getDocs } from "firebase/firestore";
import { dbService } from "../fBase";
import MarkerEdit from "./MarkerEdit";
import MapEditMenu from "./MapEditMenu";
import TimeAgo from "react-timeago";

// Icons in Public folder 
const icon = L.icon({
  iconUrl: "./placeholder.png",
  iconSize: [38, 38],
});
const doneIcon = L.icon({
  iconUrl: "./done.png",
  iconSize: [10, 10],
});
const doneIcon2 = L.icon({
  iconUrl: "./done2.png",
  iconSize: [10, 10],
});

// Whenever SelectPosition changed, Rerender new location
const ResetCenterView = ({ selectPosition }: MapsProps) => {
  const map = useMap();
  map.zoomControl.setPosition("topleft");
  useEffect(() => {
    if (selectPosition) {
      map.setView(
        L.latLng(selectPosition?.lat, selectPosition?.lon),
        map.getZoom(),
        {
          animate: true,
        }
      );
    }
  }, [selectPosition]);

  return null;
};

// ######## Default Function
export default function Maps({ selectPosition, editMode, setEditMode, isSatellite, seeMenu }: MapsProps) {
  const locationSelection: L.LatLngExpression = selectPosition
    ? [selectPosition?.lat, selectPosition?.lon]
    : [0, 0];

  const [isGreenMarker, setIsGreenMarker] = useState(false);
  const [markers, setMarkers] = useState<L.LatLng[]>([]);

  const dispatch = useDispatch();
  let seeMenuArr = useRef<Array<Boolean | undefined | never>>([]); // To calculate recent seeMenu's boolean

  // Redux State (User, Date, MarkedData)
  const userObjStatus = useSelector(
    (state: userInfoStateProps) => state?.userObjSlice
  );
  const dateStatus = useSelector(
    (state: dateInfoStateProps) => state?.dateSlice
  );
  const allMarkedDataStatus = useSelector(
    (state: allMarkedDataInfoStateProps) => state?.allMarkedDataSlice
  );

  // Change to Geopoint Form to save them in Firebase
  const marked = markers.map((arr) => new GeoPoint(arr.lat, arr.lng));

  // Bring MarkedDatas from Firebase
  useEffect(() => {
    const callAllMarkedData = async () => {
      const q = query(collection(dbService, "markedDatas"));
      const markedDatasDB = await getDocs(q);
      // Gather All latitude, longitude 
      let tempAllMarkedData = markedDatasDB?.docs.map(
        (markedDatasDBArr: any) => {
          return markedDatasDBArr._document.data.value.mapValue.fields.marked.arrayValue.values?.map(
            (markedData: {
              geoPointValue: { latitude: Number; longitude: Number };
            }) => {
              return [
                markedData.geoPointValue.latitude,
                markedData.geoPointValue.longitude,
                markedDatasDBArr._document.data.value.mapValue.fields,
              ];
            }
          );
        }
      );
      // All Gathered-Data into a Array and Send to State store
      tempAllMarkedData = await tempAllMarkedData?.reduce(
        (accumulator, currentArr) => [...accumulator, ...currentArr]
      );
      dispatch(allMarkedDataInfo(tempAllMarkedData));
    };
    if (editMode === (false || undefined)) callAllMarkedData(); // Function Only First time and Whenever Edited
  }, [userObjStatus, editMode]); // UseEffect work Whenever Log-in, EditMode change

  // Function to add marker
  const AddMarkerToClick = () => {
    seeMenuArr.current?.push(seeMenu); // History of Whether or not menu open in array
    const map = useMapEvents({
      click(e) {
        const newMarker = e.latlng;
        if (!seeMenuArr.current[seeMenuArr.current.length - 2]) { // In Previous turn, If Menu was open, Doesn't mark
          setMarkers([...markers, newMarker]);
        }
        seeMenuArr.current = [];
      },
    });
    return (
      <>
        {markers?.map((marker) => (
          <Marker
            position={marker}
            key={`${marker.lat}${marker.lng}`}
            icon={!isGreenMarker ? doneIcon : doneIcon2}
          />
        ))}
      </>
    );
  };

  return (
    <div className="h-full">
      {editMode ? (
        // Edit-Mode Menu
        <MapEditMenu
          setIsGreenMarker={setIsGreenMarker}
          isGreenMarker={isGreenMarker}
          marked={marked}
          userObjStatus={userObjStatus}
          dateStatus={dateStatus}
          setEditMode={setEditMode}
          setMarkers={setMarkers}
          markers={markers}
        />
      ) : (
        ""
      )}

      {/* MapContainer*/}
      <MapContainer
        center={[29.70713934813417, -95.29266357421876]}
        zoom={10}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={
            !isSatellite
              ? "https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=HF5XlbsiSdkFlJq0cfDr"
              : "https://api.maptiler.com/maps/hybrid/256/{z}/{x}/{y}.jpg?key=HF5XlbsiSdkFlJq0cfDr"
          }
        />
        {/* Address Pin Location */}
        {selectPosition && (
          <Marker position={locationSelection} icon={icon}>
            <Popup>
              <div>{selectPosition?.display_name}</div>
            </Popup>
          </Marker>
        )}

        {/* AllMarked Location */}
        {allMarkedDataStatus[0] &&
          allMarkedDataStatus.map((markedData) => {
            const date = markedData[2]?.date?.timestampValue;
            const parsedDate = markedData[2]?.parsedDate.integerValue;
            const isOver6month =
              (Date.parse(String(new Date())) - parsedDate) / 1000 / 60 / 60 / 24 / 30 / 6 > 1;
            const isOver1year =
              (Date.parse(String(new Date())) - parsedDate) / 1000 / 60 / 60 / 24 / 30 / 12 > 1;
            const isOver2years =
              (Date.parse(String(new Date())) - parsedDate) / 1000 / 60 / 60 / 24 / 30 / 24 > 1;
            return (
              <Marker
                position={[markedData[0], markedData[1]]}
                icon={
                  !markedData[2]?.isInterested.booleanValue
                    ? doneIcon
                    : doneIcon2
                }
                opacity={
                  isOver2years ? 0 : isOver1year ? 0.3 : isOver6month ? 0.6 : 1
                }
                key={`${markedData[0]} ${markedData[1]}`}
              >
                <Popup closeOnClick={false}>
                  <h1>
                    {new Date(date).toDateString().slice(4, 15)}
                    (<TimeAgo date={date} />)
                  </h1>
                  <h1>Pointer : {markedData[2]?.userName.stringValue}</h1>
                  {/* Marker-Edit-Mode */}
                  <MarkerEdit markedData={markedData} />
                </Popup>
              </Marker>
            );
          })}

        {/* To re-locate it Whenever Select-Position change */}
        <ResetCenterView selectPosition={selectPosition} />
        {/* Click is possible Only for EditMode */}
        {editMode ? <AddMarkerToClick /> : ""}
      </MapContainer>
    </div>
  );
}


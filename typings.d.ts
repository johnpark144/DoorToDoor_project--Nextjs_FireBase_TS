type SelectPosition = {
    address: object;
    boundingbox: Array<string>;
    class: string;
    display_name: string;
    importance: number;
    lat: number;
    licence: string;
    lon: number;
    osm_id: number;
    osm_type: string;
    place_id: number;
    type: string;
};

type MapsProps = {
    selectPosition : selectPosition | undefined;
    editMode?: boolean;
    setEditMode?: Dispatch<SetStateAction<boolean>>;
    isSatellite?: boolean;
    seeMenu?: boolean;
}

type SearchBoxProps = {
    setSelectPosition : Dispatch<SetStateAction<selectPosition>>;
}

type UserInfoStateProps = {
    userObjSlice : {
        userName: string,
        email: string,
        uid: string,
    }
}

type DateInfoStateProps = {
    dateSlice : Date;
}

type AllMarkedDataInfoStateProps = {
    allMarkedDataSlice: Array<Array<any>>;
}

type IsFocusedInfoStateProps = {
    isFocusedSlice: boolean;
}

type AuthOnChangeProps = {
  target: { 
    name: string
    value: string
  }
};

type MapEditMenuProps = {
  setIsGreenMarker: Dispatch<SetStateAction<boolean>>;
  isGreenMarker: boolean;
  marked: GeoPoint[];
  userObjStatus: {
    userName: string;
    email: string;
    uid: string;
  };
  dateStatus: Date;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  setMarkers: Dispatch<SetStateAction<L.LatLng[]>>;
  markers: L.LatLng[];
};

type MarkerEdit = {
    markedData: Array;
}

type GeoPointArr = {
    geoPointValue: { latitude: number; longitude: number; };
}

type MenuProps = {
    setEditMode: Dispatch<SetStateAction<boolean>>;
    editMode: boolean;
}

type NavbarProps = {
    setSelectPosition: Dispatch<SetStateAction<selectPosition>>;
    setSeeMenu:  Dispatch<SetStateAction<boolean>>;
    setIsSatellite: Dispatch<SetStateAction<boolean>>;
    isSatellite: boolean;
}

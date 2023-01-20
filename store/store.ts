import { configureStore, createSlice } from "@reduxjs/toolkit";

const userObjSlice = createSlice({
  name: "userObjSlice",
  initialState: null,
  reducers: {
    userInfo: (state: object | null, action) => {
      return (state = action.payload);
    },
  },
});

const dateSlice = createSlice({
  name: "dateSlice",
  initialState: new Date(),
  reducers: {
    dateInfo: (state: Date, action) => {
      return (state = action.payload);
    },
  },
});

const allMarkedDataSlice = createSlice({
  name: "allMarkedDataSlice",
  initialState: [],
  reducers: {
    allMarkedDataInfo: (state: Array<Array<number>>, action) => {
      return (state = action.payload);
    },
  },
});

export const { userInfo } = userObjSlice.actions;
export const { dateInfo } = dateSlice.actions;
export const { allMarkedDataInfo } = allMarkedDataSlice.actions;

export default configureStore({
  reducer: {
    userObjSlice: userObjSlice.reducer,
    dateSlice: dateSlice.reducer,
    allMarkedDataSlice: allMarkedDataSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // To Resolve Error to save UnSerialized DateInfo
});

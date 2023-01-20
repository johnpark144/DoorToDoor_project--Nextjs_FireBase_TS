"use client";
import Home from "./Home";
import { useEffect } from "react";
import { userInfo } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { authService, dbService } from "../fBase";
import { useRouter } from "next/navigation";

export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter();

  // Login
  useEffect(() => {
    const loginStart = () => {
      onAuthStateChanged(authService, async (user) => {
        // To cheack Any user logged in
        if (user) {
          const q = query(
            collection(dbService, "members"),
            where("email", "==", user.email)
          );
          const docsSnap: any = await getDocs(q);
          const firstname =
            docsSnap.docs[0]?._document.data.value.mapValue.fields.firstname
              .stringValue;
          const lastname =
            docsSnap.docs[0]?._document.data.value.mapValue.fields.lastname
              .stringValue;
          const userName = `${firstname} ${lastname}`;
          const userInfomation = {
            userName,
            email: user.email,
            uid: user.uid,
          };
          dispatch(userInfo(userInfomation));
        } else {
          router.push("/auth"); // If no Login, Send to Auth page
        }
      });
    };
    
    loginStart();
  }, []);

  const status = useSelector((state: userInfoStateProps) => state?.userObjSlice);
  return (
    <>
      {status ? (
        <>
          <Home />
        </>
      ) : (
        <div className="flex justify-center relative top-24">
          <span>Loading...</span>
          <span className="loader"></span>
        </div>
      )}
    </>
  );
}

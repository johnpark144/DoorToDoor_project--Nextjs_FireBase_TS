"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection } from "firebase/firestore";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { authService, dbService } from "../../fBase";
import Image from "next/image";

export default function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [commonPassword, setCommonPassword] = useState("");

  const [error, setError] = useState("");
  const [newAccount, setNewAccount] = useState(false);

  const router = useRouter();
  
   // If already Login, Send to Home
  useEffect(() => {
    const loginCheck = () => {
      onAuthStateChanged(authService, async (user) => {
        if (user) {
          router.push("/");
        }
      });
    };
    loginCheck();
  }, []);

  // Submit
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let data;
    try {
      if (newAccount) {
        // Sign-up mode
        if (password === password2) {
          data = await createUserWithEmailAndPassword( authService, email, password );
          const memberObj = { email, firstname, lastname, birthDay }; // To add docs : Database -> Rule -> allow read, write: if true; (input at firestore)
          await addDoc(collection(dbService, "members"), memberObj);
          alert("Signup success!");
          setNewAccount(false);
          setError("");
        } else {
          throw new Error("----------Error(auth/passwords-not-matched)-");
        }
      } else {
        // Log-in Mode
        if (commonPassword === "1948") {
          data = await signInWithEmailAndPassword(authService, email, password);
          if (data) {
            router.push("/");
          }
        } else {
          throw new Error("----------Error(auth/wrong-common-password)-");
        }
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Typing onChange
  const onChange = (e: AuthOnChangeProps) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "password2") {
      setPassword2(value);
    } else if (name === "firstname") {
      setFirstName(value);
    } else if (name === "lastname") {
      setLastname(value);
    } else if (name === "birthday") {
      setBirthDay(value);
    } else if (name === "commonPassword") {
      setCommonPassword(value);
    }
  };

  // Repetive className
  const commonClass =
    "rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-transparent";

  return (
    <>
      <div className="flex h-[95vh] justify-center items-center">
        <div className="p-12 items-center w-[680px] rounded-xl self-center group flex-col space-y-6 bg-white bg-opacity-50 shadow-2xl">
          {/* Logo and DoorToDoor */}
          <div className="flex items-center">
            <div className="relative w-28 h-10">
              <Image
                src="https://user-images.githubusercontent.com/106279616/213213918-4d36a2d8-93a6-4d47-b56e-4f7c71e569aa.png"
                fill
                alt="DoorToDoor-Logo"
              />
            </div>
            <h1 className="text-xl">Welcome To DoorToDoor</h1>
          </div>
          <form onSubmit={onSubmit} className="space-y-2">
            {/* Email */}
            <input
              onChange={onChange}
              required
              value={email}
              name="email"
              type="text"
              placeholder="Email"
              className={commonClass}
            />
            {/* Password*/}
            <input
              onChange={onChange}
              required
              value={password}
              name="password"
              type="password"
              placeholder="Password"
              className={commonClass}
            />
            {newAccount ? (
              <>
                {/* Password confirm*/}
                <input
                  onChange={onChange}
                  required
                  value={password2}
                  name="password2"
                  type="password"
                  placeholder="Password confirm"
                  className={commonClass}
                />
                {/* Firstname */}
                <input
                  onChange={onChange}
                  required
                  value={firstname}
                  name="firstname"
                  type="text"
                  placeholder="Firstname"
                  className={commonClass}
                />
                {/* Lastname */}
                <input
                  onChange={onChange}
                  required
                  value={lastname}
                  name="lastname"
                  type="text"
                  placeholder="Lastname"
                  className={commonClass}
                />
                {/* BirthDay */}
                <input
                  onChange={onChange}
                  required
                  value={birthDay}
                  name="birthday"
                  type="date"
                  placeholder="BirthDay"
                  className={commonClass}
                />
              </>
            ) : (
              // Common Password*
              <input
                onChange={onChange}
                required
                value={commonPassword}
                name="commonPassword"
                type="password"
                placeholder="Temporalily Common Password -> (1948)"
                className={commonClass}
              />
            )}
            {/* submit (Login, Signup) */}
            <button
              type="submit"
              className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200
             ease-in bg-black shadow-md hover:text-black hover:bg-white focus:outline-none focus:ring-2"
            >
              {newAccount ? "Create Account" : "Log-In"}
            </button>
            {/* Output Error */}
            <span className="text-red-500">{error.slice(10, -1)}</span>
          </form>
          {/* Toggle (Login, Signup)  */}
          <button
            className="text-gray-500 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 
        hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400
         font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={() => {
              setNewAccount((prev) => !prev);
              setError("");
            }}
          >
            {newAccount ? "Go To Log-In" : "Go To Create Account"}
          </button>
        </div>
      </div>
    </>
  );
}



import { authService } from "../fBase";
import { useRouter } from "next/navigation";
import { AiFillEdit, AiOutlineLogout } from "react-icons/ai";
import CalendarComponent from "./CalendarComponent";

export default function Menu({ setEditMode, editMode }: MenuProps) {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-evenly px-4 py-2 text-2xl">
        {/* Edit mode button */}
        <button
          onClick={() => {
            const confirmation = window.confirm(
              'You wanna switch to "Edit mode"?'
            );
            if (confirmation) {
              setEditMode(true);
            }
          }}
          className="cursor-pointer flex mx-1"
        >
          <AiFillEdit />
          <h1 className="hidden sm:flex ml-2">Edit</h1>
        </button>
        {/* Log-out button */}
        <button
          onClick={() => {
            const confirmation = window.confirm("You wanna Log out?");
            if (confirmation) {
              authService.signOut();
              router.push("/auth");
            }
          }}
          className="cursor-pointer flex mx-1"
        >
          <AiOutlineLogout />
          <h1 className="hidden sm:flex ml-2">LogOut</h1>
        </button>
      </div>
      {/* Calendar */}
      <div className="flex justify-center text-xl">
        {editMode ? <CalendarComponent /> : ""}
      </div>
    </>
  );
}



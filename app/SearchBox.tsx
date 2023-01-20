import { useState } from "react";
import fetch, { RequestInit } from "node-fetch";
import { AiOutlineSearch } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";

// Default Function
export default function SearchBox({ setSelectPosition }: SearchBoxProps) {
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);

  // Function When search
  const searchMap = async () => {
    const params = {
      q: searchText,
      format: "json",
    };
    const queryString = new URLSearchParams(params).toString(); // Make it Query with Params
    const reqestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://nominatim.openstreetmap.org/search?${queryString}`,
      reqestOptions
    )
      .then((res) => res.text())
      .then((result) => {
        setListPlace(JSON.parse(result));
      })
      .catch((err) => console.log("err:", err));
  };

  return (
    <>
      <div className="flex-col">
        <div className="flex pl-4 py-2">
          {/* Search Box */}
          <input
            type="text"
            className="pl-4 pr-12 border-2 border-solid border-slate-200 w-[99%] rounded-2xl
            border-transparent flex-1 appearance-none bg-white text-gray-700 placeholder-gray-400 
          shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-yellow-100 focus:border-transparent"
            value={searchText}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchMap();
              } else if (e.key === "Escape") {
                setListPlace([]);
              }
            }}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {/* Search button */}
          <div className="flex items-center relative -left-12">
            <button onClick={searchMap} className="rounded-2xl">
              <AiOutlineSearch />
            </button>
            {/* Cancle button */}
            <button
              onClick={() => {
                setListPlace([]);
                setSearchText("");
              }}
              className="rounded-2xl"
            >
              <ImCancelCircle />
            </button>
          </div>
        </div>
        {/* Result List */}
        <ul>
          {listPlace.map((item: selectPosition) => {
            return (
              <li
                key={item?.place_id}
                className="flex text-sm"
                onClick={() => {
                  setSelectPosition(item);
                }}
              >
                <img
                  src="./placeholder.png"
                  alt="placeholder"
                  className="w-9 h-9 cursor-pointer"
                />
                <span className="cursor-pointer">{item?.display_name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}



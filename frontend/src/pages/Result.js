import React from "react";
import MoveButton from "../components/MoveButton";
import style from "./MainPage.module.css";
import UserPageButton from "../components/UserPageButton";

export default function Result() {
  return (
    <>
      <div className="flex">
        <div className={`${style.box1}`}>
          <img className={`${style.logo2}`} src="images/logo.png" alt="logo" />
        </div>
        <UserPageButton className="float-left" />
      </div>
      {/* <div className="block m-auto"> */}
      <div
        className="block w-5/12 box-content p-3 border-0 m-auto rounded-2xl text-center mt-2"
        style={{ backgroundColor: "rgb(249,248,250)" }}
      >
        <div className="inline-block w-11/12 h-4/6 box-content justify-center items-center mt-3 mb-1">
          <img
            src="images/ice-1.jpg"
            alt="결과 이미지"
            className="w-full border-1 border-dashed border-black rounded-2xl"
          />
        </div>
        <div className="flex w-11/12 m-auto justify-end">
          <a href="images/ice-1.jpg" download>
            <button
              className="flex w-36 h-full rounded-3xl mr-2 hover:"
              style={{
                backgroundColor: "rgb(213,190,198)",
                borderColor: "rgb(213,190,198)",
              }}
            >
              <span className="flex leading-6 m-auto">
                <img src="images/download.svg" alt="download" className="w-7" />
                <span className="items-center text-white text-xl font-medium leading-9">
                  Download
                </span>
              </span>
            </button>
          </a>

          <button
            className="flex w-28 border-2 rounded-3xl"
            style={{
              backgroundColor: "rgb(213,190,198)",
              borderColor: "rgb(213,190,198)",
            }}
          >
            <span className="flex leading-6 m-auto">
              <img src="images/share.svg" alt="share" className="w-5 mr-2" />
              <span className="items-center text-white text-xl font-medium leading-9">
                Share
              </span>
            </span>
          </button>
        </div>
      </div>
      {/* <span className="flex relative -translate-x-52 -translate-y-1/2">
          <button>
            <img src="images/speechbubble.svg" alt="speechbubble" />
            <div className="absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-6 text-center text-xl font-semibold">
              말풍선추가
            </div>
          </button>
        </span> */}
      {/* </div> */}

      <MoveButton
        url1="/background"
        url2=""
        style1="w-12"
        style2="hidden w-12"
      />
    </>
  );
}

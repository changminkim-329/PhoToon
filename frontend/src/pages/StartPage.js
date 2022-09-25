import React, { useCallback, useState } from "react";
import MoveButton from "../components/MoveButton";
import style from "./MainPage.module.css";
import UserPageButton from "../components/UserPageButton";
import Slider from "@material-ui/core/Slider";
import Cropper from "react-easy-crop";
import getCroppedImg from "../components/getCroppedImg";
import Dropzone from "../components/Dropzone";
import axios from "axios";
import "../components/Crop.css";
import { v4 as uuidv4 } from "uuid";

import * as tf from '@tensorflow/tfjs'

export default function Start() {
  const [image, setImage] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [image_url, setURLImage] = useState(null);
  const uuid = uuidv4();

  const cancelImage = () => {
    setImage("");
  };
  const onChangeImage = (uploadedImage) => {
    setImage(URL.createObjectURL(uploadedImage));
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });

      let w = croppedImage.width;
      let h = croppedImage.height;
      let canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      console.log(canvas)
      let ctx = canvas.getContext("2d");
      ctx.putImageData(croppedImage, 0, 0);
      console.log(ctx)
      setURLImage(canvas.toDataURL())

      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, image]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  console.log(uuid);


  const uploadImg = () => {
    let shape = [];
    shape[0] = croppedImage.height;
    shape[1] = croppedImage.width;
    shape[2] = 3;
    
    const tensor = tf.browser.fromPixels(croppedImage).asType('float32');
    const values = tensor.dataSync();
    const arr = Array.from(values)

    
    const data = {
      email: "test@naver.com",
      condition: "origin",
      uuid: uuid,
      image: arr,
      shape: tensor.shape,
      style: 1,
      background : 1,
    };
    axios
      .post("http://127.0.0.1:8000/api/v1/s3", data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .post("http://127.0.0.1:8000/api/v1/style_transfer", data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen">
      <div className="flex">
        <div className={`${style.box1}`}>
          <img className={`${style.logo2}`} src="images/logo.png" alt="logo" />
        </div>
        <UserPageButton className="float-left" />
      </div>

      <div className="block w-4/12 h-2/12 box-content p-4 m-auto border-0 rounded-2xl bg-gray-50 text-center">
        <div className="text-center text-2xl pt-1 pb-2">사진을 선택하세요.</div>
        {image ? (
          <div className="h-1/12">
            <div
              className="container"
              style={{
                display:
                  image === null || croppedImage !== null ? "none" : "block",
              }}
            >
              <div className="crop-container">
                <Cropper
                  image={image}
                  crop={crop}
                  rotation={rotation}
                  zoom={zoom}
                  zoomSpeed={4}
                  maxZoom={3}
                  zoomWithScroll={true}
                  showGrid={true}
                  aspect={4 / 3}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  onRotationChange={setRotation}
                />
              </div>
              <div className="controls">
                <label className="label">
                  Rotate
                  <Slider
                    value={rotation}
                    min={0}
                    max={360}
                    step={1}
                    aria-labelledby="rotate"
                    onChange={(e, rotation) => setRotation(rotation)}
                    className="range"
                  />
                </label>
                <label className="label">
                  Zoom
                  <Slider
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="zoom"
                    onChange={(e, zoom) => setZoom(zoom)}
                    className="range"
                  />
                </label>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="cropButton"
                style={{
                  display:
                    image === null || croppedImage !== null ? "none" : "block",
                }}
                onClick={showCroppedImage}
              >
                Crop
              </button>
            </div>

            <div className="cropped-image-container">
              {image_url && (
                <img
                  className="cropped-image"
                  src={image_url}
                  alt="cropped"
                />
              )}
              {croppedImage && (
                <div className="flex justify-center">
                  <button onClick={onClose} className="cropButton">
                    <p className="block m-auto">CANCEL</p>
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Dropzone onChangeImage={onChangeImage} />
        )}
        <div className="flex w-11/12 m-auto justify-end">
          <button
            className="flex float-right w-28 border-2 rounded-3xl "
            style={{
              backgroundColor: "rgb(213,190,198)",
              borderColor: "rgb(213,190,198)",
            }}
            onClick={cancelImage}
          >
            <img src="images/delete.svg" alt="delete" className="w-9" />
            <span className="items-center text-white text-xl font-medium leading-9">
              Delete
            </span>
          </button>
        </div>
      </div>

      <MoveButton
        url1=""
        url2="/choicecartoon"
        style1="hidden w-12"
        style2="w-12"
        saveFuc={uploadImg}
      />
    </div>
  );
}

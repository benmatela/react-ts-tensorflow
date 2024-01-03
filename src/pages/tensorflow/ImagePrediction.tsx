import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgpu";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import { ToastManager } from "../../components/toasts/ToastManager";
import { useDispatch } from "react-redux";
import * as homeReducers from "../../redux/home/home";
import { v4 as uuidv4 } from "uuid";
import { TOAST_TYPE } from "../../models/toast.model";
import { Button } from "../../components/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CircleLoader } from "react-spinners";
import { Pill } from "../../components/Pill";

export const ImagePrediction = () => {
  // Here we are subsribed to toast state and read it on each time it changes
  const toast = useSelector(
    (state: RootState) => state.homePersistedReducer.toast
  );
  const [isPredicting, setIsPredicting] = useState(false);
  const [personDetected, setPersonDetected] = useState(false);
  const [file, setFile] = useState("");
  const initPredictions: cocoSsd.DetectedObject[] = [];
  const [predictions, setPredictions] = useState(initPredictions);
  const [model, setModel] = useState({} as cocoSsd.ObjectDetection);
  const dispatch = useDispatch();

  /**
   * Handle file input
   *
   * @param {any} e
   */
  const handleChange = (e: any) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  /**
   * Predict what the image contains
   *
   * @returns void
   */
  const predictImage = async () => {
    setIsPredicting(true);
    try {
      // (1) Wait for tensorflow to load
      await tf.ready();

      // (2) Load AI model
      const cocoSsdModel = await cocoSsd.load();
      setModel(cocoSsdModel);

      if (!cocoSsdModel) {
        setIsPredicting(false);
        return;
      }

      // (3) Get image
      const uploadedImage: any = document.getElementById("uploadedImage");

      if (uploadedImage) {
        // (4) Classify the image.
        cocoSsdModel
          .detect(uploadedImage)
          .then((predictionsResult: cocoSsd.DetectedObject[]) => {
            setPredictions(predictionsResult);

            let showPersonDetected = false;
            // Loop through predictions done on the current image
            for (let n = 0; n < predictionsResult.length; n++) {
              // If the prediction score is over 66% we are sure we classified it right
              if (predictionsResult[n].score > 0.66) {
                // If a `🧍🏿PERSON` is detected on the image
                if (predictionsResult[n].class === "person") {
                  setPersonDetected(true);
                  showPersonDetected = true;
                }
              }
            }

            console.log("predictions: ", predictionsResult);

            updateToast(showPersonDetected);
          });
      }
      setIsPredicting(false);
    } catch (error) {
      setIsPredicting(false);
      console.error(error);
    }
  };

  /**
   * Update toast message
   *
   * @param {boolean} showPersonDetected
   */
  const updateToast = (showPersonDetected: boolean) => {
    try {
      if (showPersonDetected) {
        // Add a new `ℹ️ TOAST` to the state
        dispatch(
          homeReducers.addToast({
            id: uuidv4(),
            message: "Fellow human detected...",
            toastType: TOAST_TYPE.SUCCESS,
            payload: {},
            isActive: true,
            headerText: "TensorFlow",
            timestamp: new Date().toString(),
            toastOwner: "Tensor Flow",
          })
        );
      } else {
        // Add a new `ℹ️ TOAST` to the state
        dispatch(
          homeReducers.addToast({
            id: uuidv4(),
            message: "Fellow human not detected...",
            toastType: TOAST_TYPE.WARNING,
            payload: {},
            isActive: true,
            headerText: "TensorFlow",
            timestamp: new Date().toString(),
            toastOwner: "Tensor Flow",
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Resets page
   */
  const onClear = () => {
    setPredictions(initPredictions);
    setIsPredicting(false);
    setFile("");
    setPersonDetected(false);
    dispatch(homeReducers.deleteToast({ toastId: toast.id}));
  };

  return (
    <section id="skills" className="min-h-[75vh]">
      <div className="container flex flex-col px-4 mx-auto mt-10 space-y-12 md:space-y-0 md:flex-row">
        <div className="flex flex-col space-y-8 md:w-1/2">
          <h2 className="max-w-md md:text-4xl text-2xl font-bold text-center md:text-left">
            What is TensorFlow.js?
          </h2>
          <p className="text-center pt-4 text-gray-500 md:text-left">
            TensorFlow.js is a library for Machine Learning(ML) in JavaScript.
            <br></br> It allows development of ML models in JavaScript, and the
            use of ML directly in the browser or in Node.js.
          </p>
        </div>
      </div>

      <div className="container px-4 mx-auto mt-5 w-full">
        <h2 className="text-2xl font-medium text-left">Image Prediction:</h2>
        <div className="w-full mb-3">
          <ToastManager
            toastType={toast.toastType}
            id={toast.id}
            message={toast.message}
            payload={toast.payload}
            isActive={toast.isActive}
            toastOwner={toast.toastOwner}
            headerText={toast.headerText}
            timestamp={toast.timestamp}
          />
          <br></br>
          <Pill predictions={predictions} />
        </div>

        {file ? (
          <>
            {!isPredicting ? (
              <>
                {predictions.length > 0 ? null : (
                  <Button
                    className="cursor-pointer p-3 px-6 mt-2 w-[150px] text-white bg-blue-600 
            rounded-full baseline hover:bg-blue-700 md:block"
                    label="Predict Image"
                    onclickButton={predictImage}
                    disabled={predictions.length > 0}
                  />
                )}
                <Button
                  className="cursor-pointer p-3 mt-3 px-6 w-[150px] text-white bg-red-600 
          rounded-full baseline hover:bg-red-700 md:block"
                  label="Clear"
                  onclickButton={onClear}
                />
              </>
            ) : (
              <div className="m-3">
                <CircleLoader size={50} color="blue" />
              </div>
            )}
            <img
              alt="referenceImage"
              className="w-[200px] p-2"
              id="uploadedImage"
              src={file}
              crossOrigin="anonymous"
            />
          </>
        ) : (
          <>
            <p className="text-blue-500 p-2">
              Pssst! use an image with a person and see.. 👀
            </p>
            <input
              className="p-2"
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
          </>
        )}
      </div>
    </section>
  );
};

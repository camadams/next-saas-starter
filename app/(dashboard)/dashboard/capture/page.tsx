"use client";

import { llmWork } from "@/lib/aiactions";
import { useRef, useState, useEffect } from "react";

const CameraCapture = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [waitingForApiResponse, setWaitingForApiResponse] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<string | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Error accessing camera: ", err);
      });
  }, []);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 640, 480);
        setPhoto(canvasRef.current.toDataURL("image/png"));
        // You can now send the photo data (base64) to your backend
      }
    }
  };

  const handleSendClick = async () => {
    setWaitingForApiResponse(true);
    setModalIsOpen(true);
    try {
      const resp = await llmWork(photo!);
      setApiResponse(JSON.stringify(resp));
      console.log(resp);
    } catch (error) {
      console.error("Error in API call:", error);
      setApiResponse("An error occurred while processing the image.");
    } finally {
      setWaitingForApiResponse(false);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setApiResponse(null);
  };

  return (
    <div>
      <div>
        <video ref={videoRef} width="640" height="480" autoPlay />
        <input
          type="file"
          id="cameraInput"
          accept="image/*"
          capture="environment"
        />{" "}
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          style={{ display: "none" }}
        />
        <button onClick={capturePhoto}>Capture Photo</button>
      </div>
      {photo && (
        <div>
          <h3>Captured Photo:</h3>
          <img src={photo} alt="Captured" />
          {/* <p>{photo}</p> */}
          <button onClick={handleSendClick} disabled={waitingForApiResponse}>
            {waitingForApiResponse ? "Loading..." : "Send"}
          </button>
        </div>
      )}
      {modalIsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">API Response</h2>
            {waitingForApiResponse ? (
              <p className="text-gray-600">Loading...</p>
            ) : (
              <>
                <p className="text-gray-800 mb-4">{apiResponse}</p>
                <button 
                  onClick={closeModal}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Done
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;

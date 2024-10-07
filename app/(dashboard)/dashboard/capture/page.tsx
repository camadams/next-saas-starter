"use client";

import { llmWork } from "@/lib/aiactions";
import { useRef, useState, useEffect } from "react";

const CameraCapture = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<string | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
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
        context.drawImage(videoRef.current, 0, 0, window.innerWidth, window.innerHeight);
        setPhoto(canvasRef.current.toDataURL("image/png"));
      }
    }
  };

  const handleSendClick = async () => {
    setIsLoading(true);
    try {
      const resp = await llmWork(photo!);
      setApiResponse(JSON.stringify(resp));
    } catch (error) {
      console.error("Error processing image:", error);
      setApiResponse("An error occurred while processing the image.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetCapture = () => {
    setPhoto(null);
    setApiResponse(null);
  };

  return (
    <div className="relative h-screen w-screen">
      <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" autoPlay playsInline />
      <canvas ref={canvasRef} className="hidden" />
      
      {!photo && (
        <button
          onClick={capturePhoto}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-3 rounded-full shadow-lg font-semibold"
        >
          Take Photo
        </button>
      )}

      {photo && !apiResponse && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Confirm Photo</h3>
            <img src={photo} alt="Captured" className="w-full mb-4 rounded" />
            <button
              onClick={handleSendClick}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Send"}
            </button>
          </div>
        </div>
      )}

      {apiResponse && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Result</h3>
            <p className="mb-4">{apiResponse}</p>
            <button
              onClick={resetCapture}
              className="w-full bg-green-500 text-white px-4 py-2 rounded font-semibold"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;

"use client";

import { llmWork } from "@/lib/aiactions";
import { useRef, useState, useEffect, ChangeEvent } from "react";
import { CameraIcon } from "lucide-react";
import { Spending } from "@/lib/db/schema";

const CameraCapture = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [waitingForApiResponse, setWaitingForApiResponse] =
    useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<Spending | null>(null);

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

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log(e.target?.result);
        setPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendClick = async () => {
    setWaitingForApiResponse(true);
    setModalIsOpen(true);
    try {
      const resp : Spending = await llmWork(photo!);
      setApiResponse(resp);
      console.log(resp);
    } catch (error) {
      console.error("Error in API call:", error);
      setApiResponse(null);
    } finally {
      setWaitingForApiResponse(false);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setApiResponse(null);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      <div>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-500 hover:text-white">
            <CameraIcon className="w-10 h-10" />
            <span className="mt-2 text-base leading-normal">Capture</span>
            <input
              className="hidden"
              type="file"
              id="cameraInput"
              accept="image/*"
              capture="environment"
              onChange={handleFileInputChange}
            />
          </label>
        </div>
      </div>

      {photo && (
        <>
          <h3>Captured Photo:</h3>
          <img
            className="w-1/2"
            src={photo}
            alt="Captured"
            // style={{ maxWidth: "100%", height: "auto" }}
          />
          <button
            className={`
              text-white font-bold py-2 px-4 rounded
              transition-all duration-1000 ease-in-out
              ${
                waitingForApiResponse
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 animate-pulse"
              }
            `}
            onClick={handleSendClick}
            disabled={waitingForApiResponse}
          >
            {waitingForApiResponse ? "Loading..." : "Send"}
          </button>
      
        </>
      )}

      {modalIsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            {waitingForApiResponse ? (
              <p className="text-gray-600">Loading...</p>
            ) : (
              <>
                {apiResponse  && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Spending Details:</h3>
                    <p><strong>Amount:</strong> {apiResponse.price}</p>
                    <p><strong>Category:</strong> {apiResponse.category}</p>
                    <p><strong>Date:</strong> {apiResponse.date.toLocaleDateString()}</p>
                    <p><strong>Description:</strong> {apiResponse.description}</p>
                  </div>
                )}

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

"use client";

import { llmWork } from "@/lib/aiactions";
import { useRef, useState, useEffect, ChangeEvent } from "react";

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
        <input
          type="file"
          id="cameraInput"
          accept="image/*"
          capture="environment"
          onChange={handleFileInputChange}
        />{" "}
        {/* <canvas
          ref={canvasRef}
          width="640"
          height="480"
          style={{ display: "none" }}
        /> */}
        <button onClick={handleSendClick} disabled={waitingForApiResponse}>
          {waitingForApiResponse ? "Loading..." : "Send"}
        </button>
      </div>
      
      {photo && (
        <div>
          <h3>Captured Photo:</h3>
          <img src={photo} alt="Captured" style={{ maxWidth: '100%', height: 'auto' }} />
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

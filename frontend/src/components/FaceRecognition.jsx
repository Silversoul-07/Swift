import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const FaceRecognition = () => {
  const webcamRef = useRef(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const videoConstraints = {
    width: 720,
    height: 480,
    facingMode: "user"
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      postToBackend(imageSrc);
    } else {
      setError('Failed to capture image. Please try again.');
    }
  }, [webcamRef]);

  const postToBackend = async (imageDataUrl) => {
    try {
      const response = await fetch('/api/face-recognition', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: imageDataUrl,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        setError('Failed to process face recognition. Please try again.');
      }
    } catch (error) {
      setError('Error connecting to the server. Please check your connection.');
      console.error('Error posting face image:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Face Recognition</h2>
          <Camera size={24} />
        </div>
        <div className="relative">
          <Webcam
            audio={false}
            height={480}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={720}
            videoConstraints={videoConstraints}
            className="w-full h-auto"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-blue-500 rounded-lg w-3/4 h-3/4" />
        </div>
        <div className="p-4">
          <button
            onClick={capture}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Capture and Recognize
          </button>
        </div>
      </div>
      {showSuccess && (
        <Alert className="mt-4 bg-green-100 border-green-400 text-green-700">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>Attendance marked successfully!</AlertDescription>
        </Alert>
      )}
      {error && (
        <Alert className="mt-4 bg-red-100 border-red-400 text-red-700">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default FaceRecognition;
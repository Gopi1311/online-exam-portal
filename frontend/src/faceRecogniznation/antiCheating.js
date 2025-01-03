import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const WebcamDetection = React.forwardRef(({ onCheatingDetected }, ref) => {
  const videoRef = useRef(null);
  const [cheating, setCheating] = useState(false);
  const stopped = useRef(false); // Use a ref for the stopped flag

  const stopWebcam = () => {
    stopped.current = true; // Set the stopped flag
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    ref.current = { stopWebcam };
  }, [ref]);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL);
      startVideo();
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: {} })
        .then((stream) => {
          stopped.current = false; // Reset the stopped flag
          videoRef.current.srcObject = stream;
        })
        .catch((err) => console.error("Error accessing webcam: ", err));
    };

    loadModels();
  }, []);

  const handleVideoOnPlay = async () => {
    const detectFace = async () => {
      if (stopped.current) return; // Exit if the webcam is stopped

      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();

      if (detections.length === 0) {
        handleNoFaceDetected();
      } else if (detections.length > 1) {
        handleMultipleFacesDetected();
      } else {
        const faceDetection = detections[0];
        checkForGazeOrTurning(faceDetection);
      }

      requestAnimationFrame(detectFace);
    };

    detectFace();
  };

  const handleNoFaceDetected = () => {
    console.log("No face detected! Possible cheating.");
    setCheating(true);
    onCheatingDetected();
  };

  const handleMultipleFacesDetected = () => {
    console.log("Multiple faces detected! Possible cheating.");
    setCheating(true);
    onCheatingDetected();
  };

  const checkForGazeOrTurning = (faceDetection) => {
    const landmarks = faceDetection.landmarks;
    const nose = landmarks.getNose();
    const leftEye = landmarks.getLeftEye();
    const rightEye = landmarks.getRightEye();

    const noseCenter = nose[3];

    const eyeDistance = rightEye[0].x - leftEye[0].x;

    if (
      noseCenter.x < leftEye[0].x - eyeDistance ||
      noseCenter.x > rightEye[0].x + eyeDistance
    ) {
      console.log("User is turning their face! Possible cheating.");
      setCheating(true);
      onCheatingDetected();
    } else {
      setCheating(false);
    }
  };

  return (
    <div>
      <video
        ref={videoRef}
        onPlay={handleVideoOnPlay}
        width="150"
        height="150"
        style={{ border: "2px solid black" }}
        autoPlay
        muted
        className="img-fluid"
      />
      {cheating && <p className="text-danger m-0">Cheating detected!</p>}
    </div>
  );
});

export default WebcamDetection;

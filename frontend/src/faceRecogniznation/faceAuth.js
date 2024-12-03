import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const FacialRecognition = () => {
  const webcamRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const {id}=useParams();
  const navigate=useNavigate();
  // Load FaceAPI models
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        ]);
        setModelsLoaded(true);
      } catch (error) {
        console.error("Error loading models:", error);
      }
    };
    loadModels();
  }, []);

  // Fetch the profile image from the backend
  useEffect(() => {
    axios
      .get(`http://localhost:8081/profileStudent/image`, { responseType: "blob" })
      .then((response) => {
        const imageURL = URL.createObjectURL(response.data);
        setImageSrc(imageURL);
      })
      .catch((err) => console.error("Error fetching image:", err));
  }, []);

  const capture = async () => {
    if (!modelsLoaded || !webcamRef.current) {
      console.log("Models not loaded or webcam unavailable");
      return;
    }

    const capturedImg = webcamRef.current.getScreenshot();
    if (!capturedImg) {
      console.log("No image captured");
      return;
    }

    try {
      // Create DOM elements for face-api processing
      const capturedImgElement = document.createElement("img");
      capturedImgElement.src = capturedImg;

      const profileImgElement = document.createElement("img");
      profileImgElement.src = imageSrc;

      // Wait for images to load before detection
      await Promise.all([
        new Promise((resolve) => (capturedImgElement.onload = resolve)),
        new Promise((resolve) => (profileImgElement.onload = resolve)),
      ]);

      // Detect and compare faces
      const capturedFace = await faceapi
        .detectSingleFace(capturedImgElement, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      const profileFace = await faceapi
        .detectSingleFace(profileImgElement, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (capturedFace && profileFace) {
        const distance = faceapi.euclideanDistance(capturedFace.descriptor, profileFace.descriptor);
        console.log("Face distance:", distance);
        if (distance < 0.6) {
          alert("Face recognized!");
          navigate(`/examinstruction/${id}`);
          
        } else {
          alert("Face not recognized!");
        }
      } else {
        alert("Face not detected in one or both images.");
      }
    } catch (error) {
      console.error("Error during face detection:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
    <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "500px" }}>
      <h2 className="text-center mb-4">Facial Recognition Login</h2>
      {modelsLoaded ? (
        <div className="webcam-container mb-4">
          <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="w-100 rounded" />
        </div>
      ) : (
        <div className="d-flex justify-content-center mb-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div className="text-center">
      <Link to={'/studenthomedash'}className="btn btn-danger me-2" >
          Back
        </Link>
        <button className="btn btn-success" onClick={capture}>
          Capture Face
        </button>
        
      </div>
    </div>
  </div>
  
  );
};

export default FacialRecognition;

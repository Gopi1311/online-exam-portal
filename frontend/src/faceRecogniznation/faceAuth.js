import React, { useRef, useEffect, useState } from 'react';
import Webcam from "react-webcam";
import * as faceapi from 'face-api.js';
import axios from 'axios';

const FacialRecognition = () => {
  const webcamRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    // Load FaceAPI models
    const loadModels = async () => {
        const MODEL_URL = './models';
        //'https://github.com/justadudewhohacks/face-api.js/tree/master/weights/';
        //'https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights/';
       
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      setModelsLoaded(true);
    };
    loadModels();
  }, []);

  const [imageSrc,setImageSrc] = useState(null);
  const [vryimg,setVryimg] = useState(null);

  useEffect(() => {

        //for get image
         axios.get(`http://localhost:8081/profileStudent/image`,{responseType:'blob'})
        .then(imgres=>{
        const imageURL=URL.createObjectURL(imgres.data);
        setImageSrc(imageURL);
      })
      .catch((err) => {
        console.log(err);

      });

      axios.get(`http://localhost:8081/vryimg`,{responseType:'blob'})
      .then(imgres=>{
      const imageURL=URL.createObjectURL(imgres.data);
      setVryimg(imageURL);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  const capture = async () => {
    console.log('capturing');
    if (modelsLoaded && webcamRef.current) {
      const capturedImg = webcamRef.current.getScreenshot();
     const capturedImgImgElement = document.createElement('img');
     capturedImgImgElement.src = vryimg;
    //  imgElement.src = img;
   const imgElement = document.createElement('img');
   imgElement.src = imageSrc; 

imgElement.onload = async () => {
    try {
        const detections0 = await faceapi.detectSingleFace(capturedImgImgElement, new faceapi.TinyFaceDetectorOptions())
                                      .withFaceLandmarks().withFaceDescriptor();
      const detections = await faceapi.detectSingleFace(imgElement, new faceapi.TinyFaceDetectorOptions())
                                      .withFaceLandmarks().withFaceDescriptor();
      
      console.log('detections', detections0);
      
      if (detections0) {
        console.log('Face detected:', detections);

        const distance = faceapi.euclideanDistance(detections0.descriptor, detections.descriptor);

            console.log(distance)

            if (distance < 0.6) {  // Threshold value
                console.log("true");
            } else {
                console.log('Face not recognized' );
            }

        // Send the descriptor to the backend for verification
      //  verifyFace(detections.descriptor);
      } else {
        console.log('Face not detected...');
        alert('Face not detected, please try again...');
      }
    } catch (error) {
      console.error('Error detecting face:', error);
    }
  };





    //   const detections = await faceapi.detectSingleFace(imgElement, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
    //   console.log('detections', detections);

    //   if (detections) {
    //     console.log('Face detected:', detections);
    //     // Send the descriptor to the backend for verification
    //     verifyFace(detections.descriptor);
    //   } else {
    //     console.log('Face not detected...');
    //     //verifyFace(img);
    //     alert('Face not detected, please try again...')
    //   }
    }else{
        console.log("not cap");
    }
  };

  const verifyFace = async (descriptor) => {
    try {
        console.log('Verifying face:', JSON.stringify({ descriptor }));
      
        const response = await axios.post('http://localhost:8081/api/verify-face', {
            descriptor // Send your descriptor directly
          }, {
            //headers: { 'Content-Type': 'application/json' } // Specify headers in the third argument
          });
          
      const result = await response.json();
      if (result.success) {
        console.log("success")
        alert('Face verified successfully');
      } else {
        alert('Verification failed');
      }
    } catch (error) {
      console.error('Error during verification:', error);
    }
  };

  return (
    <div>
      <h2>Facial Recognition Login</h2>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button className='btn btn-success' onClick={capture}>Capture Face</button>
    </div>
  );
};

export default FacialRecognition;

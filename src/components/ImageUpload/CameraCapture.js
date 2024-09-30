import React, { useRef } from 'react';

function CameraCapture({ onCapture }) {
  const videoRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("카메라 접근 오류", err);
    }
  };

  const captureImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    canvas.toBlob(onCapture);
  };

  return (
    <div className="camera-capture">
      <video ref={videoRef} style={{ display: 'none' }}></video>
      <button onClick={startCamera}>카메라 켜기</button>
      <button onClick={captureImage}>사진 찍기</button>
    </div>
  );
}

export default CameraCapture;
import React, { useRef } from 'react';

function ImageUpload({ onFileSelect }) {
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
    } else {
      alert('이미지 파일만 선택할 수 있습니다.');
    }
    // 파일 선택 input의 value를 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="image-upload">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        id="file-upload"
        ref={fileInputRef}
      />
      <label htmlFor="file-upload">
        <i className="fas fa-image"></i>
      </label>
    </div>
  );
}

export default ImageUpload;
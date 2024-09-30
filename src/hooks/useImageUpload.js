import { useState } from 'react';
import { uploadImageToAPI } from '../services/api';

function useImageUpload() {
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async (file) => {
    setIsUploading(true);
    try {
      const response = await uploadImageToAPI(file);
      setIsUploading(false);
      return response;
    } catch (error) {
      console.error('Error uploading image:', error);
      setIsUploading(false);
      return null;
    }
  };

  return { uploadImage, isUploading };
}

export default useImageUpload;
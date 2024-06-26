import React, { useState } from 'react';
import axios from 'axios';
import { uploadFile } from '../api/fileUpload';

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await uploadFile(formData);
      setUploadedFile(res);
      setUploading(false);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload image</button>

      {uploading ? (
        <p>Carregando...</p>
      ) : (
        uploadedFile && (
          <p>
            Arquivo salvo com sucesso{' '}
            <a href={uploadedFile.url} target="_blank" rel="noopener noreferrer">
              {uploadedFile.name}
            </a>
          </p>
        )
      )}
    </div>
  );
};

export default ImageUploader;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ImageUpload() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      const res = await axios.get('/api/images');
      setImages(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
      await axios.post('/api/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFile(null);
      fetchImages();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h2>Upload Image for OCR</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <ul>
        {images.map(img => (
          <li key={img._id}>{img.filename}<br />OCR: {img.ocrText}</li>
        ))}
      </ul>
    </div>
  );
}

export default ImageUpload;

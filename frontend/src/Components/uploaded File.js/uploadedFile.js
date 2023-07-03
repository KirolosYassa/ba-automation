import React, { useState } from "react";

const FileUploadForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle file upload here
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="file-input">Choose a file:</label>
      <input
        id="file-input"
        type="file"
        accept=".txt"
        onChange={handleFileChange}
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default FileUploadForm;

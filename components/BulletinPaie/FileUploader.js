import React from 'react';

const FileUploader = ({ onFileSelect }) => {
  return (
    <input type="file" onChange={e => onFileSelect(e.target.files[0])} />
  );
};

export default FileUploader; 
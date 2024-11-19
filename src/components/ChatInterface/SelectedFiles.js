import React from 'react';

function SelectedFiles({ files, onRemove }) {
  return (
    <div className="selected-files">
      {files.map((file, index) => (
        <div key={index} className="selected-file">
          <img
            src={URL.createObjectURL(file)}
            alt={`Selected file ${index + 1}`}
            className="file-preview"
          />
          <span className="file-name">{file.name}</span>
          <button onClick={() => onRemove(index)} className="remove-file">
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

export default SelectedFiles;
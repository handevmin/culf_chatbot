import React from 'react';

function SelectedFile({ file, onRemove }) {
  return (
    <div className="selected-file">
      <img
        src={URL.createObjectURL(file)}
        alt="Selected file preview"
        className="file-preview"
      />
      <span className="file-name">{file.name}</span>
      <button onClick={onRemove} className="remove-file">
        ×
      </button>
    </div>
  );
}

export default SelectedFile;
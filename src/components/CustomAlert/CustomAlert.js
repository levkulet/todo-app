import React from 'react';
import './CustomAlert.scss'; // Import SCSS file

function CustomAlert({ message }) {
  return (
    <div className="custom-alert" role="alert">
      {message}
    </div>
  );
}

export default CustomAlert;

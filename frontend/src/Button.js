import React from 'react';

function CustomButton({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

export default CustomButton;

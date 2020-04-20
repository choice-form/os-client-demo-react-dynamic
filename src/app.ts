import React from "react";

const button = React.createElement('button',
  {
    onClick: () => {
      alert('clicked');
    }
  }, 'button');

export default button;
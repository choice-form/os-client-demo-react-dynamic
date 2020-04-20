import React from 'react';
import ReactDom from 'react-dom';

const button = React.createElement('button',
  {
    onClick: () => {
      alert('clicked');
    }
  }, 'button');
ReactDom.render(button, document.getElementById('root'));

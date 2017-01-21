import React from 'react';

const QVGroupDisplay = (props) => {
  return (
    <div className="row callout" style={{backgroundColor: "#d1e2b6"}}>
      {props.children}
    </div>
  );
};

export default QVGroupDisplay;

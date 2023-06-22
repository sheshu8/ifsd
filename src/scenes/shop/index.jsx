import React, { useState } from 'react';
import ShopWidget from './shopWidget';

function ShopScene() {
  const [isWidgetOpen, setWidgetOpen] = useState(false);

  const handleOpenWidget = () => {
    setWidgetOpen(true);
  };

  const handleCloseWidget = () => {
    setWidgetOpen(false);
  };

  return (
    <div>
      <h1>Welcome to the Shop Scene!</h1>
      {!isWidgetOpen && (
        <button onClick={handleOpenWidget}>Open Shop Widget</button>
      )}
      {isWidgetOpen && (
        <div>
          <button onClick={handleCloseWidget}>Close Shop Widget</button>
          <ShopWidget />
        </div>
      )}
    </div>
  );
}

export default ShopScene;

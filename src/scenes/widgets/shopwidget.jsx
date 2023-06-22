import React, { useState } from 'react';

function ShopRentWidget() {
  const [numberOfShops, setNumberOfShops] = useState(0);
  const [shops, setShops] = useState([]);
  const [n, setN] = useState(0);
  const [sum, setSum] = useState(0);

  const handleNumberOfShopsChange = (event) => {
    setNumberOfShops(parseInt(event.target.value));
  };

  const handleShopNameChange = (event, index) => {
    const updatedShops = [...shops];
    updatedShops[index].name = event.target.value;
    setShops(updatedShops);
  };

  const handleRentChange = (event, index) => {
    const updatedShops = [...shops];
    updatedShops[index].rent = parseFloat(event.target.value);
    setShops(updatedShops);
  };

  const handleNChange = (event) => {
    setN(parseInt(event.target.value));
  };

  const handleCalculateSum = () => {
    const sortedRents = shops.map(shop => shop.rent).sort((a, b) => a - b);
    const sumOfNShops = sortedRents.slice(0, n).reduce((acc, rent) => acc + rent, 0);
    setSum(sumOfNShops);
  };

  const renderShopInputs = () => {
    const shopInputs = [];
    for (let i = 0; i < numberOfShops; i++) {
      shopInputs.push(
        <div key={i}>
          <label>
            Shop {i + 1} Name:
            <input type="text" onChange={(e) => handleShopNameChange(e, i)} />
          </label>
          <br />
          <label>
            Rent for Shop {i + 1}:
            <input type="number" step="0.01" onChange={(e) => handleRentChange(e, i)} />
          </label>
          <hr />
        </div>
      );
    }
    return shopInputs;
  };

  return (
    <div>
      <label>
        Number of Shops:
        <input type="number" min="0" onChange={handleNumberOfShopsChange} />
      </label>
      <br />
      {renderShopInputs()}
      <label>
        Value of 'n':
        <input type="number" min="0" onChange={handleNChange} />
      </label>
      <br />
      <button onClick={handleCalculateSum}>Calculate Sum</button>
      <br />
      <p>The sum of rents for the top {n} shops is: {sum}</p>
    </div>
  );
}

export default ShopRentWidget;

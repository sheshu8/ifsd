const prompt = require('prompt-sync')();

class Shop {
  constructor(name, rent) {
    this.name = name;
    this.rent = rent;
  }
}

class SumOfNShopRents {
  constructor() {
    this.shops = [];
  }

  addShop(shop) {
    this.shops.push(shop);
  }

  getSumOfNShops(n) {
    const sortedRents = this.shops
      .map(shop => shop.rent)
      .sort((a, b) => a - b);
    const sumOfNShops = sortedRents.slice(0, n).reduce((acc, rent) => acc + rent, 0);
    return sumOfNShops;
  }
}

function main() {
  const sumOfNShopRents = new SumOfNShopRents();

  const numberOfShops = parseInt(prompt("Enter the number of shops:"));

  for (let i = 0; i < numberOfShops; i++) {
    const shopName = prompt(`Enter the name of shop ${i + 1}:`);
    const rent = parseFloat(prompt(`Enter the rent for shop ${i + 1}:`));

    const shop = new Shop(shopName, rent);
    sumOfNShopRents.addShop(shop);
  }

  const n = parseInt(prompt("Enter the value of 'n':"));
  const sum = sumOfNShopRents.getSumOfNShops(n);
  console.log(`The sum of rents for the top ${n} shops is: ${sum}`);
}

main();

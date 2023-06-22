const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Define the Shop schema
const shopSchema = new mongoose.Schema({
  name: String,
  rent: Number,
});

const ShopModel = mongoose.model('Shop', shopSchema);

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

app.post('/shops', async (req, res) => {
  try {
    const { name, rent } = req.body;
    const shop = new ShopModel({ name, rent });
    await shop.save();
    res.status(201).json(shop);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving the shop.' });
  }
});

app.get('/sum-of-n-shops/:n', async (req, res) => {
  try {
    const n = parseInt(req.params.n);
    const shops = await ShopModel.find().sort({ rent: 1 }).limit(n);
    const sumOfNShops = shops.reduce((acc, shop) => acc + shop.rent, 0);
    res.json({ sum: sumOfNShops });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the sum.' });
  }
});

// Connect to MongoDB
mongoose.connect('mongodb+srv://sheshadrimbsc22:uniquesheshadri@cluster0.4vsx93w.mongodb.net/shopping?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // Start the server after successful database connection
    app.listen(3000, () => {
      console.log('Server is listening on port 3000');
    });
  })
  .catch(error => console.error('Failed to connect to MongoDB:', error));

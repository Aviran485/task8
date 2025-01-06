const express = require('express');
const { products } = require('./data');

const app = express();
const port = process.env.PORT || 3002;

app.get('/products/:productPrice', (req, res) => {
  const productPrice = parseFloat(req.query.productPrice);

  // Validate the productPrice parameter
  if (isNaN(productPrice)) {
    return res.status(400).json({ error: 'Invalid product price. Please provide a valid number.' });
  }

  // Filter products by price
  const filteredProducts = products.filter((product) => product.price >= productPrice);

  // Check if any products match the criteria
  if (filteredProducts.length === 0) {
    return res.status(404).json({ error: 'No products found with price greater than or equal to the specified value.' });
  }

  // Return the filtered products
  res.status(200).json(filteredProducts);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

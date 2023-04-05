const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Import routes
const usersRoutes = require('./app/routes/usersRoutes');
const categoriesRoutes = require('./app/routes/categoriesRoutes');
const brandsRoutes = require('./app/routes/brandsRoutes');
const foodRoutes = require('./app/routes/foodRoutes');
const mealsRoutes = require('./app/routes/mealsRoutes');
const mealItemsRoutes = require('./app/routes/mealItemsRoutes');
const userFavoritesRoutes = require('./app/routes/userFavoritesRoutes');

// Configure middleware for handling JSON data
app.use(express.json());

// Allow cross-origin requests (replace '*' with your domain)
app.use(cors({ origin: '*' }));

// Use routes
/*
app.use('/api/users', usersRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/brands', brandsRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/meals', mealsRoutes);
app.use('/api/meal-items', mealItemsRoutes);
app.use('/api/user-favorites', userFavoritesRoutes);
*/

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('express').urlencoded({ extended: false });
const connectDB = require('./database/connect');
const app = express();


connectDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser);

// Make userName available to all templates
app.use((req, res, next) => {
  res.locals.userName = null;
  next();
});

// Routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');

app.use('/', indexRoutes);
app.use('/', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));

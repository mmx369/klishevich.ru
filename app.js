const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const goodsRouter = require('./routes/goods');
const orderRouter = require('./routes/orders');
const blogsRouter = require('./routes/blogs');
const imagesRouter = require('./routes/images');
const getCountryIdRouter = require('./routes/getCountryId');
const bodyParser = require('body-parser');
const path = require('path');

logger.info('connecting to MongoDB');

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(bodyParser.json());

app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/goods', goodsRouter);
app.use('/api/orders', orderRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/uploads', imagesRouter);
app.use('/api/getCountryId', getCountryIdRouter);

app.get('*', (req, res) => {
  const options = {
    root: path.join(__dirname, 'build'),
  };

  res.sendFile('index.html', options);
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

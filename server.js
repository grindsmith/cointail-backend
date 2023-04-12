require('dotenv').config();
const path = require('path');
const cors = require('cors')
const express = require('express');
const PORT = process.env.PORT || 8080;
const app = express();

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

const { errorHandler } = require("./middleware/error.middleware");
const { notFoundHandler } = require("./middleware/not-found.middleware");

app.use(express.json());
app.set("json spaces", 2);
app.use(cors());

// API ROUTES
app.use(require('./api/eth.getWalletTokens'));
app.use(require('./api/eth.getWalletTransactions'));
app.use(require('./api/group.getAllGroups'));
app.use(require('./api/group.getGroup'));
app.use(require('./api/group.postGroup'));
app.use(require('./api/notify.postWalletTransaction'));
app.use(require('./api/wallet.getAllWallets'));
app.use(require('./api/wallet.getWallet'));
app.use(require('./api/wallet.postWallet'));
app.use(require('./api/wallet.putWallet'));
app.use(require('./api/walletGroup.postWalletGroup'));
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);
app.use(notFoundHandler);

// Remove X-Frame-Options to allow for rendering in an Iframe
app.use((req, res, next) => {
  res.removeHeader('X-Frame-Options');
  next();
});

// Logs every incoming HTTP requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl} over ${req.protocol}`);
  next();
});

app.get('/*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// Catch any promise rejections
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise ' + p + ' reason: ' + reason);
});

// Serve the app
app.listen(PORT, () => {
  console.log('Server running at port:' + PORT);
});
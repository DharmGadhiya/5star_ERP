const express = require('express');

const cors = require('cors');
const compression = require('compression');

const cookieParser = require('cookie-parser');

const coreAuthRouter = require('./routes/coreRoutes/coreAuth');
const coreApiRouter = require('./routes/coreRoutes/coreApi');
const coreDownloadRouter = require('./routes/coreRoutes/coreDownloadRouter');
const corePublicRouter = require('./routes/coreRoutes/corePublicRouter');
const adminAuth = require('./controllers/coreControllers/adminAuth');

const errorHandlers = require('./handlers/errorHandlers');
const erpApiRouter = require('./routes/appRoutes/appApi');
const inventoryApiRouter = require('./routes/appRoutes/inventoryApi');
const clientOrderApiRouter = require('./routes/appRoutes/clientOrderApi');
const quoteApiRouter = require('./routes/appRoutes/quoteApi');
const approvalApiRouter = require('./routes/appRoutes/approvalApi');
const purchaseOrderApiRouter = require('./routes/appRoutes/purchaseOrderApi');
const salesOrderApiRouter = require('./routes/appRoutes/salesOrderApi');

const fileUpload = require('express-fileupload');
// create our Express app
const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(compression());

// // default options
// app.use(fileUpload());

// Here our API Routes

app.use('/api', coreAuthRouter);
app.use('/api', adminAuth.isValidAuthToken, coreApiRouter);
app.use('/api', adminAuth.isValidAuthToken, erpApiRouter);
app.use('/api', adminAuth.isValidAuthToken, inventoryApiRouter);
app.use('/api', adminAuth.isValidAuthToken, clientOrderApiRouter);
app.use('/api', adminAuth.isValidAuthToken, quoteApiRouter);
app.use('/api', adminAuth.isValidAuthToken, approvalApiRouter);
app.use('/api', adminAuth.isValidAuthToken, purchaseOrderApiRouter);
app.use('/api', adminAuth.isValidAuthToken, salesOrderApiRouter);
app.use('/api', adminAuth.isValidAuthToken, require('./routes/appRoutes/invoiceApi'));
app.use('/api', adminAuth.isValidAuthToken, require('./routes/coreRoutes/credentialManagerApi'));
app.use('/api', adminAuth.isValidAuthToken, require('./routes/appRoutes/dashboardApi'));
app.use('/download', coreDownloadRouter);
app.use('/public', corePublicRouter);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// production error handler
app.use(errorHandlers.productionErrors);

// done! we export it so we can start the site in start.js
module.exports = app;

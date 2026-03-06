const mongoose = require('mongoose');
const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');

const summary = require('./summary');

function modelController() {
  const Model = mongoose.model('Client');
  const Product = mongoose.model('Product');
  const methods = createCRUDController('Client');

  methods.summary = (req, res) => summary(Model, req, res);

  // Override create to auto-assign customerId, inquiryNos, and quoteId
  methods.create = async (req, res) => {
    try {
      req.body.removed = false;

      // Find the highest existing customerId and increment by 1
      const lastClient = await Model.findOne({}, { customerId: 1 })
        .sort({ customerId: -1 })
        .lean();

      const nextCustomerId = lastClient && lastClient.customerId ? lastClient.customerId + 1 : 1;

      req.body.customerId = nextCustomerId;

      // Process purchases and assign inquiry numbers + quote ID
      const purchases = req.body.purchases || [];
      let inquiryCounter = 0;
      const newQuoteId = purchases.length > 0 ? 1 : 0;

      const processedPurchases = [];

      for (const purchase of purchases) {
        inquiryCounter++;

        // Look up the product name
        let productName = '';
        if (purchase.product) {
          const prod = await Product.findById(purchase.product).lean();
          if (prod) {
            productName = prod.name;
          }
        }

        processedPurchases.push({
          product: purchase.product,
          productName: productName,
          quantity: purchase.quantity || 1,
          inquiryNo: `${nextCustomerId}.${inquiryCounter}`,
          quoteId: `${nextCustomerId}.${newQuoteId}`,
        });
      }

      req.body.purchases = processedPurchases;
      req.body.lastInquiryNo = inquiryCounter;
      req.body.lastQuoteId = newQuoteId;

      const result = await new Model({ ...req.body }).save();

      return res.status(200).json({
        success: true,
        result,
        message: 'Successfully Created the document in Model',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        result: null,
        message: error.message,
      });
    }
  };

  return methods;
}

module.exports = modelController();

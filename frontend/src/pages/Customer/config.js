export const fields = {
  customerId: {
    type: 'number',
    label: 'Customer ID',
    disableForForm: true,
    disableForUpdate: true,
  },
  name: {
    type: 'string',
  },
  country: {
    type: 'country',
    // color: 'red',
  },
  address: {
    type: 'string',
  },
  phone: {
    type: 'phone',
  },
  email: {
    type: 'email',
  },
  lastInquiryNo: {
    type: 'number',
    disableForTable: true,
    disableForForm: true,
    disableForUpdate: true,
  },
  lastQuoteId: {
    type: 'number',
    disableForTable: true,
    disableForForm: true,
    disableForUpdate: true,
  },
};

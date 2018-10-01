const Taxjar = require('taxjar');
var taxJarURL = Taxjar.DEFAULT_API_URL;
if (process.env.TAXJAR_ENV == "sandbox") {
    taxJarURL = Taxjar.SANDBOX_API_URL;
}


const calculateTax = function(z, bundle) {
    client = new Taxjar({
        apiKey: bundle.authData.apiKey,
        apiUrl: taxJarURL
    });
    r = client.taxForOrder({
      from_country: bundle.inputData.from_country,
      from_zip: bundle.inputData.from_zip,
      from_state: bundle.inputData.from_state,
      from_city: bundle.inputData.from_city,
      from_street: bundle.inputData.from_street,
      to_country: bundle.inputData.to_country,
      to_zip: bundle.inputData.to_zip,
      to_state: bundle.inputData.to_state,
      to_city: bundle.inputData.to_city,
      to_street: bundle.inputData.to_street,
      amount: bundle.inputData.amount,
      shipping: bundle.inputData.shipping
    }).then(res => {
      return res.tax; // Tax object
    }).catch(err => {
      z.console.log(err.detail); // Error detail
      z.console.log(err.status); 
    });
    return r;
};
module.exports = {
  key: 'calculate',
  noun: 'Sales Tax',

  display: {
    label: 'Calculate Sales Tax',
    description: 'Calculate Sales Tax'
  },

  // `operation` is where the business logic goes.
  operation: {
    inputFields: [
        { key: 'from_country', required: true, type: 'string', label: 'From Country' },
        { key: 'from_zip', required: true, type: 'string', label: 'From Zip' },
        { key: 'from_state', required: true, type: 'string', label: 'From State' },
        { key: 'from_city', required: true, type: 'string', label: 'From City' },
        { key: 'from_street', required: true, type: 'string', label: 'From Street' },
        { key: 'to_country', required: true, type: 'string', label: 'To Country' },
        { key: 'to_zip', required: true, type: 'string', label: 'To Zip' },
        { key: 'to_state', required: true, type: 'string', label: 'To State' },
        { key: 'to_city', required: true, type: 'string', label: 'To City' },
        { key: 'to_street', required: true, type: 'string', label: 'To Street' },
        { key: 'amount', required: true, type: 'string', label: 'Total Amount' },
        { key: 'shipping', required: true, type: 'string', label: 'Shipping Amount' },
    ],
    perform: calculateTax,

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obviously dummy values that we can show to any user.
    sample: {
      id: 1,
      createdAt: 1472069465,
      name: 'Best Spagetti Ever',
      authorId: 1,
      directions: '1. Boil Noodles\n2.Serve with sauce',
      style: 'italian'
    },

    outputFields: [
      {key: 'order_total_amount', label: 'Order Total Amount'},
      {key: 'shipping', label: 'Shipping'},
      {key: 'taxable_amount', label: 'Taxable Amount'},
      {key: 'amount_to_collect', label: 'Amount to Collect'},
      {key: 'rate', label: 'Tax Rate'},
      {key: 'has_nexus', label: 'Has Nexus'},
      {key: 'freight_taxable', label: 'Freight Taxable', type: 'boolean'},
      {key: 'tax_source', label: 'Tax Source'},
      {key: 'jurisdictions', label: 'Tax Jurisdictions'},
      {key: 'breakdown', label: 'Breakdown of Taxes'}
    ]
  }
};

const Taxjar = require('taxjar');
var taxJarURL = Taxjar.DEFAULT_API_URL;
if (process.env.TAXJAR_ENV == "sandbox") {
    taxJarURL = Taxjar.SANDBOX_API_URL;
}

const testAuth = (z, bundle) => {
  const client = new Taxjar({
    apiKey: bundle.authData.apiKey,
    apiUrl: taxJarURL
  });
  return client.categories();
};

module.exports = {
  type: 'custom',
  fields: [
    {key: 'apiKey', label: 'API Key', required: true, type: 'string'}
  ],

  // Test method
  test: testAuth,
  // assuming "username" is a key in the json returned from testAuth
  connectionLabel: (z, bundle) => {
    return "TaxJar";
  }
};

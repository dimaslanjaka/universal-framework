const {google} = require('googleapis');
const config = require('./config');
const oauth2Client = new google.auth.OAuth2(
  config.gclid,
  config.gclsecret,
  YOUR_REDIRECT_URL
);
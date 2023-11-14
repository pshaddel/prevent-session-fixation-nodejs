const crypto = require('crypto');
const secret = 'secret';
const sessionId = 'L6j4T8hBwMk1ulJqGoisZbAxUOkOuQqP';
const hmac = crypto.createHmac('sha256', secret);
hmac.update(sessionId);
const signature = hmac.digest('base64').replace(/\=+$/, '');
console.log(signature);
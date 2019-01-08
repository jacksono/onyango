const moment = require('moment');
const jwt = require('jwt-simple');

const encodeToken = (user) => {
  const playload = {
    exp: moment().add(2, 'days').unix(),
    iat: moment().unix(),
    sub: user.id,
    role: user.role,
  };
  return jwt.encode(playload, process.env.SECRET_KEY);
};

const decodeToken = (token, callback) => {
  try {
    const payload = jwt.decode(token, process.env.SECRET_KEY);
    const now = moment().unix();
    if (now > payload.exp) callback('Token has expired.');
    else callback(null, payload);
  } catch (err) {
    return callback('Invalid Token.');
  }
};

module.exports = { encodeToken, decodeToken };

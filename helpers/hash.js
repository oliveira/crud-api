const bcrypt = require('bcryptjs');

const makeHash = async(password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

const compareHash = async(password, hash) => {
  return await bcrypt.compareSync(password, hash);
}

module.exports = {
  makeHash, compareHash
};

const Repair = require('./repairs.model');
const User = require('./user.model');

const initModel = () => {
  User.hasMany(Repair);
  Repair.belongsTo(User);
};
module.exports = initModel;

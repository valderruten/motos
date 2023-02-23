const Repair = require('../models/repairs.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

/* A middleware that validates if the repair exists in the database. */
exports.validIfExistRepair = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    attributes: ['id', 'date', 'email', 'status'],
    where: {
      status: 'pending',
      id,
    },
  });

  if (!repair) {
    return next(new AppError('Repair not found', 404));
  }

  req.repair = repair;
  next();
});

/* A middleware that validates if the user exists in the database. */
exports.validIfExistUserEmail = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const repair = await Repair.findOne({
    where: {
      email: email.toLowerCase(),
    },
  });

  if (repair && !repair.status) {
    //TODO: lo que se deberia hacer es hacerle un update a true al estado de la cuenta
    return next(
      new AppError(
        'The user has an account, but it is deactivated please talk to the administrator to activate it',
        400
      )
    );
  }

  if (repair) {
    return next(new AppError('The email user already exists', 400));
  }

  next();
});

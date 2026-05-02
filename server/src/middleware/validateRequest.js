import { validationResult } from "express-validator";

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422);
    next(new Error(errors.array().map((item) => item.msg).join(", ")));
    return;
  }

  next();
};

export default validateRequest;


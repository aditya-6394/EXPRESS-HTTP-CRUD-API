const yup = require('yup');

const todoSchema = yup.object({
  text: yup.string().required(),
  iscompleted: yup.boolean().required(),
});

const schemaValidator = async (req, res, next) => {
  try {
    await todoSchema.validate(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports.schemaValidator = schemaValidator;

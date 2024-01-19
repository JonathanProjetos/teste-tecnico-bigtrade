const  Joi = require('joi');

const postSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': '404|The "title" field is mandatory',
    'string.empty': '404|The "title" field is not allowed to be empty',
  }),
  content: Joi.string().required().messages({
    'any.required': '404|The "content" field is mandatory',
    'string.empty': '404|The "content" field is not allowed to be empty',
  }),
})

const dataPost = (body) => {
  const { error, value } = postSchema.validate(body);

  if(error) {
    throw error;
  }

  return value;
}

module.exports = dataPost;
const Joi = require("joi")

const schema = Joi.object({
  login: [
    Joi.string().error(new Error("login")),
    Joi.number().error(new Error("login"))
  ],

  firstName: Joi.string()
    .error(new Error("lastName")),

  lastName: Joi.string()
    .error(new Error("lastName")),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .error(new Error("password")),

  email: Joi.string()
    .error(new Error("email")),

  avatar: Joi.string().error(new Error("avatar")),

  role: Joi.string().error(new Error("role")),

  tokens: [
    {
      token: {
        type: [Joi.string(), Joi.number()]
      }
    }
  ]
})

const validation = schema => {
  return async (req, res, next) => {
    try {
      const value = await schema.validateAsync(req.body)
      next()
    } catch (err) {
      res.status(400).send({ error: err.message })
    }
  }
}

module.exports = { validation, schema }
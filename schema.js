const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image:Joi.object({
            filename: Joi.string().allow("",null),
            url:Joi.string().allow("",null)
        }),
        location:Joi.string().required(),
        country:Joi.string().required(),
        price:Joi.number().min(0).required(),
        category: Joi.string()
      .valid(
        "trending",
        "rooms",
        "iconic",
        "mountains",
        "castles",
        "pools",
        "camping",
        "farms",
        "arctic",
        "deserts"
      )
      .required(),

    }).required()
})

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating:Joi.number().min(1).max(5).required(),
        comment:Joi.string().required(),
    }).required()
})
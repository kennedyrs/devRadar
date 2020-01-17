const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
  async index(req, res){
    // Buscar em um raio de 10km
    const { latitude, longitude, techs } = req.query

    const techsArray = parseStringAsArray(techs)
    // console.log(latitude)
    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    })

    // console.log(devs)
    return res.json(devs)

  }
}
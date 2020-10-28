const Dev = require('../models/Dev');
const parseStringAsArray = require('../Utils/parseStringAsArray');


module.exports = {
    async index(request, response){
        const {latitude,longitude,techs} = request.query;
        const techsArray = parseStringAsArray(techs);
        //Buscar todos os devs em um raio
        //filtrar por tecnologias
        const devs = await Dev.find({
            techs: {
                $in:techsArray,
            },
            location:{
                $near:{
                    $geometry :{
                        type:'Point',
                        coordinates:[longitude,latitude],

                    },
                    $maxDistance:10000,
                },
            },
        })

        return response.json({ devs })
    }

}
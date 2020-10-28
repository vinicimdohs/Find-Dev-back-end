const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../Utils/parseStringAsArray');
const { findConnections, sendMessage} = require ('../websocket');

//index,show,store,update,destroy
module.exports = {

    async Index(request,response){
       const devs = await Dev.find();
       
       return response.json(devs);
    },

    async store (request,response)  {
        const {github_username, techs,latitude,longitude} = (request.body);
    
        let dev = await Dev.findOne({github_username});
        
        if(!dev){
            const apiresponse = await axios.get(`https://api.github.com/users/${github_username}`);
        
            const {name = login,avatar_url,bio} = apiresponse.data;
        
            const techsArray = parseStringAsArray(techs);
            
            const location = {
                type:'Point',
                coordinates:[longitude,latitude],
            };
        
            const dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
        
            })

            //filtrar as conexões que estão a no máximo
            //10km de deistancia e que o novo dev
            //tenha pelo menos uma das tecnologias
            //filtradas

            const sendSocketMessageTo = findConnections(
                {latitude,longitude},
                techsArray,
                )
                sendMessage(sendSocketMessageTo,'new-dev',dev);

        }
        return response.json(dev);
    }

};
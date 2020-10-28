const{ Router }= require("express");

const DevController = require('./controllers/DevController')
const SerchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/devs',DevController.Index);
routes.post('/devs', DevController.store);
routes.get('/search',SerchController.index);
module.exports = routes;


//Métodos HTTP: get,post,put,delete

//tipos de parâmetros

//Querry Params: request.querry(Filtros,ordenação,paginação,...)
//Route Params: request.params(identificar um recurso na alteração ou remoção)
//Body: request.body(Dados para criação ou alteração de um registro)

//MongoDB(não-relacional)
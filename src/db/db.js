const mongoose = require('mongoose') //chamar de biblioteca MongoDB PARA CONTECAO

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    //useCreateIndex: true, //MongoParseError: option usecreateindex is not supported
    useUnifiedTopology: true

}).then(() => {
    console.log('Conectado')
}).catch((err) => {
    console.log(err)
})

module.exports = mongoose //importar

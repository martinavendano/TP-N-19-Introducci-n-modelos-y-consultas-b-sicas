const db = require('../database/models')
const sequelize = db.sequelize;

module.exports = {
    list: (req,res) => {
        db.Genres.findAll({
            include: [{
                all:true
            }]
        })
        .then(generos => {
            res.render('genresList',{genres:generos})
        })
        .catch(error => res.send(error))
    },
    detail: (req,res) => {
        db.Genres.findOne()
        .then(genero => {
            res.render('genresDetail',{genre:genero})
        })
        .catch(error => res.send(error))
    }
}
const db = require('../database/models')
const path = require('path')

module.exports = {
    list: (req,res) => {
        db.Actors.findAll({
            include: [{
                all:true
            }]
        })
        .then(actor => {
            res.render('actorsList',{actors:actor})
        })
    },
    detail: (req,res) => {
        db.Actors.findOne({
            where: {id:req.params.id}
        },{
            include: [{
                all:true
            }]
        })
        .then(actor => {
             res.render('actorsDetail',{actor})
        })
        .catch(error => res.send(error))
    },
    rating: (req,res) => {
        db.Actors.findAll({
            order: [['rating','DESC']],
            limit: 10
        },{
            include: [{
                all:true
            }]
        })
        .then(actors => {
            res.render('topActors',{actors})
        })
        .catch(error => res.send(error))
    }
}


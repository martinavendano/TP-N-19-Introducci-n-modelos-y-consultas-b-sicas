const db = require('../database/models')
const path = require('path')
const sequelize = db.sequelize;


module.exports = {
    list: (req,res) => {
        db.Movies.findAll({
            include: [{
                all:true
            }]
        })
        .then(peliculas => {
            res.render('moviesList',{movies:peliculas})
        })
        .catch(error => res.send(error))
    },
    detail: (req,res) => {
        db.Movies.findOne({
            where: {id:req.params.id},
            include: [{
                all:true
            }]
        })
        .then(pelicula => {
            res.render('moviesDetail',{movie:pelicula})
        })
        .catch(error => res.send(error))
    },
    new: (req,res) => {
        db.Movies.findAll({
            order: [['release_date','ASC']]
        },{
            include: [{
                all:true
            }]
        })
        .then(peliculas => {
            res.render('newestMovies',{movies:peliculas})
        })
        .catch(error => res.send(error))
    },
    recomended: (req,res) => {
        db.Movies.findAll({
            order:[['rating','DESC']],
            limit:5
        },{
            include: [{
                all:true
            }]            
        })
        .then(peliculas => {
            res.render('recommendedMovies',{movies:peliculas})
        })
        .catch(error => res.send(error))
    },
    detail: (req, res) => 
    {
        db.Movie.findByPk(req.params.id)
            .then(movie => res.render('moviesDetail', {movie}))
            .catch(err => console.log(err));
    },
    add: function (req, res) {

        const queryOps =
        {
            order: ['name']
        }

        db.Genre.findAll(queryOps)
        .then(genres => res.render('moviesAdd', {genres}))
        .catch(err => console.log(err));
    },
    create: function (req, res) {
        const {title, release_date, rating, awards, genre_id, length} = req.body;

        db.Movie.create
        ({
            ...req.body,
            title: title.trim(),
        })
            .then(movie => 
            {
                console.log(movie);
                return res.redirect('/movies/detail/' + movie.id)
            })
            .catch(err => console.log(err));
    },
    edit: function(req, res) {
        
        const queryOps =
        {
            order: ['name']
        }

        let genres = db.Genre.findAll(queryOps);
        let movie = db.Movie.findByPk(req.params.id);

        Promise.all([genres, movie])
        .then(([genres, movie]) => res.render('moviesEdit', {genres, movie, moment}))
        .catch(err => console.log(err));

    },
    update: function (req,res) {
        db.Movie.update(
            {
                ...req.body,
                title: req.body.title.trim()
            },
            {
                where: {id: req.params.id}
            }
        )
            .then(response =>res.redirect('/movies/detail/' + req.params.id))
            .catch(err => console.log(err));

    },
    delete: function (req, res) {
        db.Movie.findByPk(req.params.id)
            .then(movie => res.render('moviesDelete', { movie}))
            .catch(err => console.log(err));
    },
    destroy: function (req, res) {

        const queryOps = 
        {
            where: { id: req.params.id}
        };

        db.Movie.destroy(queryOps)
            .then(() => res.redirect('/movies'))
            .catch(err => console.log(err));
    }





    
}
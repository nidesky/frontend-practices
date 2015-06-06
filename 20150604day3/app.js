var express = require('express')
var path = require('path')
var port = process.env.PORT || 3000
var mongoose = require('mongoose')
var _ = require('underscore')
var app = express()
var Movie = require('./models/movie')

var bodyParser = require('body-parser');
var multer = require('multer'); 

mongoose.connect('mongodb://localhost/imooc')

app.set('views', './views/pages')
app.set('view engine', 'jade')
// app.use(express.bodyParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.locals.moment = require('moment')
app.listen(port)

console.log('imooc port' + port)

app.get('/', function(req, res) {
	Movie.fetch(function(err, movies) {
		if (err) {
			console.log(err)
		}

		res.render('index', {
			title: 'imooc 首页',
			movies: movies
		})
	})
})

app.get('/movie/:id', function(req, res) {
	var id = req.params.id

	Movie.findById(id, function(err, movie) {
		res.render('detail', {
			title: 'imooc 详情页' + movie.title,
			movie: movie
		})
	})

})

app.get('/admin/list', function(req, res) {
	Movie.fetch(function(err, movies) {
		if (err) {
			console.log(err)
		}

		res.render('list', {
			title: 'imooc后台列表页',
			movies: movies
		})
	})
})

app.post('/admin/movie/new', function(req, res) {

	var id = req.body.movie._id
	var movieObj = req.body.movie
	var _movie

	if (id !== 'undefined') {
		Movie.findById(id, function(err, movie) {
			if (err) {
				console.log(err)
			}

			_movie = _.extend(movie, movieObj)
			_movie.save(function(err, movie) {
				if (err) {
					console.log(err)
				}

				res.redirect('/movie/' + movie._id)
			})
		})
	} else {
		_movie = new Movie({
			doctor: movieObj.doctor,
			title: movieObj.title,
			poster: movieObj.poster,
			year: movieObj.year,
			summary: movieObj.summary
		})

		_movie.save(function(err, movie) {
			if (err) {
				console.log(err)
			}

			res.redirect('/movie/' + movie._id)
		})
	}

})

app.get('/admin/update/:id', function(req, res) {
	var id = req.params.id
	
	if (id) {
		Movie.findById(id, function(err, movie) {
			res.render('admin', {
				title: 'imooc 后台更新页面',
				movie: movie
			})
		})
	}
})

app.get('/admin/movie', function(req, res) {
	res.render('admin', {
		title: '这里是后台',
		movie: {
			title: '',
			doctor: '',
			year: '',
			poster: '',
			summary: ''
		}
	})
})

app.delete('/admin/list', function(req, res) {
	var id = req.query.id

	if (id) {
		Movie.remove({_id: id}, function(err, movie) {
			if (err) {
				console.log(err)
			} else {
				res.json({success: 1})
			}

		})
	}
})
var express = require('express')
var path = require('path')
var port = process.env.PORT || 3000
var app = express()

app.set('views', './views/pages')
app.set('view engine', 'jade')
// app.use(express.bodyParser())
app.use(express.static(path.join(__dirname, 'bower_components')))
app.listen(port)

console.log('imooc port' + port)

app.get('/', function(req, res) {
	res.render('index', {
		title: '这里是首页',
		movies: [
			{
				title: '龙门飞甲',
				_id: 1,
				poster: 'http://lorempixel.com/400/300/cats/'
			},
			{
				title: '龙门飞甲',
				_id: 2,
				poster: 'http://lorempixel.com/400/300/cats/'
			},
			{
				title: '龙门飞甲',
				_id: 3,
				poster: 'http://lorempixel.com/400/300/cats/'
			},
			{
				title: '龙门飞甲',
				_id: 4,
				poster: 'http://lorempixel.com/400/300/cats/'
			},
			{
				title: '龙门飞甲',
				_id: 5,
				poster: 'http://lorempixel.com/400/300/cats/'
			},

		]
	})
})

app.get('/movie/:id', function(req, res) {
	res.render('detail', {
		title: '这里是详情页',
		movie: {
			title: '龙门飞甲',
			doctor: '叮咚',
			year: 2014,
			poster: "http://lorempixel.com/400/300/cats/",
			summary: "Each of the generator properties (like name, address, and lorem) are called 'formatters'. A faker generator has many of them, packaged in 'providers'. Here is a list of the bundled formatters in the default locale"
		}
	})
})

app.get('/admin/list', function(req, res) {
	res.render('list', {
		title: '这里是列表页',
		movies: [
			{
				title: '龙门飞甲',
				_id: 3,
				poster: 'http://lorempixel.com/400/300/cats/',
				doctor: '小丁',
				year: 2014
			},
		]
	})
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
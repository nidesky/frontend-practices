function learn(something) {
	console.log(something)
}

function we(callback, sth) {
	sth += " is cool"
	callback(sth)
}

we(learn, "Nodejs")

we(function(sth) {
	console.log(sth)	
}, "Python")
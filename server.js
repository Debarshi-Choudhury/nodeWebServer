const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

var app=express();



//middleware
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');


app.use((req,res,next)=>{
	var now=new Date().toString();

	var log=`${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log+'\n',(err)=>{
		if(err){
			console.log('unable to append to server.log');
		}
	});
	next();
})

//maintenance middleware
app.use((req,res,next)=>{
	res.render('maintenance.hbs');
});

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(msg)=>{
	return msg.toUpperCase();
});

//handler for http get request

//root route
app.get('/',(req,res)=>{
	// res.send('<h1>Hello Express!</h1>');
	// res.send({
	// 	name:'Andrew',
	// 	likes:[
	// 		'Biking',
	// 		'Cities'
	// 	]
	// });
	res.render('home.hbs',{
		pageTitle:'Home Page',
		welcomeMessage:'Welcome to an amazing webpage'
	})
});


app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		pageTitle:'About Page'
	});
});

// /bad - send back json with errorMessage  property
app.get('/bad',(req,res)=>{
	res.send({
		errorMessage:'error handling request'
	});
});


app.listen(3000,()=>{
	console.log('Server is up on port 3000');
});

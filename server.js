var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist',['contactlist']);

var bodyParser = require('body-parser');

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());

app.get('/contactlist',function(req,res){
	db.contactlist.find(function(err,docs){
		res.json(docs);
	});
});

app.post('/contactlist',function(req,res){
	//console.log(req.body);
	db.contactlist.insert(req.body,function(err,docs){
		res.json(docs);
	});
});

app.get('/api',function(req,res){
	res.send('api running here');
});

app.delete('/contactlist/:id',function(req,res){
	var id  = req.params.id;
	//console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)},function(err,docs){
		res.json(docs);
	});
});

app.get('/contactlist/:id', function(req,res){
	var id = req.params.id;
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err,docs){
		res.json(docs);
	});
});

app.put('/contactlist/:id', function(req,res){
	var id = req.params.id;
	//console.log(req.body);
	db.contactlist.findAndModify({
		query:{	_id: mongojs.ObjectId(id)},
		update: {
			$set: {
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				phone_number: req.body.phone_number,
				profile_image: req.body.profile_image
			}
		},
		new:true
	},function(err,docs){
		res.json(docs);
	});

});


app.listen(3000);



console.log('Listening on port 3000');
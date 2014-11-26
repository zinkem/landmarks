var express = require('express')
  , mongodb = require('mongodb')
  , url = require('url');


//Landmark object that will get inserted into landmarks collection
// a landmark is a interesting site on the web
function Landmark(u, t, c){
		this.url = u;
		this.title = t;
		this.comments = c || '';
}


//express endpoints
var app = express();

app.get('/', function(req, res){
		app.landmarks.find().toArray(function(err, docs){
				
				var style = 'body { background: #ccc; }\n'+
						'.container { padding: 8px; background: #aaa; border-radius: 5; margin: 5px;}\n'+
						'.title { padding: 5px; background: #aaf; border-radius: 5;}\n'+
						'.comment { color: #ffa; }\n';

				res.write("<html><head><style>"+style+"</style></head><body>");

				for( i in docs ){
						res.write('<div class="container"><div class="title"><a href="'+docs[i].url+'">'+
											docs[i].title+'</a></div><div class="comment">'+
											docs[i].comments + '</div></div>');
				}

				res.end();
		});
});

app.get('/new', function(req, res){
		var form = 
				'<form action="/new" method="post" enctype="text/plain">'+
				'<div><label>url:</label><input type="text" name="url"/></div>'+
				'<div><label>title:</label><input type="text" name="title"/></div>'+
				'<div><label>comment:</label><input type="text" name="comment"/></div>'+
				'<div><input type="submit" value="Create Landmark"/></div></form>';

		res.write('<!DOCTYPE html5><html><body>'+form+'</body></html>');
		res.end();

});

app.post('/new', function(req, res){
		req.on('data', function(chunk){

				var fields = chunk.toString().split('\r\n');

				console.log(fields);

				var url = fields[0].split('=')[1];
				var title = fields[1].split('=')[1];
				title = title.replace(/\+/g,' ');

				var comment = fields[2].split('=')[1];
				comment = comment.replace(/\+/g,' ');

				var new_item = new Landmark(url, title, comment);

				app.landmarks.insert(new_item, function(err){
						res.redirect('/');
				});

		});
});


//connect to mongoDB and listen on port 8000
var mserv = new mongodb.Server('127.0.0.1', 27017);

new mongodb.Db('landmarksjs', mserv).open(function(err, client){
		if( err ) throw err;

		app.landmarks = client.collection('landmarks');

		app.listen(8000, function(){
				console.log('* listening on :3000');
		});

		console.log('* connected to mongodb');
});







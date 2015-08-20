var mongoose = require('mongoose');
var eventsSchema = new mongoose.Schema({
  name: 'String',
  date: 'Date',
  location: 'String',
  city: 'String',
  zip: 'String',
  lat: 'Number',
  long: 'Number',
  address: 'String',
  description: 'String',
  timestamp: 'Date',
  url: 'String'
});

var eventsModel = mongoose.model('event',eventsSchema);

 module.exports = function(app) {


  app.get('/api/',function(req,res) {
  	// res.send('Working');
  });

  app.get('/api/events', function(req,res) {
  	eventsModel.find({},function(err,docs) {
  		if(err) {
  			res.send({error:err});
  		}
  		else {
        // we only want to display the current events,
        // so we filter throught them and return
        // only the current ones
        var current = [];
        var today   = new Date();
        var tomorrow = today.setDate(today.getDate() - 1);

        docs.forEach(function(item){
          if(item.date >= tomorrow){
            // console.log('new');
            current.push(item);
          }
        });
        res.send({events:current});
        console.log('/api/events');
  		}
  	});
  });

  app.get('/api/events/:name', function(req, res){
    console.log(req.url);
    console.log('/api/events/event');
    eventsModel.findOne({name: req.params.name},function(err,docs) {
      if(err) {
  			res.send({error:err});
  		}
      else{
        res.send({event:docs});
        console.log(docs);
      }
    });
  });

  app.post('/api/events', function(req,res) {
    // console.log('posting');
    // console.log(req.body);

    var event = new eventsModel();

    event.name = req.body.event.name;
    event.date = req.body.event.date;
    event.location = req.body.event.location;
    event.city = req.body.event.city;
    event.zip = req.body.event.zip;
    event.lat = req.body.event.lat;
    event.long = req.body.event.long;
    event.address = req.body.event.address;
    event.description = req.body.event.description;
    event.timestamp = new Date();
    event.url = req.body.event.url;

    event.save(function(error) {
      if (error)
          res.send(error);
    });

  });
  // app.get('*', function(req, res) {
  //     res.sendfile('./public/index.html'); // load our public/index.html file
  // });
};

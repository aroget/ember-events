var mongoose = require('mongoose');
var eventsSchema = new mongoose.Schema({
  name: 'String',
  date: 'Date',
  city: 'String',
  zip: 'String',
  address: 'String',
  description: 'String',
  timestamp: 'Date',
  isPrivate: 'Boolean',
  type: 'String'
  // comments: []
  // commentTitle: 'String',
  // commentBody: 'String'
});


var eventsModel = mongoose.model('event',eventsSchema);

 module.exports = function(app) {

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
          // console.log(item);
          if(item.date >= tomorrow && item.isPrivate != true){
            current.push(item);
          }
        });
        res.send({events:current});
        // console.log('/api/events');
  		}
  	});
  });

  app.get('/api/events/:name', function(req, res){
    // console.log(req.url);
    // console.log('/api/events/event');
    eventsModel.findOne({name: req.params.name},function(err,docs) {
      if(err) {
  			res.send({error:err});
  		}
      else{
        res.send({event:docs});
        // console.log(docs);
      }
    });
  });

  app.post('/api/events', function(req,res) {

    var event = new eventsModel();
    event.name        = req.body.event.name;
    event.date        = req.body.event.date;
    event.city        = req.body.event.city;
    event.zip         = req.body.event.zip;
    event.address     = req.body.event.address;
    event.description = req.body.event.description;
    event.timestamp   = new Date();
    event.isPrivate   = req.body.event.isPrivate;
    event.type        = req.body.event.type;


    event.save(function(error) {
      if (error)
          res.send(error);
    });

  });

  app.put('/api/events/:id', function(req, res){
    console.log(req.body);
    var query = {'_id':req.params.id};
    var data = {
      name        : req.body.event.name,
      date        : req.body.event.date,
      city        : req.body.event.city,
      zip         : req.body.event.zip,
      address     : req.body.event.address,
      description : req.body.event.description,
      timestamp   : new Date(),
      isPrivate   : req.body.event.isPrivate,
      type        : req.body.event.type
    }

    eventsModel.update(query, { $set: data }, function(err, doc){
        if (err) return res.send(500, { error: err });
      })
  });


  app.get('*', function(req, res) {
      res.sendfile('../frontend/dist/index.html'); // load our public/index.html file
  });
};

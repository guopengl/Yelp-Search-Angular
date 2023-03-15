let request = require('request');
let url = require('url');
let cors = require('cors');
let express = require('express');
let app = express();

let key='';
let headers={
   'Authorization':'Bearer '+ key
};

app.use(cors());
app.use(express.static('./frontend/dist/frontend'));
app.listen(process.env.PORT||3000);


app.get('/',(req,res)=>{
   res.sendFile('index.html', {root:'./frontend/dist/frontend'});
});

app.get('/search',(req,res)=>{
   res.sendFile('index.html', {root:'./frontend/dist/frontend'});
});

app.get('/bookings',(req,res)=>{
   res.sendFile('index.html', {root:'./frontend/dist/frontend'});
});

app.get('/searchyelp',(req,res)=>{
   let queryUrl = url.parse(req.url,true).search; //looks like this: ?foo=bad&baz=foo
   let rawUrl='https://api.yelp.com/v3/businesses/search';
   let searchUrl = rawUrl + queryUrl + '&limit=10';

   request.get({
      url : searchUrl,
      json : true,
      headers : headers
      },(err,resp,body)=>{
         res.send(JSON.stringify(body));
   });
});

app.get('/detail',(req,res)=>{
   let id = url.parse(req.url,true).query.id; 
   let searchUrl = `https://api.yelp.com/v3/businesses/${id}`;

   request.get({
      url : searchUrl,
      json : true,
      headers : headers
      },(err,resp,body)=>{
         res.send(JSON.stringify(body));
   });
});

app.get('/reviews',(req,res)=>{
   let id = url.parse(req.url,true).query.id; 
   let searchUrl = `https://api.yelp.com/v3/businesses/${id}/reviews`;

   request.get({
      url : searchUrl,
      json : true,
      headers : headers
      },(err,resp,body)=>{
         res.send(JSON.stringify(body));
   });
});

app.get('/autocomplete',(req,res)=>{
   let queryUrl = url.parse(req.url,true).search; //?text=[KEYWORD]
   let searchUrl = 'https://api.yelp.com/v3/autocomplete'+ queryUrl;

   request.get({
      url : searchUrl,
      json : true,
      headers : headers
      },(err,resp,body)=>{
         res.send(JSON.stringify(body));
   });
});

app.get('/geocoding',(req,res)=>{
   let queryUrl = url.parse(req.url,true).search; //?address=[location]
   let searchUrl = 'https://maps.googleapis.com/maps/api/geocode/json' + queryUrl + '&key=';

   request.get({
      url : searchUrl,
      json : true,
      },(err,resp,body)=>{
         res.send(JSON.stringify(body));
   });
});



var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); 
var mongoose=require('mongoose');
var passport= require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');



app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
app.use(session({ secret: 'this is the secret'}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/MarvelDB';

mongoose.connect(connectionString);

/*app.get('/process',function(req,res){

  res.json(process.env);

});*/

  var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
  var port  = process.env.OPENSHIFT_NODEJS_PORT || 8080;


var server = app.listen(port,ip);

  


    var flights = [{ airways: "Cathay Pacific", from: "San Francisco", to: "Mumbai", Model: "B-747" },
                 { airways: "United Airlines", from: "Los Angeles", to: "Boston", Model: "B-737" },
                 { airways: "Lufthansa", from: "Dubai", to: "Munich", Model: "A-380" },
                 { airways: "Air India", from: "Mumbai", to: "Jakarta", Model: "B-747" },
                 { airways: "Emirates", from: "Kuwait", to: "Istanbul", Model: "B-747" },
                 { airways: "British Airways", from: "London", to: "Seattle", Model: "A-380" },
                 { airways: "Malaysian Airlines", from: "Kuala-Lampur", to: "Sydney", Model: "A-380" },
                 { airways: "Air Canada", from: "Toronto", to: "New York", Model: "A-757"}];


  var movies = [{genre:"Horror",name:"The Excorcist",rating:"97"},
                {genre:"Horror",name:"Hostel",rating:"56"},
                {genre:"Action",name:"Top Gun",rating:"85"},
                {genre:"Comedy",name:"Monty Python & The Holy Grail",rating:"88"}];


 
    app.use(express.static(__dirname + '/public/'));

    app.get('/flights', function (req, res) {
        res.json(flights);
    });

   

    app.get('/flights/:index', function (req, res) {
        var idx = req.params.index;
        res.json(flights[idx]);
    });

      app.put('/flight/:index', function (req, res) {
        var idx = req.params.index;
        var updatedFlight=req.body;
        flights[idx]=updatedFlight;
        res.json(flights);
    });

    app.delete("/flights/:id", function (req, res) {
        var index = req.params.id;
        flights.splice(index, 1);
        res.json(flights);
    });

    app.post("/flight", function (req, res) {
        var newFlight = req.body;
        flights.push(newFlight);
        res.json(flights);
    });

    console.log('Example app listening at http://%s:%s', ip, port)



    var UserSchema=mongoose.Schema({
            fname  :  String,
            lname  :  String,
            email  :  String,
            password :  String
            });

    var UserModel = mongoose.model('UserModel',UserSchema);

     var CartSchema=mongoose.Schema({
            userid: String,
            comicid: String,
            quantity: String,
            title:String,
            price:String,
            image:String
            },{collection:'cart'});

    var CartModel = mongoose.model('CartModel',CartSchema);

    var AboutSchema=mongoose.Schema({
            userid:String,
            firstname:String,
            lastname:String,
            image:String,
            des:String
            },{collection:'about'});

    var AboutModel = mongoose.model('AboutModel',AboutSchema);

 

      var FollowerSchema=mongoose.Schema({
            userid: String,
            followingid: String,
            },{collection:'followers'});

    var FollowerModel = mongoose.model('FollowerModel',FollowerSchema);

    app.get("/getImage/:userid", function (req, res) {
       AboutModel.findOne({userid:req.params.userid},function(err,record)
       {
          console.log("Record to check image:"+ record);
       
          if(record=="" || record==null)
          {
             res.send('0');
             
           }
           else
           {
            
            res.send(record);
           }

       });
       
    });



    app.post("/saveimage/:userid", function (req, res) {
       AboutModel.findOne({userid:req.params.userid},function(err,record)
       {
          console.log("Record to check image:"+ record);
       
          if(record=="" || record==null)
          {
             
              var aboutrow = new AboutModel(req.body);
              console.log(req.body);
              aboutrow.save();
              res.send('success');
           }
           else
           {
            
                record.image = req.body.image;
                record.des=req.body.des;
            record.save(function(err) {
              if (!err) {
                console.log("updated About");
                 
           }


              });
            }
        });
       
    });


     app.get("/checkfollower/:userid/following/:followingid", function (req, res) {
       FollowerModel.findOne({userid:req.params.userid,followingid:req.params.followingid},function(err,record)
       {
          console.log("Record to check follower:"+ record);
       
          if(record=="" || record==null)
          {
             res.send('0');
             
           }
           else if(record.userid==req.params.userid && record.followingid==req.params.followingid)
           {
            
            res.send('success');
           }

       });
       
    });

     app.delete("/removefollower/:userid/following/:followingid", function (req, res) {
       FollowerModel.findOne({userid:req.params.userid,followingid:req.params.followingid},function(err,record)
       {
          if(record=="" || record==null)
            {
                      console.log("No record found");
             
            }
            else
            { 
              
                       record.remove(function(err) {
                          if (!err) {
                            console.log("Follower Deleted");
                            res.send('success');
                           /*  FollowerModel.find({userid:req.params.userid,followingid:req.params.followingid},function(err,followers)
                       {
          
                          if(followers=="" || record==followers)
                           {
                             res.send(null);
                           }
                           else 
                           {
            
                             res.jsonp(followers);
                           }
            
                           });*/
                              } else {
                                console.log(err);
                                res.send('0');
                              }
                        });
                     
              }


       });

    });


      app.get("/getInfo/:_id",function(req,res)
         {
              UserModel.findOne({_id:req.params._id},function(err,user)
             {
        
          if(err)
          {
            console.log('error occured');
           
           }
           else
           {
              res.send(user);
           }


         });
    });

    app.get("/getAll",function(req,res)
         {
              UserModel.find({},function(err,user)
             {
        
          if(err)
          {
            console.log('0');
           
           }
           else
           {
              res.send(user);
           }


         });
    });

    app.get("/getfollowers/:followingid",function(req,res) {
       FollowerModel.find({followingid:req.params.followingid},function(err,record)
         {

                if(record=="" || record==null)
          {
             res.send('0');
             
           }
           else 
           {
            
            res.send(record);
           }
               

         });

         });

    


     app.get("/getfollowing/:userid",function(req,res) {
       FollowerModel.find({userid:req.params.userid},function(err,record)
         {

          if(record=="" || record==null)
          {
             res.send('0');
             
          }
          else 
          {
            
            res.send(record);
           }
               
         });

    });




     app.post("/addFollower/:userid/following/:followingid", function (req, res) {
       FollowerModel.findOne({userid:req.params.userid,followingid:req.params.followingid},function(err,record)
       {
          console.log("Record:"+ record);
       
          if(record=="" || record==null)
          {
             var follower = new FollowerModel(req.params);
             console.log(req.params);
             follower.save();
             res.send('success');
           }
           else 
           {
            
             res.send('0');
           }

       });
       
    });



     var PurchaseSchema=mongoose.Schema({
            userid: String,
            comicid: String,
            quantity: String,
            title:String,
            price:String,
            image:String,
            },{collection:'purchases'});

    var PurchaseModel = mongoose.model('PurchaseModel',PurchaseSchema);


    var ReviewSchema=mongoose.Schema({
            userid: String,
            comicid: String,
            name:String,
            review: String,
            image:String
            },{collection:'reviews'});

    var ReviewModel = mongoose.model('ReviewModel',ReviewSchema);


    app.post("/addReview/:userid/id/:comicid", function (req, res) {
       ReviewModel.findOne({userid:req.params.userid,comicid:req.params.comicid},function(err,record)
       {
          console.log("Record:"+ record);
       
          if(record=="" || record==null)
          {
             var review = new ReviewModel(req.body);
             console.log(req.body);
             review.save();
             res.send('success');
           }
           else if(record.userid==req.params.userid && record.comicid==req.params.comicid)
           {
            
             res.send('0');
           }

       });
       
    });

   


     app.get("/getReview/:comicid", function (req, res) {
             ReviewModel.find({comicid:req.params.comicid},function(err,record)
             {
              console.log("Record:"+ record);
              if(record=="" || record==null)
              {
                 res.send(null);
               }
               else 
               {
            
                 res.send(record);
               }

             });

    });

      app.get("/getComicsReviewed/:userid", function (req, res) {
             ReviewModel.find({userid:req.params.userid},function(err,record)
             {
              console.log("Record:"+ record);
              if(record=="" || record==null)
              {
                 res.send(null);
               }
               else 
               {
                 console.log("Sending comics reviewd");
                 res.send(record);
               }

             });

    });


     app.get("/getPurchases/:userid", function (req, res) {
             PurchaseModel.find({userid:req.params.userid},function(err,record)
             {
              console.log("Record:"+ record);
              if(record=="" || record==null)
              {
                 res.send(null);
               }
               else 
               {
                 console.log("Sending comics purchased");
                 res.send(record);
               }

             });

    });


    app.delete("/deleteReview/:_id/comic/:comicid" ,function(req,res){

        ReviewModel.findOne({_id:req.params._id},function(err,record)
       {
          console.log("Record To Delete:"+ record);
       
          if(record=="" || record==null)
          {
             console.log("No record to Delete exists");
           }
           else 
           {
            
                 record.remove(function(err) {
              if (!err) {
                console.log("Review Deleted");
                 ReviewModel.find({comicid:req.params.comicid},function(err,record)
           {
          
          if(record=="" || record==null)
           {
             res.send(null);
           }
           else 
           {
            
             res.jsonp(record);
           }
            
           });
              } else {
                console.log(err);
              }
            });

           }

       });
   

    });





   var MovieSchema = new mongoose.Schema({
    genre: String,
    name: String,
    rating: Number
}, {collection:'movie'});

  var MovieModel = mongoose.model('MovieModel',MovieSchema);

   var FavCharacterSchema = new mongoose.Schema({
    userid: String,
    charid:String,
    name:String,
    image:String
            },{collection:'favourites'});

  var FavCharacterModel = mongoose.model('FavCharacterModel',FavCharacterSchema);

  MovieModel.count(function (err, count) {
    if (!err && count==0) 
    {

      for(i=0;i<movies.length;i++)
      {
         var movie=new MovieModel(movies[i]);
         movie.save();

      }
        
    }
});
  

    app.get("/movie",function(req,res)
    {
        MovieModel.find(function(err,document)
        {
          
           res.jsonp(document);
          
        });
    });

     app.post("/signup", function (req, res) {
       
       var user1 = new UserModel(req.body);
       user1.save();
       res.send('success');
    });


     app.post("/findMovie/:genre", function (req, res) {
       MovieModel.find({genre:req.params.genre},function(err,document)
       {
          if(err)
          {
            console.log('error occured');
           }
           else
           {
             res.jsonp(document);
             console.log(document[0].genre);
           }

       });
       
    });

    app.post("/findMovie/:genre/name/:movie", function (req, res) {
        var re = new RegExp(req.params.movie);
       MovieModel.find({genre:req.params.genre,name:{$regex:re}},function(err,document)
       {
          if(err)
          {
            console.log('error occured');
           }
           else
           {
             res.jsonp(document);
             console.log(document);
           }

       });
       
    });


     app.post("/addFavoriteChars/:userid/name/:charid", function (req, res) {
       FavCharacterModel.findOne({userid:req.params.userid,charid:req.params.charid},function(err,record)
       {
          console.log("Record:"+ record);
          if(record=="" || record==null)
          {
             var newCharFav = new FavCharacterModel(req.body);
             console.log(req.body);
             newCharFav.save();
             res.send('Succesfully added to your favorite characters list!');
           }
           else if(record.userid==req.params.userid && record.charid==req.params.charid)
           {
            
             res.send('This Character is already in your favorites list!');
           }

       });
       
    });


    app.post("/addToCart/:userid/name/:comicid", function (req, res) {
       CartModel.findOne({userid:req.params.userid,comicid:req.params.comicid},function(err,record)
       {
          console.log("Record:"+ record);
       
          if(record=="" || record==null)
          {
             var newCartEntry = new CartModel(req.body);
             console.log(req.body);
             newCartEntry.save();
             res.send('success');
           }
           else if(record.userid==req.params.userid && record.comicid==req.params.comicid)
           {
            
             res.send('record exists');
           }

       });
       
    });


    app.get("/favchars/:userid",function(req,res){

     FavCharacterModel.find({userid:req.params.userid},function(err,record)
       {
          console.log("Record:"+ record);
          if(record=="" || record==null)
          {
             res.send(null);
           }
           else 
           {
            
             res.send(record);
           }

       });
       
    });

    app.get("/cartitems/:userid",function(req,res){

     CartModel.find({userid:req.params.userid},function(err,record)
       {
          console.log("Record:"+ record);
          if(record=="" || record==null)
          {
             console.log("Sending Null");
             res.send(null);
           }
           else 
           {
            
             res.send(record);

           }

       });
       
    });

    app.post("/purchase/:userid",function(req,res){
     CartModel.find({userid:req.params.userid},function(err,record)
       {
          console.log("Record:"+ record);
          if(record=="" || record==null)
          {
             
           }
           else 
           {
            
             for(i=0;i<record.length;i++)
                {
                   var purchases = new PurchaseModel(record[i]);
                   console.log(record[i]);
                   purchases.save();
                }

           }

       });

      CartModel.find({userid:req.params.userid},function(err,record)
       {
          console.log("Record:"+ record);
          if(record=="" || record==null)
          {
             res.send(null);
           }
           else 
           {
            
             for(i=0;i<record.length;i++)
                {
                  record[i].remove(function(err) {
              if (!err) {
                console.log("deleted");
                }
               
                
           else {
                console.log(err);
                
              }
              
            });
                }
                res.send('success');

            }

        });
 
    });

    app.put("/updateQuantity/:userid/id/:comicid/qty/:quantity",function(req,res)
    {
     CartModel.findOne({userid:req.params.userid,comicid:req.params.comicid},function(err,record)
       {
          console.log("Record:"+ record);
          if(record=="" || record==null)
          {
             
           }
           else 
           {
            record.quantity = req.params.quantity;
            record.save(function(err) {
              if (!err) {
                console.log("updated");
                 CartModel.find({userid:req.params.userid},function(err,record)
           {
           console.log(" Updated Record:"+ record);
          if(record=="" || record==null)
           {
             res.send(null);
           }
           else 
           {
            
             res.jsonp(record);
           }
            
           });
              } else {
                console.log(err);
              }
            });

            
            }
        });

          
       
    });

    app.delete("/removeComic/:userid/id/:comicid",function(req,res){

        CartModel.findOne({userid:req.params.userid,comicid:req.params.comicid},function(err,record)
       {
          console.log("Record:"+ record);
       
          if(record=="" || record==null)
          {
             console.log("No record exists");
           }
           else 
           {
            
                 record.remove(function(err) {
              if (!err) {
                console.log("updated");
                 CartModel.find({userid:req.params.userid},function(err,record)
           {
           console.log(" Updated Record:"+ record);
          if(record=="" || record==null)
           {
             res.send(null);
           }
           else 
           {
            
             res.jsonp(record);
           }
            
           });
              } else {
                console.log(err);
              }
            });

           }

       });
   

    });


     app.delete("/removeFavorite/:userid/id/:charid",function(req,res){

        FavCharacterModel.findOne({userid:req.params.userid,charid:req.params.charid},function(err,record)
       {
          console.log("Record:"+ record);
       
          if(record=="" || record==null)
          {
             console.log("No record exists");
           }
           else 
           {
            
                 record.remove(function(err) {
              if (!err) {
                console.log("Deleted");
                FavCharacterModel.find({userid:req.params.userid},function(err,record)
           {
          if(record=="" || record==null)
           {
             res.send(null);
           }
           else 
           {
            
             res.jsonp(record);
           }
            
           });
              } else {
                console.log(err);
              }
            });

           }

       });
   

    });





    passport.serializeUser(function(user,done){
        done(null,user);
    });

    passport.deserializeUser(function(user,done){
        done(null,user);
    });

    passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
      },
     function(email,password,done){
      UserModel.findOne({email:email},function(err,user)
       {
          console.log('aunthenticating');
          if(err)
          {
            console.log('error occured');
            return done(null,false,{message:'Unable to Login'});
           }
           else if(user==null || user=="")
            {
                user=null
              return done(null,user);
            }
           else
           {
           console.log(user);
            if(password==user.password)
              return done(null,user);
           else
              {
              user=null
              return done(null,user);
              }
           }
          

       });

       }));

    

     app.post("/login",passport.authenticate('local'), function (req, res) {
     
       var user = req.user
       console.log(user);
       res.send(user);
       
    });

     app.post("/logout",function(req,res){

          req.logout();
          res.send(200);

     });

     app.get("/loggedin",function(req,res)
     {
          res.send(req.isAuthenticated() ? req.user : '0');

     });

    var auth = function(req,res,next)
    {
         if(!req.isAuthenticated())
               res.send(401);
         else
               next();

    };

     app.get("/rest/users",auth,function(req,res){
        res.json(flights);
     });


    app.put("/updatemovie", function (req, res) {
       MovieModel.findById(req.body._id,function(err,document)
       {
            document.genre = req.body.genre;
            document.name = req.body.name;
            document.rating = req.body.rating;
            return document.save(function(err) {
              if (!err) {
                console.log("updated");
              } else {
                console.log(err);
              }
              return res.send(document);
    });
  });
});



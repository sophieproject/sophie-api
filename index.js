

/*
    This API is designed to help other bots help take down pedophiles with our database.
    We provide this service for FREE with a time cap to prevent abuse of the API.
    We do this so if someone wants to use the FREE API to brute-force all entries it will be denied.
    Abuse of this API on our own servers can result in a direct IP BAN as well as a SUSPICIOUS flag inside Pedophile DB.
    IF YOU PLAN TO USE THIS API FOR CONTINUOUS REQUESTS PLEASE CONTACT US!!! */

/* ####################
   #   REQUIREMENTS   #
   #################### */

   var RateLimit = require('express-rate-limit');
   var http = require("http");
   var express = require('express');
   var app = express();
   var mysql      = require('mysql');
   var bodyParser = require('body-parser');
   var cors = require('cors');

   require("dotenv").config();

/* #######################
  # END OF REQUIREMENTS #
  ####################### */

/* ###################
  #  CONFIGURATION  #
  ################### */
  // Change these values in the .env file for security
  // If you aren't going to publically post this code then replace the process.env.object with the configuration option
  const SQLPassword = process.env.SQLPassword;
  const SQLHost= process.env.SQLHost;
  const SQLUser = process.env.SQLUser;
  const SQLDatabase = process.env.SQLDatabase;

/* #########################
  #  END OF CONFIGURATION #
  ######################### */
  var db = mysql.createConnection({ // Create and Establish the connection
    host: SQLHost,
    user: SQLUser,
    password: SQLPassword,
    database: SQLDatabase
  });
  

  var apiLimiterSeconds = new RateLimit({
	windowMs: 1, // 1 second
	max: 5,
	delayMs: 0 // disabled 
  });
  // only apply to requests that begin with /api/ 
app.use('/api/', apiLimiterSeconds);
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
extended: true
}));
app.use(cors({origin: 'http://localhost'}));
var server = app.listen(8080, "127.0.0.1", function () {

    var host = server.address().address
    var port = server.address().port
  
    console.log("API Active on http://%s:%s", host, port)
  
  });
  //rest api to get a single entry
app.get('/api/pedodb/:username', function (req, res) {
    try {
    db.query("SELECT Verified, Pedophile, Suspicious, Points FROM users WHERE Username = ?", [req.params.username], function (error, results) {
       if (error){
		   //res.end(error)
		   console.log(error)
	   }
	   console.log(JSON.stringify(results))
	   if (JSON.stringify(results) == "[]") {
		   res.end(`{"Error": "404", "Message": "This user is not in PedoDB", "Request": "${req.params.username} "Footer": "0"}`)
	   } else {
		res.end(JSON.stringify(results)); 
	   }
     }); 
    } catch(e) {
         res.end(e)
     }
 });
 app.get('/api/ai/:string', function (req, res) {
	const body = {
		text: string,
	}

	fetch("http://localhost:5005/model/parse", {
		method: "post",
		body: JSON.stringify(body),
		headers: { "Content-Type": "application/json" }
	  })
	  .then(res => res.json()) //res.json()
	  .then(json => {
		  const result = json
		  console.log(result.intent)
		  // (name) with extension confidence, discard the ID
		})
	  .catch(err => console.log(err))
 });
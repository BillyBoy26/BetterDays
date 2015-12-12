/**
 * Created by Denis on 12/12/2015.
 */
//Define MySQL parameter in Config.js file.
var mysql             =     require('mysql');
var configFB          =     require('../configuration/configFB');
var passport          =     require('passport');
var FacebookStrategy  =     require('passport-facebook').Strategy;

var connection = mysql.createConnection({
    host     : configFB.host,
    user     : configFB.username,
    password : configFB.password,
    database : configFB.database
});
//Connect to Database only if Config.js parameter is set.
if(configFB.use_database==='true')
{
    connection.connect();
}

// Passport session setup.
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

// Use the FacebookStrategy within Passport.
passport.use(new FacebookStrategy({
        clientID: configFB.facebook_api_key,
        clientSecret:configFB.facebook_api_secret ,
        callbackURL: configFB.callback_url
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            //Check whether the User exists or not using profile.id
            if(configFB.use_database==='true')
            {
//      connection.query("SELECT * from T_USER-USR where user_id="+profile.id,function(err,rows,fields){
//        if(err) throw err;
//        if(rows.length===0)
//          {
//            console.log("There is no such user, adding now");
//            connection.query("INSERT into user_info(user_id,user_name) VALUES('"+profile.id+"','"+profile.username+"')");
//          }
//          else
//            {
//              console.log("User already exists in database");
//            }
//          });
            }
            return done(null, profile);
        });
    }
));

module.exports= passport;
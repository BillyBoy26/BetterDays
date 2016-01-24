/**
 * Created by Denis on 12/12/2015.
 */
//Define MySQL parameter in Config.js file.
var configFB          =     require('../configuration/configFB');
var postgres = require('./connexionPostgres');
var passport          =     require('passport');
var FacebookStrategy  =     require('passport-facebook').Strategy;

// Passport session setup.
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

postgres.connect();

// Use the FacebookStrategy within Passport.
passport.use(new FacebookStrategy({
        clientID: configFB.facebook_api_key,
        clientSecret:configFB.facebook_api_secret ,
        callbackURL: configFB.callback_url
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            //Check whether the User exists or not using profile.id
            postgres.query("SELECT * from bd_user.t_user_usr where usr_id="+profile.id,function(err,rows,fields){
                if(err) throw err;
                if(rows.rowCount===0)
                {
                    console.log("There is no such user, adding now");
                    postgres.query("INSERT into bd_user.t_user_usr(usr_id,usr_name, usr_firstname) VALUES('"+profile.id+"','"+profile.name.familyName+"','"+profile.name.givenName+"')");
                }
                else
                {
                    console.log("User already exists in database");
                }
            });
            return done(null, profile);
        });
    }
));

module.exports= passport;
var express           =     require('express')
  , session           =     require('express-session')
  , cookieParser      =     require('cookie-parser')
  , bodyParser        =     require('body-parser')
    ,connexionFB = require('./BD-modules/connexionFB.js')
    , app               =     express();


app.set('views','./views');
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', key: 'sid'}));
app.use(connexionFB.initialize());
app.use(connexionFB.session());
app.use(express.static('./public'));

//Router code
app.get('/', function(req, res){
  res.render('accueil', { user: req.user });
});
app.get('/giving', ensureAuthenticated, function(req, res){
  res.render('giving', { user: req.user });
});


//Passport Router
app.get('/auth/facebook', connexionFB.authenticate('facebook'));
app.get('/auth/facebook/callback',
    connexionFB.authenticate('facebook', {
       successRedirect : '/',
       failureRedirect: '/login'
  }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}
app.listen(3000);
var express = require('express');
var router = express.Router();
var request = require('superagent')

/* GET home page. */

router.get('/', function(req, res, next) {
  res.redirect('/home')
});

router.get('/home', function(req, res, next) {
  res.render('index', { name: 'eatMe' });
});

router.post('/', function(req, res, err){
  if (!req.body.ingredients) {
    res.redirect('/noresult')
    // return
  } else {
  console.log(req.body)
  res.redirect('/results/'+req.body.ingredients);
  }
});

router.get('/noresult', function(req, res, next){
  res.render('noresult', { name: 'eatMe' })
})

router.get('/results/:q', function(req, res, next) {
  request
     .get('http://food2fork.com/api/search?key=e786b3d4669b2bbe700a070fa90f15f8&q='+ req.params.q)
     .end(function(err, result){
        if (err) {
          console.error(err)
          return
        } else {
          // console.log(JSON.parse(result.text))
          var recipes = JSON.parse(result.text)
          var i = Math.ceil(Math.random()*10)
          res.render('results',recipes.recipes[i]);
          return
      // console.log(typeof recipes, recipes)
      // console.log('this is an', typeof recipes)
      }
  });
    // console.log('recipes', recipes)

});

module.exports = router;


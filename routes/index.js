var express = require('express');
var router = express.Router();
var request = require('superagent')

/* GET home page. */

router.get('/', function(req, res, next) {
  res.redirect('/home')
});

router.get('/home', function(req, res, next) {
  res.render('index', { name: 'EATME' });
});

router.get('/results', function(req, res) {
  request
     .get('http://food2fork.com/api/search?key=e786b3d4669b2bbe700a070fa90f15f8&q=beans')
     .end(function(err, result){
        if (err) {
          console.error(err)
          return
        } else {
          // console.log(JSON.parse(result.text))
          var recipes = JSON.parse(result.text)
          res.render('results',recipes.recipes[2]);
          return
      // console.log(typeof recipes, recipes)
      // console.log('this is an', typeof recipes)
      }
  });
    // console.log('recipes', recipes)

});

module.exports = router;


const rater = require('rater-js');
var myRating = raterJs( {
    element:document.querySelector("#rater"),
    rateCallback:function rateCallback(rating, done) {
      this.setRating(rating); 
      done(); 
    },
    max: 5,

    // star size
    starSize: 16,
});
myRating.enable();
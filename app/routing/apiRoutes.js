var friends = require("../data/friends");


module.exports = function(app){

  app.get("/api/friends", function(req, res){
    res.json(friends);
  });

  app.post("/api/friends", function(req, res){
    var newUser = req.body;
    var newUserScoreArr = [];
    var diffArr = [];

    for (var i = 0; i < friends.length; i++) {
      var compareFriend = friends[i];
      var totalDiff = 0;

      for (var j = 0; j < compareFriend.scores.length; j++) {
        var diffScore = Math.abs(compareFriend.scores[j] - newUser.scores[j]);
        totalDiff += diffScore;
      }
      diffArr[i] = totalDiff;
    }

    var bestFriend = diffArr[0];
    var bestFriendIndex = 0;

    for (var k = 0; k < diffArr.length; k++) {
      if (diffArr[k] < bestFriend){
        bestFriend = diffArr[k];
        bestFriendIndex = 1;
      }
    }

    friends.push(req.body);
    res.json(friends[bestFriendIndex]);

  });
};

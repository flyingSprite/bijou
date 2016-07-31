angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('apHttp', ['$http', function ($http){
    $http.defaults.useXDomain = true;
    // var serverUrl = 'http://' + config.serverHost + '/solutions';
    var serverUrl = 'http://localhost:8080/solutions';
    // return function (config){
    //   if(config.method.toUpperCase() == 'POST' || config.method.toUpperCase() == 'PUT') {
    //     return $http({
    //       url: serverUrl + config.url,
    //       method: config.method.toUpperCase(),
    //       headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //       },
    //       transformRequest : function(data){
    //         if (data === undefined) {
    //           return data;
    //         }
    //         return $.param(data);
    //       },
    //       data: config.data
    //     });
    //   } else if (config.method.toUpperCase() == 'GET') {
    //     return $http({
    //       url: serverUrl + config.url,
    //       method: 'GET',
    //       data: config.data
    //     });
    //   }
    // };
    return function(config) {
      return $http({
        url: serverUrl + config.url,
        method: 'GET',
        data: config.data
      });
    }
  }])
.service('api', ['apHttp', function (apHttp) {

  this.hotnews = function(success, error) {
    apHttp({method: 'GET', url: '/hotnews'})
    .success(function(hotnews) {
      hotnews && success && success(hotnews);
    })
    .error(function(err) {
      err && error && error(err);
    });
  };
}]);

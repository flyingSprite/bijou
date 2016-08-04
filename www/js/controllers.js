angular.module('starter.controllers', [])

.controller('DashCtrl', ['$scope', '$ionicLoading', 'api', function($scope, $ionicLoading, api) {
  $scope.websites = {};

  $scope.openLink = function(link) {
    window.open(link, '_blank', 'location=yes');
  };

  console.log($ionicLoading);

  $scope.showLoading = function() {
    $ionicLoading.show().then(function() {
      // This can so something when todo load.
      console.log('The loading indicator is now displayed.');
    });
  };

  $scope.hideLoading = function() {
    $ionicLoading.hide().then(function() {
      // This can so something when done load.
      console.log('The loading done.');
    });
  };

  $scope.doRefresh = function(name) {
    $scope.showLoading();
    api.hotnews().success(function(hotnews) {
      if (hotnews) {
        setHotnewsByWebsite(hotnews, name);
      }
      $scope.hideLoading();
    }).finally(function() {
      $scope.$broadcast(name);
    });
  };

  $scope.showLoading();
  api.hotnews().success(function(hotnews) {
    if (hotnews) {
      setHotnewsByWebsite(hotnews);
    }
    $scope.hideLoading();
  });

  // api.hotnews(function(hotnews){
  //   setHotnewsByWebsite(hotnews);
  // });

  function setHotnewsByWebsite(hotnews) {
    for (var website in $scope.websites) {
      if (angular.isArray($scope.websites[website])) {
        $scope.websites[website].length = 0;
      }
    }
    angular.forEach(hotnews, function(news) {
      var website = $scope.websites[news.website];
      if (website) {
        website.push(news);
      } else {
        $scope.websites[news.website] = [];
        $scope.websites[news.website].push(news);
      }
    });
  }

}])

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true,
    firstName: '',
    lastName: ''
  };

  $scope.submitForm = function() {
    console.log($scope.settings);
  };
});

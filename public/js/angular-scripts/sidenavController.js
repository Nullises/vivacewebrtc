mainModule.controller('sidenavController', function($scope, $mdSidenav){

 $scope.openLeftMenu = function() {
   $mdSidenav('left').toggle();
 };

});

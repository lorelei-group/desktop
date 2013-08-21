angular.module('lorelei-desktop-desktop', [
	'firebase'
])

.constant('APPS_URL', 'https://lorelei.firebaseio.com/desktop/apps/')

.factory('appsCollection', function(angularFireCollection, APPS_URL) {
	return angularFireCollection(APPS_URL);
})

.controller('DesktopCtrl', function($scope, appsCollection) {
	$scope.apps = appsCollection;
})

.controller('AddAppCtrl', function($scope, $location, appsCollection) {
	$scope.save = function(app) {
		appsCollection.add(app);
		$location.path('/desktop');
	};
})

.controller('EditAppCtrl', function($scope, $routeParams, $location, angularFire, APPS_URL) {
	angularFire(APPS_URL + $routeParams.id, $scope, 'app', {});

	$scope.save = function(app) {
		$location.path('/desktop');
	};
})

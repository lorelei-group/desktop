angular.module('lorelei-desktop', [
	'remoteStorage'
])

.config(function($routeProvider) {
	//$locationProvider.html5Mode(true);
	$routeProvider

		.when('/desktop', {
			templateUrl: 'app/desktop.html',
			controller: 'DesktopCtrl'
		})

		.when('/desktop/add-app', {
			templateUrl: 'app/edit-app.html',
			controller: 'AddAppCtrl'
		})

		.when('/desktop/edit-app/:id', {
			templateUrl: 'app/edit-app.html',
			controller: 'EditAppCtrl'
		})

		.otherwise({redirectTo: '/desktop' });
})

.factory('appsCollection', function(rsCollection) {
	return rsCollection('apps');
})

.directive('app', function() {
	return {
		restrict: 'EA',
		templateUrl: 'app/app.html'
	}
})

.controller('MasterCtrl', function($scope) {
	$scope.loaded = true;
})

.controller('DesktopCtrl', function($scope, appsCollection) {
	$scope.apps = appsCollection;
	var i = setInterval(function() {
		if (appsCollection.length) {
			clearInterval(i);
			console.log(appsCollection);
			console.log(appsCollection.map(function(a) {return a.id }));
		}
	}, 1000);
})

.controller('AddAppCtrl', function($scope, $location, appsCollection) {
	$scope.save = function(app) {
		appsCollection.add(app);
		$location.path('/desktop');
	};
})

.controller('EditAppCtrl', function($scope, $routeParams, $location, rsBind) {
	var save = rsBind('apps', $routeParams.id, $scope, 'app', {});

	$scope.save = function(app) {
		save();
		$location.path('/desktop');
	};
})

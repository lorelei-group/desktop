angular.module('lorelei-desktop')

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

.controller('MasterCtrl', function($scope) {
	$scope.loaded = true;
})

.controller('DesktopCtrl', function($scope, appsCollection) {
	$scope.apps = appsCollection;
})


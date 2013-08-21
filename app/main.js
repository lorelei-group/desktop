angular.module('lorelei-desktop', [
	'lorelei-desktop-desktop'
])

.config(function($routeProvider) {
	//$locationProvider.html5Mode(true);
	$routeProvider

		.when('/desktop', {
			templateUrl: 'app/desktop/desktop.html',
			controller: 'DesktopCtrl'
		})

		.when('/desktop/add-app', {
			templateUrl: 'app/desktop/edit-app.html',
			controller: 'AddAppCtrl'
		})

		.when('/desktop/edit-app/:id', {
			templateUrl: 'app/desktop/edit-app.html',
			controller: 'EditAppCtrl'
		})

		.otherwise({redirectTo: '/desktop' });
})


.controller('MasterCtrl', function($scope) {
	$scope.loaded = true;
})

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
			templateUrl: 'app/desktop/add-app.html',
			controller: 'DesktopCtrl'
		})

		.otherwise({redirectTo: '/desktop' });
})


.controller('MasterCtrl', function($scope) {
	$scope.loaded = true;
})


.controller('SidebarCtrl', function($scope) {
})


.controller('HeaderCtrl', function($scope) {
})


.controller('FooterCtrl', function($scope) {
});

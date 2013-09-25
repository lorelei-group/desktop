angular.module('lorelei-desktop', [
	'remoteStorage',
	'google',
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
})

.controller('AddAppCtrl', function($scope, $location, googleSearch, appsCollection) {
	$scope.$watch('app.name', function() {
		if (!$scope.app || !$scope.app.name)
			return;

		$scope.iconsProposal = null;
		googleSearch.image($scope.app.name, function(results) {
			$scope.$apply(function() {
				$scope.iconsProposal = results;
			});
		});
	});

	$scope.save = function(app) {
		appsCollection.add(app);
		$location.path('/desktop');
	};
})

.controller('EditAppCtrl', function($scope, $routeParams, $location, googleSearch, rsBind) {
	var save = rsBind('apps', $routeParams.id, $scope, 'app', {});

	$scope.$watch('app.name', function() {
		if (!$scope.app || !$scope.app.name)
			return;

		$scope.iconsProposal = null;
		googleSearch.image($scope.app.name).then(function(results) {
			$scope.iconsProposal = results;
		});
	});

	$scope.save = function(app) {
		$scope.app.order = parseInt($scope.app.order, 10);
		save();
		$location.path('/desktop');
	};
})

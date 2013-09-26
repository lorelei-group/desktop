angular.module('lorelei-desktop')

.factory('appAutocompletionHelper', function(googleSearch) {
	return function($scope) {
		$scope.$watch('app.name', function() {
			$scope.autocompletion = {};

			if (!$scope.app || !$scope.app.name)
				return;

			googleSearch.web($scope.app.name, function(results) {
				$scope.$apply(function() {
					$scope.autocompletion.webs = results;
				});
			});
			googleSearch.image($scope.app.name, function(results) {
				$scope.$apply(function() {
					$scope.autocompletion.icons = results;
				});
			});
		});
	};
})

.controller('AddAppCtrl', function($scope, $location, appAutocompletionHelper, appsCollection) {
	appAutocompletionHelper($scope);

	$scope.save = function(app) {
		appsCollection.add(app);
		$location.path('/desktop');
	};
})

.controller('EditAppCtrl', function($scope, $routeParams, $location, appAutocompletionHelper, rsBind) {
	var save = rsBind('apps', $routeParams.id, $scope, 'app', {});
	appAutocompletionHelper($scope);

	$scope.save = function(app) {
		$scope.app.order = parseInt($scope.app.order, 10);
		save();
		$location.path('/desktop');
	};
})

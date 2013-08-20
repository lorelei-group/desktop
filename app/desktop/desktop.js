angular.module('lorelei-desktop-desktop', [
	'firebase'
])

.controller('DesktopCtrl', function($scope, angularFireCollection) {
	var apps = angularFireCollection('https://lorelei.firebaseio.com/desktop/apps/');
	$scope.apps = apps;

	$scope.save = function(app) {
		apps.add(app);
		document.location.hash = '/desktop';
	};
})

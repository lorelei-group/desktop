angular.module('lorelei-ui-modal', [])

.value('modalTpl',
	'<div class="overlay"></div>' +
	'<div class="content" ng-transclude></div>' +
	'<div class="close-btn" ng-click="close()"></div>'
)

.directive('loModal', function(modalTpl) {
	return {
		restrict: 'AE',
		template: modalTpl,
		transclude: true,

		scope: {
			onClose: '&',
		},

		link: function(scope, iElement) {
			scope.close = function() {
				iElement.remove();
				scope.onClose();
			};
		}
	};
});

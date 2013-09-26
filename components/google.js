angular.module('google', [])

.factory('googleSearch', function($q) {

	return {
		web: function(term, callback) {
			var engine = new google.search.WebSearch();

			engine.setResultSetSize(8);
			engine.setSearchCompleteCallback(null, function() {
				callback(engine.results || null);
			});

			engine.execute(term);
		},

		image: function (term, callback) {
			var engine = new google.search.ImageSearch();

			engine.setResultSetSize(8);

			engine.setRestriction(
				google.search.ImageSearch.RESTRICT_IMAGETYPE,
				google.search.ImageSearch.IMAGETYPE_CLIPART
			);

			engine.setSearchCompleteCallback(null, function() {
				console.log(engine.results);
				callback(engine.results || null);
			});

			engine.execute(term);
		},
	};
})

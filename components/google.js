angular.module('google', [])

.factory('googleSearch', function($q) {
	var search = {
		image: function(term, callback) {
			console.log('Executing search');
			//var deferred = $q.defer();
			var engine = new google.search.ImageSearch();

			engine.setSearchCompleteCallback(null, function() {
				console.log('RESPONSE');
				if (!engine.results || !engine.results.length)
					return deferred.reject('Pollas');

				console.log('RESULTS', engine.results);
				callback(engine.results);
				//deferred.resolve(engine.results);
			});

			engine.execute(term);
			//return deferred.promise;
		}
	};

	return search;
})

angular.module('remoteStorage', [])

.value('remoteStorage', remoteStorage)

.factory('guid', function() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}
	return function guid() {
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	};
})

.factory("rsCollection", function($timeout, guid) {

	function find(array, iterator, scope) {
		var value = null;
		array.some(function(item) {
			if (iterator.call(scope, item)) {
				value = item;
				return true;
			}
		});
		return value;
	}

	function findIndex(array, iterator, scope) {
		var value = -1;
		array.some(function(item, index) {
			if (iterator.call(scope, item)) {
				value = index;
				return true;
			}
		});
		return value;
	}


	return function(moduleName) {
		var itemName = guid();
		var collection = [];

		RemoteStorage.defineModule(moduleName, function(privateClient, publicClient) {

			function add(data) {
				data.id = guid();
				return save(data);
			}

			function remove(dataOrId) {
				var id = typeof dataOrId === 'string' ? dataOrId : dataOrId.id;
				return privateClient.remove(id);
			}

			function save(data) {
				return privateClient.storeObject(itemName, data.id, data);
			}

			function list() {
				return privateClient.getAll('');
			}

			function init() {
				privateClient.cache('', true);
			}

			return {
				exports: {
					on: privateClient.on,
					init: init,
					list: list,
					add: add,
					save: save,
					remove: remove,
				}
			};
		});

		remoteStorage.access.claim(moduleName, 'rw');
		remoteStorage.displayWidget();
		var source = remoteStorage[moduleName];
		source.init();

		collection.getById = function(id) {
			return find(collection, function(item) {
				return item.id === id;
			});
		};

		collection.getIndexById = function(id) {
			return findIndex(collection, function(item) {
				return item.id === id;
			});
		};

		collection.add = function(data) {
			return source.add(data);
		};

		collection.remove = function(data) {
			return source.remove(data);
		};

		collection.update = function(data) {
			return source.save(data);
		};

		source.on('change', function(event) {
			$timeout(function() {
				var id = event.relativePath;
				var index = collection.getIndexById(id);

				// add
				//if(event.newValue && !event.oldValue)
				if (index === -1)
					return collection.push(event.newValue);

				// remove
				if (!event.newValue)
					return collection.splice(index, 1);

				collection.splice(index, 1, event.newValue);
			});
		});

		source.list();

		remoteStorage.on('features-loaded', function(){
			remoteStorage.on('disconnect', function() {
				collection.length = 0;
			});
		});

		return collection;
	}
});

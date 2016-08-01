listApp.factory('restfunctions', function($http, $rootScope){
	
	function factoryposttest(paras, callback) {
		$http({
			url: baseurl + 'User/factoryposttest',
			method: "POST",
			data: paras
		}).success(function (data, status, headers, config) {
            callback(data); 
        });
    }
	
	function getdatasforselect(paras, callback) {
		$http({
			url: baseurl + 'Crud/getdatasforselect',
			method: "POST",
			data: paras
		}).success(function (data, status, headers, config) {
            callback(data); 
        });
    }
			
	return {
		factoryposttest : factoryposttest,
		getdatasforselect : getdatasforselect
	};
});
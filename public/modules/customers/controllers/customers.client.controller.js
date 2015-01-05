'use strict';

// Customers controller
var CustomersApp = angular.module('customers');

CustomersApp.controller('CustomersController', ['$scope', '$stateParams','Authentication', 'Customers','$modal', '$log',
	function($scope, $stateParams, Authentication, Customers, $modal, $log) {

		this.authentication = Authentication;

		// Find a list of Customers
		this.customers = Customers.query();

		//open a modal window to create a customer
		this.modalCreate = function (size) {

		    var modalInstance = $modal.open({
		      templateUrl: 'modules/customers/views/create-customer.client.view.html',
		      controller: function ($scope, $modalInstance) {

	  				  $scope.ok = function (isValid) {
	  				  	if(isValid){
					    	$modalInstance.close();
						}
					  };

					  $scope.cancel = function () {
					    $modalInstance.dismiss('cancel');
					  };
		      },
		      size: size
		    });

		    modalInstance.result.then(function (selectedItem) {
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
		    });
		  };


 		//open a modal window to update a customer
		this.modalUpdate = function (size, selectedCustomer) {

		    var modalInstance = $modal.open({
		      templateUrl: 'modules/customers/views/edit-customer.client.view.html',
		      controller: function ($scope, $modalInstance, customer) {
		      		$scope.customer = customer;

	  				  $scope.ok = function (isValid) {
	  				  	if(isValid){
					    	$modalInstance.close($scope.customer);
						}
					  };

					  $scope.cancel = function () {
					    $modalInstance.dismiss('cancel');
					  };
		      },
		      size: size,
		      resolve: {
		        customer: function () {
		          return selectedCustomer;
		        }
		      }
		    });

		    modalInstance.result.then(function (selectedItem) {
		      $scope.selected = selectedItem;
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
		    });
		  };

		// Remove existing Customer
		this.remove = function(customer) {
			if ( customer ) { 
				customer.$remove();

				for (var i in this.customers) {
					if (this.customers [i] === customer) {
						this.customers.splice(i, 1);
					}
				}
			} else {
				this.customer.$remove(function() {					
				});
			}
		};
	}

]);

CustomersApp.controller('CustomersCreateController', ['$scope', 'Customers','Notify',
	function($scope, Customers,Notify) {
		// Create new Customer
		this.create = function() {
			// Create new Customer object
			var customer = new Customers ({
				firstname: this.firstname,
				surname: this.surname,
				suburb: this.suburb,
				country: this.country,
				industry: this.industry,
				email: this.email,
				phone: this.phone,
				referred: this.referred,
				channel: this.channel
			});

			// Redirect after save
			customer.$save(function(response) {
				Notify.sendMsg('NewCustomer',{'id':response._id});
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

	}
]);

CustomersApp.controller('CustomersEditController', ['$scope','Customers',
	function($scope, Customers) {

		$scope.channelOptions = [
	      {id: 1, item:'linkedin'},
	      {id: 2, item:'twitter'},
	      {id: 3, item:'github'}
	    ];
		// Update existing Customer
		this.update = function(Updatedcustomer) {
			var customer = Updatedcustomer;

			customer.$update(function() {
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);

CustomersApp.directive('customerList', ['Customers','Notify',function(Customers,Notify) {
  return {
  	restrict: 'E',
  	transclude: true,
    templateUrl: 'modules/customers/views/customer-list-template.html',
    link: function(scope, element, attrs){
    		// update customers list when a new on added 
    		Notify.getMsg('NewCustomer',function(event, data){
    				scope.customersCtrl.customers = Customers.query();
    		});
    	}
	};
}]);



		// // Find existing Customer
		// $scope.findOne = function() {
		// 	$scope.customer = Customers.get({ 
		// 		customerId: $stateParams.customerId
		// 	});
		// };
'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.alerts = [
		{
			icon:'glyphicon-user',
			btn: 'btn-success',
			total: '20,408',
			description: 'TOTAL CUSTOMERS'
		},
		{
			icon:'glyphicon-calendar',
			btn: 'btn-primary',
			total: '8,382',
			description: 'UPCOMING EVENTS'
		},
		{
			icon:'glyphicon-edit',
			btn: 'btn-success',
			total: '527',
			description: 'NEW CUSTOMERS IN 24H'
		},
		{
			icon:'glyphicon-record',
			btn: 'btn-info',
			total: '85,000',
			description: 'Email Sent'
		},
		{
			icon:'glyphicon-eye-open',
			btn: 'btn-warning',
			total: '268',
			description: 'FOLLOW UP REQUIRED'
		},
		{
			icon:'glyphicon-flag',
			btn: 'btn-danger',
			total: '384',
			description: 'REFERRALS TO MODERATE'
		}
		];
	}
]);
angular
	.module('CustomDatePicker', [])
	.directive('TadatePicker', TadatePicker);

function TadatePicker() {
	var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	return {
		restrict: 'E',
		template: '<table width="300" height="300">'+
					'<thead>'+
						'<td ng-repeat="day in days">{{ day }}</td>'+
					'</thead>'+
					'<tbody>'+
						'<tr>'+
							'<td ng-repeat="day in days"></td>'+
						'</tr>'+
					'</tbody>'+
                  '</table>',
		// eslint-disable-next-line no-unused-vars
		link: function($scope, $element, $attrs) {
			$scope.days = days;
		}
	};
}
var fs = require('fs');
var util = require('../util');

var readJSON = util.readJSON;

angular
	.module('todoApp')
	.controller('TodoController', TodoController);

function TodoController($scope, $timeout, settings) {
	var vm = this;

	vm.name = 'Sachintha';
	vm.task = '';
	vm.desc = '';
	vm.complete = false;
	vm.todos = [];
	vm.selected_task = null;
	vm.add = add;
	vm.remove = remove;
	vm.toggle = toggle;
	vm.toggleOptions = toggleOptions;
	vm.editTask = editTask;
	vm.completeTask = completeTask;
	vm.undoTask = undoTask;
	vm.onFocus = onFocus;
	vm.onBlur = onBlur;
	vm.edit_enabled = false;
	vm.form_focused = false;
	vm.form_focus = false;
	vm.expand = false;

	$scope.$watch(function () {
		return settings.getconfLocale();
	}, function () {
		vm.add_todo = settings.data.add_todo;
		vm.btn_enter = settings.data.btn_enter;
	});

	init();

	function add(task) {
		// eslint-disable-next-line no-console
		console.log(task, vm.desc);
		if (vm.task != '' && vm.task != null) {
			vm.todos.push({
				'title': vm.task,
				'description': vm.desc,
				'duration': 3,
				'completed': false
			});
		}
		vm.task = '';
		vm.desc = '';
		// eslint-disable-next-line no-console
		console.log(vm.todos);
	}

	function remove(id) {
		vm.todos.splice(findTodo(id), 1);
	}

	function editTask(id) {
		vm.task = findTodo(id).title;
		if (vm.task.desc) vm.form_focus = true;
		vm.edit_enabled = true;
	}

	function completeTask(id) {
		findTodo(id).completed = true;
		settings.todos = vm.todos;
	}
	// eslint-disable-next-line no-unused-vars
	function undoTask(id) {
		//vm.todos[id - 1].completed = false;
		// eslint-disable-next-line no-console
		console.log(settings.todos);
	}
	function toggle(id) {
		if (vm.selected_task == null) {
			vm.selected_task = id;
		} else if (vm.selected_task == id) {
			vm.selected_task = null;
		} else {
			vm.selected_task = id;
		}
		// eslint-disable-next-line no-console
		console.log('Todo id:', id);
	}

	function toggleOptions() {
		// eslint-disable-next-line no-console
		console.log('expand');
		vm.expand = vm.expand ? false : true;
	}

	function onFocus() {
		//if(vm.form_focus) vm.form_focused = true;
	}

	function onBlur() {
		$timeout(function () {
			var node = document.activeElement.parentNode.nodeName;
			if (node == 'DIV' || node == 'FORM') {
				vm.form_focused = true;
			} else {
				vm.form_focused = false;
			}
			// eslint-disable-next-line no-console
			console.log(node);
		}, 10);
	}

	function findTodo(id) {
		for (var i = 0; i < vm.todos.length; i++) {
			if (vm.todos[i].id == id) {
				return vm.todos[i];
			}
		}
		return null;
	}

	// eslint-disable-next-line no-undef
	function init() {
		vm.name = vm.name || args[0];

		var file_path = './' + vm.name.toLowerCase() + '.todo.json';
		readJSON(file_path, function(result) {
			if(result != null) {
				vm.todos = result;
			} else {
				vm.todos = settings.todos || [];
			}
			$scope.$apply();
		})
	}
}

TodoController.$inject = ['$scope', '$timeout', 'SettingsConfig'];

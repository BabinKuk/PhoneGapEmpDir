/*
EmployeeListView object that encapsulates the logic to create and render employee data
*/
var EmployeeListView = function () {

    // employees object
	var employees;

    this.initialize = function() {
        this.$el = $('<div/>');
        this.render();
    };

    this.setEmployees = function(list) {
        employees = list;
        this.render();
    }

    this.render = function() {
        this.$el.html(this.template(employees));
        return this;
    };

    this.initialize();

}
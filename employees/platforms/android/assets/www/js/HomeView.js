/*
HomeView object that encapsulates the logic to create and render the Home view
*/
var HomeView = function (service) {

    // nested view to display the list of employees
	// as a separate view it is reusable in other contexts
	var employeeListView;

    this.initialize = function() {
        this.$el = $('<div/>');
        this.$el.on('keyup', '.search-key', this.findByName);
        employeeListView = new EmployeeListView();
        this.render();
    };

	// render view (reusable)
    this.render = function() {
        this.$el.html(this.template());
        $('.content', this.$el).html(employeeListView.$el);
        return this;
    };

    this.findByName = function() {
        service.findByName($('.search-key').val()).done(function(employees) {
            employeeListView.setEmployees(employees);
        });
    };

    this.initialize();
}
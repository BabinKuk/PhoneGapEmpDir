/*
EmployeeView object that encapsulates the logic to create and render employee details data
*/
var EmployeeView = function(employee) {

	this.initialize = function() {
		this.$el = $('<div/>');
	};

	this.render = function() {
		this.$el.html(this.template(employee));
		return this;
	};

	// addLocation event handler
	this.addLocation = function(event) {
		console.log('Adding location...');
		event.preventDefault();
		/* not working during test*/
		navigator.geolocation.getCurrentPosition(
			function(position) {
				alert(position.coords.latitude + ',' + position.coords.longitude);
			},
			function() {
			alert('Error getting location');
		});
		return false;
	};
	
	// addToContacts event handler
	this.addToContacts = function(event) {
		event.preventDefault();
		console.log('addToContacts');
		if (!navigator.contacts) {
			alert("Contacts API not supported", "Error");
			return;
		}
		var contact = navigator.contacts.create();
		contact.name = {givenName: employee.firstName, familyName: employee.lastName};
		var phoneNumbers = [];
		phoneNumbers[0] = new ContactField('work', employee.officePhone, false);
		phoneNumbers[1] = new ContactField('mobile', employee.cellPhone, true);
		contact.phoneNumbers = phoneNumbers;
		contact.save();
		return false;
	};
	
	// changePicture event handler
	this.changePicture = function(event) {
		event.preventDefault();
		console.log('Changing Picture...');
		if (!navigator.camera) {
			alert("Camera API not supported", "Error");
			return;
		}
		var options = {
			quality: 50,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Album
			encodingType: 0     // 0=JPG 1=PNG
		};
		
		navigator.camera.getPicture(
			function(imgData) {
				$('.media-object', this.$el).attr('src', "data:image/jpeg;base64,"+imgData);
			},
			function() {
			  alert('Error taking picture', 'Error');
			},options
		);

		return false;
	};
	
	this.initialize();
	
	// addLocation event listener
	this.$el.on('click', '.add-location-btn', this.addLocation);
	
	// addToContacts event listener
	this.$el.on('click', '.add-contact-btn', this.addToContacts);
	
	// changePicture event listener
	this.$el.on('click', '.change-pic-btn', this.changePicture);

}
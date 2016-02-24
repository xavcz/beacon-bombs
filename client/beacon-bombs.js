if (Meteor.isClient) {
	Template.beaconTest.helpers({
		'click button': function () {
			alert('testng');
		}
	});
}






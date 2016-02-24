lookingForBeacons = [
  {
    uuid: 'D0D3FA86-CA76-45EC-9BD9-6AF47CFFF8B8',
    identifier: 'kevins'
  }
];

if (Meteor.isCordova) {
  Meteor.startup(function() {
    lookingForBeacons.forEach(function(myBeacon) {
      var reactiveBeaconRegion = new ReactiveBeaconRegion({
        identifier: myBeacon.identifier,
        uuid: myBeacon.uuid
      });
      Tracker.autorun(function () {
        if (reactiveBeaconRegion.getBeaconRegion().inRegion) {
          var foundBeacons = reactiveBeaconRegion.getBeaconRegion().beacons;
          foundBeacons.forEach(function(foundBeacon) {
          });
          console.log(foundBeacons);
        }
      });
    });
  });
}
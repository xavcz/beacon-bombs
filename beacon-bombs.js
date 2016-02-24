if (Meteor.isClient) {
  Template.hello.onCreated(function () {
    let reactiveBeaconRegion;
    if (Meteor.isCordova) {
      reactiveBeaconRegion = new ReactiveBeaconRegion({
        identifier: "door beacon",
        uuid: "D0D3FA86-CA76-45EC-9BD9-6AF47CFFF8B8"
      });

      Tracker.autorun(() => {
        console.log(reactiveBeaconRegion.getBeaconRegion());
        if (reactiveBeaconRegion.getBeaconRegion().inRegion) {
          alert('yeah!')
        }
      });
    }
  });

  Template.hello.events({
    'click button' () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}


if (Meteor.isCordova) {
  Meteor.startup(() =>  {
    const reactiveBeaconRegion = new ReactiveBeaconRegion({identifier: "door beacon", uuid: "D0D3FA86-CA76-45EC-9BD9-6AF47CFFF8B8"});

    console.log(reactiveBeaconRegion.getBeaconRegion());
  });
}

if (Meteor.isClient) {

  Template.hello.helpers({
    result () {
      return reactiveBeaconRegion.getBeaconRegion();
    }
  });

  Template.hello.events({
    'click button' () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

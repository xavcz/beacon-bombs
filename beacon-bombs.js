if (Meteor.isClient) {

  const beacons = [
    {
      _id: 1,
      uuid: 'ABCD-1234',
      identifier: 'First bomb',
      hint: 'In your shoe',
      password: 'pipo'
    },
    {
      _id: 2,
      uuid: 'EFGH-5678',
      identifier: 'Second bomb',
      hint: 'Somewhere by there',
      password: 'hophop'
    }
  ];

  Template.layout.onCreated(function () {
    Session.set('currentBomb', 1);
  });

  Template.layout.helpers({
    currentBomb () {
      return beacons[Session.get('currentBomb') - 1];
    }
  });

  Template.bomb.events({
    'submit form' (event, template) {
      event.preventDefault();

      if (event.target[0].value === template.data.password) {
        console.log('success');
        Session.set('currentBomb', Session.get('currentBomb') + 1);
      } else {
        // XXX handle error
      }
    }
  });

  var countdown = new ReactiveCountdown(600);

  countdown.start(function() {
      // XXX do something when this is completed
  });

  Template.timer.helpers({
    getCountdown: function() {
      return countdown.get();
    }
  });

}
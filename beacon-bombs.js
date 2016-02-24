if (Meteor.isClient) {

  const beacons = [
    {
      _id: 1,
      uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
      identifier: 'First bomb',
      hint: 'In your shoe',
      password: 'pipo'
    },
    {
      _id: 2,
      uuid: 'D0D3FA86-CA76-45EC-9BD9-6AF4FB75CA9A',
      identifier: 'Second bomb',
      hint: 'Somewhere by there',
      password: 'hophop'
    },
    {
      _id: 3,
      uuid: 'D0D3FA86-CA76-45EC-9BD9-6AF47CFFF8B8',
      identifier: 'Second bomb',
      hint: 'Somewhere by there',
      password: 'cat'
    }
    {
      _id: 4,
      uuid: 'D0D3FA86-CA76-45EC-9BD9-6AF48624A8E7',
      identifier: 'Second bomb',
      hint: 'Somewhere by there',
      password: 'fish'
    }
  ];

  let countdown = new ReactiveCountdown(600);

  countdown.start(function() {
    // XXX do something when this is completed
  });

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
        // add time and get to the next bomb
        countdown.add(300);
        Session.set('currentBomb', Session.get('currentBomb') + 1);
      } else {
        // XXX handle error
      }
    }
  });

  Template.timer.helpers({
    getCountdown: function() {
      return countdown.get();
    }
  });

}
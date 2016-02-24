if (Meteor.isClient) {

  const beacons = [
    {
      _id: 1,
      uuid: 'ABCD-1234',
      identifier: 'First bomb',
      hint: 'In your shoe',
      code: 'pipo'
    },
    {
      _id: 2,
      uuid: 'EFGH-5678',
      identifier: 'Second bomb',
      hint: 'Somewhere by there',
      code: 'hophop'
    }
  ];

  let countdown = new ReactiveCountdown(600);

  countdown.start(function() {
    // XXX do something when this is completed
  });

  Template.layout.onCreated(function () {
    Session.set('currentBomb', 0);
  });

  Template.layout.helpers({
    gameStarted () {
      return Session.get('currentBomb');
    },
    currentBomb () {
      return beacons[Session.get('currentBomb') - 1];
    }
  });

  Template.layout.events({
    'click [rel=ok]' (event, instance) {
      Session.set('currentBomb', 1);
    }
  });

  Template.bomb.onCreated(function () {
    // init
    this.nextBomb = new ReactiveVar(Session.get('currentBomb') + 1);

    this.autorun(() => {
      if (this.nextBomb.get() === Session.get('currentBomb')) {
        $('.bomb').velocity('fadeIn');
        this.nextBomb.set(this.nextBomb.get() + 1);
      }
    });
  });

  Template.bomb.events({
    'submit form' (event, instance) {
      event.preventDefault();

      // compare the input 'code' to the data context (ie. the current bomb)
      if (event.target[0].value === instance.data.code) {
        console.log('success');
        // add time and get to the next bomb
        countdown.add(300);
        $('.bomb').velocity('fadeOut');
        Meteor.setTimeout(() => {
          Session.set('currentBomb', Session.get('currentBomb') + 1);
        }, 500);
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
if (Meteor.isClient) {

  const beacons = [
    {
      _id: 1,
      uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
      identifier: 'First bomb',
      hint: 'In your shoe',
      code: 'Pipo'
    },
    {
      _id: 2,
      uuid: 'D0D3FA86-CA76-45EC-9BD9-6AF4FB75CA9A',
      identifier: 'Second bomb',
      hint: 'Somewhere by there',
      code: 'Hophop'
    },
    {
      _id: 3,
      uuid: 'D0D3FA86-CA76-45EC-9BD9-6AF47CFFF8B8',
      identifier: 'Third bomb',
      hint: 'Miaou',
      code: 'Cat'
    },
    {
      _id: 4,
      uuid: 'D0D3FA86-CA76-45EC-9BD9-6AF48624A8E7',
      identifier: 'Ultimate bomb',
      hint: 'WoOoOoOo!!',
      code: 'Fish'
    }
  ];

  let countdown = new ReactiveCountdown(600);

  Template.registerHelper('or', (a, b) => {
    return a || b;
  });

  Template.layout.onCreated(function () {
    Session.setDefault('currentBomb', 0) 

  });

  Template.layout.helpers({
    gameRunning () {
      const currentBomb = Session.get('currentBomb');
      return currentBomb > 0 && currentBomb <= beacons.length;
    },
    bombData () {
      return beacons[Session.get('currentBomb') - 1];
    },
    currentBomb () {
      return Session.get('currentBomb');
    }
  });

  Template.layout.events({
    'click [rel=ok]' (event, instance) {
      Session.set('currentBomb', 1);
      console.log('game started');
      countdown.start();
    }
  });

  Template.splash.helpers({
    gameOver () {
      return Session.get('currentBomb') === 'game-over';
    },
    goodGame () {
      return Session.get('currentBomb') > beacons.length;
    }
  });


  /***
   * MONKEY PATCH "percolate:momentum"
   * Lack of consistency below
   ***/
  Template.bomb.onCreated(function () {
    // init a next bomb value attached to the bomb template
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
        console.log('success, next bomb');
        // add time and get to the next bomb
        countdown.add(300);
        $('.bomb').velocity('fadeOut');
        Meteor.setTimeout(() => {
          Session.set('currentBomb', Session.get('currentBomb') + 1);
        }, 500);
      } else {
        console.log('fail');
        // remove time but still get to the next bomb
        countdown.remove(300);
      }
    }
  });

  Template.timer.onCreated(function () {
    countdown.start(() => {
      Session.set('currentBomb', 'game-over');
    });
  });

  Template.timer.helpers({
    getCountdown: function() {
      return countdown.get();
    }
  });

}
if (Meteor.isClient) {
  const beacons = [
    {
      _id: 1,
      uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
      identifier: 'First bomb',
      hint: 'Think alphabet, but with numbers',
      code: 'Mirror',
			riddle: '2-1-20-8-18-15-15-13 '
    },
    {
      _id: 2,
      uuid: 'D0D3FA86-CA76-45EC-9BD9-6AF4FB75CA9A',
      identifier: 'Second bomb',
			hint: 'We have all enjoyed this device on the sunday.',
			code: 'Pizza',
			riddle: 'Coal in my belly, steel on my feet. When I get hot, it is time to eat.'

    },
    {
      _id: 3,
      uuid: 'D0D3FA86-CA76-45EC-9BD9-6AF47CFFF8B8',
      identifier: 'Third bomb',
			hint: 'My hotelroom is dirty. I am going to the ... to complain.',
			code: 'Rioja',
			riddle: 'There’s a place nearby you’ll want to meet -' +
			' A portal place where people greet - ' +
			' Find me at the gatekeeper’s home - ' +
			' Search this area with a fine toothed comb'
    },
    {
      _id: 4,
      uuid: 'D0D3FA86-CA76-45EC-9BD9-6AF48624A8E7',
      identifier: 'Ultimate bomb',
			hint: 'Big hulky, strolling down the hallways somewhere...',
			code: 'Beer',
			riddle: 'He’s tallest, not smallest, ' +
			'British, nor fast, '+
			'in his pocket you’ll find, '+
			'survival at last. '

    }
  ];

  Meteor.startup(function () {
    sAlert.config({
      effect: 'genie',
      position: 'top',
      timeout: 3000,
      html: false,
      onRouteClose: true,
      stack: {
        spacing: 10, // in px
        limit: 3 // when fourth alert appears all previous ones are cleared
      },
      offset: 0, // in px - will be added to first alert (bottom or top - depends of the position in config)
      beep: false,
      // examples:
      // beep: '/beep.mp3'  // or you can pass an object:
      // beep: {
      //     info: '/beep-info.mp3',
      //     error: '/beep-error.mp3',
      //     success: '/beep-success.mp3',
      //     warning: '/beep-warning.mp3'
      // }
      onClose: _.noop //
      // examples:
      // onClose: function() {
      //     /* Code here will be executed once the alert closes. */
      // }
    });
  });

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
      return currentBomb > 0 && currentBomb <= beacons.length && currentBomb !== 'game-over';
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
		Session.set('getHint', false);
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
        sAlert.success('Success ! 🎉');
				Session.set('getHint', false);
        // add time and get to the next bomb
        countdown.add(300);
        $('.bomb').velocity('fadeOut');
        Meteor.setTimeout(() => {
          event.target[0].value = '';
          Session.set('currentBomb', Session.get('currentBomb') + 1);
        }, 500);
      } else {
        console.log('fail');
        countdown.remove(60);
        sAlert.error('Wrong code ! Beware, you have lost time 💣');
      }
    },
		'click [rel=show-hint]': function () {
			Session.set('getHint', true);
		}
  });

	Template.bomb.helpers({
		showHint () {
			return Session.get('getHint');
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
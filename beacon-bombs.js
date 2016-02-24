if(Meteor.isClient){

var countdown = new ReactiveCountdown(600);

countdown.start(function() {

    // do something when this is completed

});

Template.timer.helpers({

    getCountdown: function() {
        return countdown.get();
    }

  });

}
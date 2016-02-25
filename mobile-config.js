
// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'beacons.bombs',
  name: 'Beacon Bombs',
  description: 'Sequentially diffuse 4 bombs, in 10 mins, to save the Hostel!',
  author: 'XavElvPatDan',
});

// Set up resources such as icons and launch screens.
App.icons({
  'iphone': 'icons/bomb.svg',
  'iphone_2x': 'icons/bomb.svg',
});

App.launchScreens({
  'iphone': 'splash/splash.jpg',
  'iphone_2x': 'splash/splash.jpg',
  // ... more screen sizes and platforms ...
});

// Set PhoneGap/Cordova preferences
App.setPreference('BackgroundColor', '0xff808080');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');
var dbus = require('dbus-native'); //https://github.com/sidorares/node-dbus
var bus = dbus.systemBus();                                                                                                               
                                                                                                                                          
var phoneNumber = '123456789';
                                                                                                                                          
bus.connection.on('message', console.log); // logging
bus.invoke({
    path: '/com/nokia/csd/call',  // http://wiki.maemo.org/Phone_control#Make_a_phone_call
    destination: 'com.nokia.csd.Call',
    'interface': 'com.nokia.csd.Call',
    member: 'CreateWith',
    signature: 'su',   // The signature describes the type of the body array elements see http://dbus.freedesktop.org/doc/dbus-specificati
    body: [phoneNumber, 0]
  }, function(err, res)
  {
    console.log(res);
  });                                                                                                                                       
                                                                                                                                      
console.log("Calling " + phoneNumber + " ...");

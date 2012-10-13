/*
 * This is based on http://wiki.maemo.org/Phone_control#Send_SMS
*/

var dbus = require('dbus-native');
var bus = dbus.systemBus();
// bus.connection.on('message', console.log); //logging
var pdu = require('./lib/pdu');
module.exports.sendSMS = function(number, message) {
  pdumessage = pdu.createMessage(number, message);
  bus.invoke({
    path: '/com/nokia/phone/SMS/ba212ae1',
    destination: 'com.nokia.phone.SMS',
    'interface': 'com.nokia.csd.SMS.Outgoing',
    member: 'Send',
    signature: 'aays',  // see http://www.cncmods.net/files/dbus/sms.xml
    body: [[pdumessage], '']
  }, function(err, res) {
    console.log(err);
    console.log(res);
  });
  console.log("sms send");
}
	
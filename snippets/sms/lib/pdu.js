
module.exports.createMessage = function(number, message) {

  var pdumessage = [1, 10];
  
  { // phone number
    var numlength = number.length;
    if(number.length % 2 != 0) {
      number = number + 'F';
    }
    var octifiednumber = getNumberAsPDU(number);
    pdumessage = pdumessage.concat([numlength, 129]);
    pdumessage = pdumessage.concat(octifiednumber);
  }
  
  pdumessage = pdumessage.concat([0, 0]);
  
  { // message
      var msglength = message.length;
      octifiedmsg = octify(message);
      pdumessage = pdumessage.concat([msglength]);
      pdumessage = pdumessage.concat(octifiedmsg);
  }
  
  return pdumessage;
}

function ord (string) {
  var str = string + '',
      code = str.charCodeAt(0);
  if (0xD800 <= code && code <= 0xDBFF) {
    var hi = code;
    if (str.length === 1) {
      return code;
    }
    var low = str.charCodeAt(1);
    
    return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
  }
  if (0xDC00 <= code && code <= 0xDFFF) {
    return code;
  }
  
  return code;
}

function getNumberAsPDU(number) {
  var length = number.length /2,
      i = 1,
      pduNumber = [];
  while (i <= length) {
    var str = number.substring(i*2-2,i*2);
    var octet = "";
    var digit_1 = '0';
    try {
      digit_1 = parseInt(str[0]);
      digit_2 = parseInt(str[1]); 
      octet = (digit_2 << 4) | digit_1;
    } catch (e) {
      octet = (1 << 4) | digit_1;
    }
    pduNumber.push(octet);
    i = i + 1;
  }
  
  return pduNumber;
}

function octify(msg) {
  var bytes = [];
  msg.split("").forEach(function(item) {
    var t = ord(item);
    bytes.push(t);
  });
  var bitsconsumed = 0;
  var referencebit = 7;
  var octets = [];
  while (bytes.length > 0) {
    byte = bytes.shift();
    byte = byte >> bitsconsumed;
    if(bytes.length > 0) {  
      nextbyte = bytes[0];
      bitstocopy = (nextbyte & (0xff >> referencebit)) << referencebit;
      octet = (byte | bitstocopy);
    } else {
      octet = (byte | 0x00);
    }
    if (bitsconsumed != 7) {
      octets.push(byte | bitstocopy);
      bitsconsumed += 1;
      referencebit -= 1;
    } else {                                   
      bitsconsumed = 0;
      referencebit = 7;
    }
  }
  
  return octets
}
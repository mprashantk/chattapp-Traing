var socket = io();

var scrollToBottom=function(){
var messages=jQuery('#messages');
var newMessage=messages.children('li:last-child');

var clientHieght=messages.prop('clientHeight');
var scrollTop=messages.prop('scrollTop');
var scrollHieght=messages.prop('scrollHeight');
var newMessageHieght=newMessage.innerHeight();
var lastMessageHieght=newMessage.prev().innerHeight();

if(clientHieght +scrollTop + newMessageHieght +lastMessageHieght >=scrollHieght ){
  console.log('should scrol');
messages.scrollTop(scrollHieght);
}
}

socket.on('connect',function(){
 console.log('Connected to server.');

 // socket.emit('createEmail',{
 //   to:'shrimankumbar@gmail.com',
 //   text:'Hey,this is Shriman.'
 // });


});

socket.emit('newMessage',{
 from:'Shriman',
 text:'Shriman.Broadcast '
},function(data){
 console.log('Got it this  is from server.');
});


socket.on('disconnect',function(){
 console.log('Disconnected from server.');
})

// socket.on('newEmail',function(email){
//   console.log('New email',email);
// });

socket.on('newMessage',function(message){

  var template=jQuery('#message-template').html();

  var html=Mustache.render(template,{
    text:message.text,
    from :message.from,
    createdAt:moment(message.createdAt).format('h:mm a')
  });
  jQuery('#messages').append(html);
  scrollToBottom();

 // console.log('New Message',message);
 //
 // var formatteTime=moment(message.createdAt).format('h:mm a');
 // var li =jQuery('<li></li>');
 // li.text(`${message.from}  ${formatteTime}: ${message.text}`);
 // jQuery("#messages").append(li);
});

socket.on('newLocationMessage',function (message) {
  var template=jQuery('#location-message-template').html();

  var html=Mustache.render(template,{
    url:message.url,
    from :message.from,
    createdAt:moment(message.createdAt).format('h:mm a')
  });
  jQuery('#messages').append(html);
  scrollToBottom();
  // var li= jQuery('<li></li>');
  // var formatteTime=moment(message.createdAt).format('h:mm a');
  //
  // var a = jQuery('<a target="_blank">My current location</a>');
  // li.text(`${message.from} ${formatteTime}: `);
  // a.attr('href',message.url);
  // li.append(a);
  // jQuery('#messages').append(li);
});

jQuery("#message-form").on('submit',function(e){
 e.preventDefault();

 socket.emit('createMessage',{
   from:'User',
   text:jQuery("[name=message]").val()
 },function(){
// jQuery("[name=message]").val('an')
 });

});

var locationButton = jQuery('#send-location');
locationButton.on('click',function () {
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser')
  }
locationButton.attr('disabled','disabled').text('sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send Location');;
    socket.emit('createLocationMessage',{
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  });
    console.log(position);
  },function () {
    locationButton.removeAttr('disabled').text('Send Location');;
    alert('Unable to fetch location.');
  })
});



















// var socket = io();
// socket.on('connect',function (){
//   console.log('connected to server.');
//
// socket.on('disconnect',function (){
//   console.log('Dissconnected from server.');
// });
//
// socket.on('newEmail',function(email){
//   console.log('New email',email);
// });
//
// socket.on('newMessage',function(message){
//   console.log('newMessage',message);
//   var li = jQuery('<li></li>');
//   li.text(`${message.from}: ${message.text}`);
//   jQuery('#messges').append(li);
// });
//

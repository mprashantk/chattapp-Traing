var socket=io();


socket.on('connect',function(){
  console.log('connected to server');

  socket.emit('createMessage',{
    from:'sss',
    text:'dddd'
  });
});

socket.on('disconnect',function(){
  console.log('disconnect from server');
});

socket.on('newEmail',function(email){
  console.log('new wmial',email);
});


socket.on('newMessage',function(message){
  console.log('mess',message);
});

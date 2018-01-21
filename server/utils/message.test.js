var expect=require('expect');

describe('genMes',()=>{
  it('should generate correct message object',()=>{
var from='a';
var text='a';
var message=generateMessage(from,text);
expect(message.createdAt).toBeA('number');
expect(message).toInclude({
from,
text
});

  });
});

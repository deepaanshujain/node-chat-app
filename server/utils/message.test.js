var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
	it('should generate correct message object', () => { 
		var from = "Admin";
		var text = "Some Message";

		var message = generateMessage(from, text);
		expect(message).objectContaining({from,text});
		//expect(message.createdAt).toBeA('number');
	});
});

;(function(){

  // If require.js isn't included, we should not use this InteractiveNativeBridge
  if (!require)
  	return;

  // event broker is required and included with the interactive
  try {
  	EventBroker = require('chaplin/lib/event_broker')
  } catch (e) {
  	return;
  }
  if (!EventBroker) return;

  window.NativeBridge = {};
  _(window.NativeBridge).extend(EventBroker);

  // force the interactive to save periodically
  /*setInterval(function(){
  	console.log('publishing #doSave');
  	window.NativeBridge.publishEvent("#doSave");
  }, 4000);
*/
  // handle the interactive's request for prior state
  window.NativeBridge.subscribeEvent("#fetch", function(message, callback){  	
  	console.log('received #fetch');

  	if (message.type === "state") {   		
  		var stateString = localStorage.getItem('sample-interactive');
  		if (stateString) {
  			console.log('loaded state: ' + stateString);
  			callback(JSON.parse(stateString));
  		} else {
  			callback(null);
  		}
  	}
  });  

  // handle the save event from interactive
  window.NativeBridge.subscribeEvent("#save", function(message){
  	console.log('received #save');
  	if (message.type == "state") {  		
  		console.log('saving state: ' + JSON.stringify(message.data));
  		localStorage.setItem('sample-interactive', JSON.stringify(message.data));
  	}
  });

  // handle the save event from interactive
  window.NativeBridge.subscribeEvent("#finish", function(message){
	  console.log('received #finish');
	  console.log('interactive reported result: ' + JSON.stringify(message));		
  });
  // insert a simulated reset button
  $('body').prepend("<button id='fake-reset-button' style='margin:15px 5px 15px 50px;'>Reset</button>");
  $('#fake-reset-button').click(function(){
  	localStorage.removeItem('sample-interactive');
  	location.reload();
  });

  // insert a simulated done button
  $('body').prepend("<button id='fake-done-button' style='margin:15px 5px 15px 150px;'>Done</button>");
  $('#fake-done-button').click(function(){
  	console.log('publishing #doSave');
  	window.NativeBridge.publishEvent("#doSave");
  	console.log('publishing #doFinish');
  	window.NativeBridge.publishEvent("#doFinish");
  });

  $('body').prepend("<button id='fake-save-button' style='margin:15px 5px 15px 250px;'>Save</button>");
  $('#fake-save-button').click(function(){
  	console.log('publishing #doSave');
  	window.NativeBridge.publishEvent("#doSave");
  });
})();

var eventBroker
$(function(){

	eventBroker = _({}).extend(require('chaplin/lib/event_broker'));
	eventBroker.publishEvent("#fetch", { type : 'state' }, function(state) {
		fetchCallBack(state);
	});
	eventBroker.subscribeEvent("#doSave", function(message){
		eventBroker.publishEvent("#save",saveCallBack());
	})
	eventBroker.subscribeEvent("#doFinish", function(message){
		eventBroker.publishEvent("#finish",finishCallBack());
	})
});

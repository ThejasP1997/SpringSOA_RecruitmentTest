({
    doInit : function(component, event, helper) {
            var action = component.get("c.getAccountRecord"); //Calling Apex class controller 'getAccountRecord' method
            
            action.setCallback(this, function(response) {
                var state = response.getState(); //Checking response status
                var result = JSON.stringify(response.getReturnValue());
                if (component.isValid() && state === "SUCCESS")
                    component.set("v.accList", response.getReturnValue());  // Adding values in Aura attribute variable.   
            });
            $A.enqueueAction(action);
        
    }
})
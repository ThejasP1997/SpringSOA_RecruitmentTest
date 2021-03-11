({
    createObjectData: function(component, event) {
        // get the contactList from component and add(push) New Object to List  
        var RowItemList = component.get("v.skillsList");
        RowItemList.push({
            'sobjectType': 'MidMan__c'
        });
        // set the updated list to attribute (contactList) again    
        component.set("v.skillsList", RowItemList);
    },
    // helper function for check if first Name is not null/blank on save  
    validateRequired: function(component, event) {
        var isValid = true;
        var allContactRows = component.get("v.skillsList");
        for (var indexVar = 0; indexVar < allContactRows.length; indexVar++) {
            if (allContactRows[indexVar].Name == '') {
                isValid = false;
                alert('First Name Can\'t be Blank on Row Number ' + (indexVar + 1));
            }
        }
        return isValid;
    },
    
    //Qualification picklist
    fetchPickListVal: function(component, fieldName, elementId) {
        var action = component.get("c.getselectOptions");
        action.setParams({
            "objObject": component.get("v.objInfo"),
            "fld": fieldName
        });
        var opts = [];
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                var allValues = response.getReturnValue();
 
                if (allValues != undefined && allValues.length > 0) {
                    opts.push({
                        class: "optionClass",
                        label: "--- None ---",
                        value: ""
                    });
                }
                for (var i = 0; i < allValues.length; i++) {
                    opts.push({
                        class: "optionClass",
                        label: allValues[i],
                        value: allValues[i]
                    });
                }
                component.find(elementId).set("v.options", opts);
            }
        });
        $A.enqueueAction(action);
    },
    
    
    
    fetchIconDetails : function(component)
    {
        var fetchIconInfo = component.get("c.getIconDetails");
            
        fetchIconInfo.setParams({"objectName" : component.get("v.objName")});
        fetchIconInfo.setCallback(this,function(response){                          
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                component.set("v.iconDetails",response.getReturnValue());
                console.log('==response.getReturnValue()===',response.getReturnValue());
            } 
            else
            {
                console.log('==Exception===');
            }
        });
        $A.enqueueAction(fetchIconInfo);  
    },
    
    removeError : function(component)
    {
        var elem = component.find("formElem");
        $A.util.removeClass(elem, 'slds-has-error');
        component.set("v.errorMsg", '');
    },
    
    //Contact Display
    showSpinner : function(component) {
        var spinner = component.find('spinner');
		$A.util.removeClass(spinner, "slds-hide");
    },
    hideSpinner : function(component) {
        var spinner = component.find('spinner');
		$A.util.addClass(spinner, "slds-hide"); 
    },
    validateInputs: function(component)
    {
    	var contactWrap = component.get("v.contactWrap");
        /** Just added console to verify lookup value binding **/
        console.log('====contactWrap.accLkp.id===',contactWrap.accLkp.id);
        console.log('====contactWrap.accLkp.label===',contactWrap.accLkp.label);
        
        var isValid = true;
      	var lastNmCmp = component.find("ln")
        var lastNmVal = lastNmCmp.get("v.value");

        // is last name empty?
        if ($A.util.isEmpty(lastNmVal)) 
        {
            isValid = false;
            lastNmCmp.set("v.errors", [{message:"You must enter a value"}]);
        } 
        else 
        {
            lastNmCmp.set("v.errors", null);
        }
        // if Id is empty
        if(isValid && $A.util.isEmpty(contactWrap.accLkp.id))
        {
            isValid = false;
            /* if Id is empty but label is not empty => user has typed something in search box 
             * but not selected any value or not closed the searchbox, throw error */
            if(!$A.util.isEmpty(contactWrap.accLkp.label))
            {
                this.fireErrorEvent("accLkp", "Please select value from lookup menu");
            }
            /* if Id is empty & label is empty => required field validation */
            else
            {
                this.fireErrorEvent("accLkp", "You must enter a value");
            }
        } 
        return(isValid);
	},
    fireErrorEvent : function(aljsId, errorMsg)
    {
    	var errorEvt = $A.get("e.c:errorevt");
        errorEvt.setParams({
            "errorMsg" : errorMsg, 
            "aljsId" : aljsId
    	});     
    	errorEvt.fire(); 
	},
    saveRecord : function(component) {
		if(this.validateInputs(component))
        {
            this.showSpinner(component);
            var action = component.get("c.updateContact");
			var contactWrap = component.get("v.contactWrap");
			
            action.setParams({
                "jsonCon" : JSON.stringify(contactWrap), 
            });
			
            action.setCallback(this, function(response) {
                 //store state of response
                 var state = response.getState();
                    
                 if (state === "SUCCESS") { 
                    component.set("v.successMsg","Contact updated successfully");
                    // close the Modal 
                    window.setTimeout(
                        $A.getCallback(function() { 
                            if (component.isValid()) {
                                 var navEvt = $A.get("e.force:navigateToSObject");
                                 if(navEvt != undefined)
                                 {
                                     navEvt.setParams({
                                     "recordId": response.getReturnValue(),
                                     "slideDevName": "related"
                                     });
                                     navEvt.fire(); 
                                 } 
                            }
                        }), 1000
                    );
                }
              else 
              {
                  component.set("v.errorMsgs", response.getError()[0].message);
              }
              this.hideSpinner(component);
          });
           $A.enqueueAction(action);
        }
	}
    
    
	
})
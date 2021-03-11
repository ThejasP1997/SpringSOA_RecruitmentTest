({
    
    // function call on component Load
    doInit: function(component, event, helper) {
        component.find("employeeRecordCreator").getNewRecord(
            "Employee_Details__c", // sObject type (objectApiName)
            null,      // recordTypeId
            false,     // skip cache?
            $A.getCallback(function() {
                var rec = component.get("v.newEmployee");
                var error = component.get("v.newEmployeeError");
                if(error || (rec === null)) {
                    console.log("Error initializing record template: " + error);
                    return;
                }
                console.log("Record template initialized: " + rec.apiName);
            })
        );
        
        // fill lookup value
        if(!$A.util.isEmpty(component.get("v.selectedId")))
        {            
            var selectedOption = component.find('SelectedOption');
            $A.util.removeClass(selectedOption, 'slds-hide');
            
            var allOptions = component.find('availableOptions');
            $A.util.addClass(allOptions, 'slds-hide');
            
            var search = component.find('InputSearch');
            $A.util.addClass(search, 'slds-hide');
        }
        // create a Default RowItem [Contact Instance] on first time Component Load
        // by call this helper function  
        helper.fetchPickListVal(component, 'Qualification__c', 'accIndustry');
        component.find("employeeRecordCreator").getNewRecord(
            "Employee_Details__c", // sObject type (objectApiName)
            null,      // recordTypeId
            false,     // skip cache?
            $A.getCallback(function() {
                var rec = component.get("v.newEmployee");
                var error = component.get("v.newEmployeeError");
                if(error || (rec === null)) {
                    console.log("Error initializing record template: " + error);
                    return;
                }
                console.log("Record template initialized: " + rec.apiName);
            })
        );
        helper.createObjectData(component, event);
    },
    
    
    onPicklistChange: function(component, event, helper) {
        // get the value of select option
        alert(event.getSource().get("v.value"));
    },
    
    // function for save the Records 
    Save: function(component, event, helper) {
        console.log('save clicked');
        debugger;
        //if(helper.validateContactForm(component)) {
            component.set("v.simpleNewEmployee.Id", component.get("v.recordId"));
            debugger;
            component.find("employeeRecordCreator").saveRecord(function(saveResult) {
                debugger;
                if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                    // record is saved successfully
                    var resultsToast = $A.get("e.force:showToast");
                    resultsToast.setParams({
                        "title": "Saved",
                        "message": "The record was saved."
                    });
                    resultsToast.fire();

                } else if (saveResult.state === "INCOMPLETE") {
                    // handle the incomplete state
                    console.log("User is offline, device doesn't support drafts.");
                } else if (saveResult.state === "ERROR") {
                    // handle the error state
                    console.log('Problem saving contact, error: ' + JSON.stringify(saveResult.error));
                } else {
                    console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
                }
            });
        
    },
            
                                                               
                                                               
                                                               
                                                               
                                                               
     // function for create new object Row in Contact List 
    addNewRow: function(component, event, helper) {
                // call the comman "createObjectData" helper method for add new Object Row to List  
                helper.createObjectData(component, event);
            },
                
                // function for delete the row 
                removeDeletedRow: function(component, event, helper) {
                    // get the selected row Index for delete, from Lightning Event Attribute  
                    var index = event.getParam("indexVar");
                    // get the all List (contactList attribute) and remove the Object Element Using splice method    
                    var AllRowsList = component.get("v.skillsList");
                    AllRowsList.splice(index, 1);
                    // set the contactList after remove selected row element  
                    component.set("v.skillsList", AllRowsList);
                },
                    
                    //Typeahead
                    
                    // perform search on change of text in search box
                    onChangeSearchText : function(component, event, helper){
                        var clearIcon = component.find('clearSearchTextIcon');
                        $A.util.removeClass(clearIcon, 'slds-hide');
                        
                        var lookUpIcon = component.find('SearchTextIcon');
                        $A.util.addClass(lookUpIcon, 'slds-hide');
                        
                        helper.onChangeSearchTextHelper(component, event);
                    },
                        
                        // perform search on focus in search box
                        onFocusSearchText : function(component, event, helper){
                            helper.removeError(component);
                            
                            var clearIcon = component.find('clearSearchTextIcon');
                            $A.util.removeClass(clearIcon, 'slds-hide');
                            
                            var lookUpIcon = component.find('SearchTextIcon');
                            $A.util.addClass(lookUpIcon, 'slds-hide');
                            if($A.util.isEmpty(component.get('v.selectedLabel')))  
                                helper.onChangeSearchTextHelper(component, event);
                        },
                            
                            onCloseSelectedRecord : function(component, event, helper){
                                console.log('=onCloseSelectedRecord==');
                                helper.removeError(component);
                                component.set('v.selectedId', '');
                                component.set('v.selectedLabel', '');
                                
                                var selectedOption = component.find('SelectedOption');
                                $A.util.addClass(selectedOption, 'slds-hide');
                                
                                var search = component.find('InputSearch');
                                $A.util.removeClass(search, 'slds-hide');
                                
                                var clearIcon = component.find('clearSearchTextIcon');
                                $A.util.addClass(clearIcon, 'slds-hide');
                                
                                var lookUpIcon = component.find('SearchTextIcon');
                                $A.util.removeClass(lookUpIcon, 'slds-hide');
                                
                                var allOptions = component.find('availableOptions'); 
                                $A.util.addClass(allOptions, 'slds-hide');
                            },
                                
                                onSelectRecord : function(component, event, helper){
                                    console.log('=onSelectRecord==');
                                    var selectedOption = component.find('SelectedOption');
                                    $A.util.removeClass(selectedOption, 'slds-hide');
                                    
                                    var allOptions = component.find('availableOptions');
                                    $A.util.addClass(allOptions, 'slds-hide');
                                    
                                    var search = component.find('InputSearch');
                                    $A.util.addClass(search, 'slds-hide');
                                    
                                    var selectedIndx = event.currentTarget.dataset.index;
                                    var listAll = component.get('v.searchResult');
                                    
                                    var searchTextIcon = component.find('SearchTextIcon');
                                    var closeIcon = component.find('clearSearchTextIcon');
                                    $A.util.addClass(search, 'slds-hide');
                                    
                                    component.set('v.selectedId', listAll[selectedIndx].id);
                                    component.set('v.selectedLabel', listAll[selectedIndx].label);
                                    helper.removeError(component);
                                }, 
                                    
                                    clearSearchText : function(component, event, helper){
                                        helper.removeError(component);
                                        
                                        console.log('=clearSearchText==');
                                        var allOptions = component.find('availableOptions');
                                        $A.util.addClass(allOptions, 'slds-hide'); 
                                        var clearIcon = component.find('clearSearchTextIcon');
                                        $A.util.addClass(clearIcon, 'slds-hide');
                                        
                                        var lookUpIcon = component.find('SearchTextIcon');
                                        $A.util.removeClass(lookUpIcon, 'slds-hide');
                                        component.set('v.selectedId', '');
                                        component.set('v.selectedLabel', '');
                                    },
                                        
                                        handlerError : function(component, event, helper) {
                                            // verify lookup Id before adding error
                                            if(event.getParam("aljsId") == component.get("v.lookupId"))
                                            {
                                                var elem = component.find("formElem");
                                                $A.util.addClass(elem, 'slds-has-error'); 
                                                component.set("v.errorMsg", event.getParam("errorMsg"));
                                            }
                                        }
        })
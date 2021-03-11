({
    doInit: function(component, event, helper) {
        // Prepare a new record from template
        //helper.fetchIconDetails(component);    
        
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
    },

    handleSaveContact: function(component, event, helper) {
        if(helper.validateContactForm(component)) {
            
        }
    },
    
     
    AddNewRow : function(component, event, helper){
       // fire the AddNewRowEvt Lightning Event 
        component.getEvent("AddRowEvt").fire();     
    },
    
    removeRow : function(component, event, helper){
     // fire the DeleteRowEvt Lightning Event and pass the deleted Row Index to Event parameter/attribute
       component.getEvent("DeleteRowEvt").setParams({"indexVar" : component.get("v.rowIndex") }).fire();
    },
    
    
    //typehaead
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
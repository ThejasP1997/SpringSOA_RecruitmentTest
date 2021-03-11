({
	onChangeSearchTextHelper : function(component, event){
        var searchInput = component.get('v.selectedLabel');
        if($A.util.isUndefinedOrNull(searchInput))
        {
            searchInput = '';
        }
        var comp = component.find('typeahead-input');
        var searchResult = [];
        var retrieveOptions = component.get("c.getSearchedArray");
            
        retrieveOptions.setParams({objName : component.get("v.objName"), searchTerm : searchInput});
        retrieveOptions.setCallback(this,function(response){                          
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                searchResult = JSON.parse(response.getReturnValue());
                component.set('v.searchResult',searchResult);
                if(searchResult.length == 0){
                    component.set("v.showNoResults", true);
                }
                else{
                    component.set("v.showNoResults", false);
                }
                var allOptions = component.find('availableOptions');
                $A.util.removeClass(allOptions, 'slds-hide'); 
            } 
        });
        $A.enqueueAction(retrieveOptions);

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
    }
})
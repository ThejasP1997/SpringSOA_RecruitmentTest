public class LightningUtility {

    /**  
        @MethodName : fieldAccessibleCheck
        @Description: Perform field accessibilty check
    **/
    public static void fieldAccessibleCheck(Set<String> fieldsToCheck, String objName, Boolean isReadCheck, Boolean isCreateCheck, Boolean isWriteCheck)
    {
        Map<String,Schema.SObjectField> fieldDescribeTokens = Schema.getGlobalDescribe().get(objName).getDescribe().fields.getMap();
        String strFldName;
        for(String fldNameExist : fieldDescribeTokens.keySet()) 
        {
            strFldName = fieldDescribeTokens.get(fldNameExist).getDescribe().getName().toLowerCase();
            if(fieldsToCheck.contains(strFldName))
            {
                if( isReadCheck && !fieldDescribeTokens.get(strFldName).getDescribe().isAccessible() || 
                    (strFldName != 'id' && strFldName != 'name' &&
                    (   (isWriteCheck && ! fieldDescribeTokens.get(strFldName).getDescribe().isUpdateable()) 
                        || 
                        (isCreateCheck && ! fieldDescribeTokens.get(strFldName).getDescribe().isCreateable())
                    )
                    )
                    )
                {
                    throw new AuraHandledException(objName + '.' + strFldName + ' is not accessible/writable');  
                }
            }
        }
    }
    
    /**  
        @MethodName : fetchTabIconDetails
        @Param      : Object Name
        @Description: Fetch ICON details using describeTabs
    **/
    public static TabIconDetails fetchTabIconDetails(String objName)
    {
        TabIconDetails objIconDetail;
        String iconName, colorCode, typeOfObj;
        typeOfObj = objName.contains('__c') ? 'custom':'standard';
        for(Schema.DescribeTabSetResult tsr : Schema.describeTabs()) 
        {
            for(Schema.DescribeTabResult tr : tsr.getTabs()) 
            {
                if(tr.getSobjectName() == objName)
                {
                    for(Schema.DescribeIconResult icon : tr.getIcons())
                    {
                        System.debug('getUrl: ' + icon.getUrl());
                        if(icon.getUrl().contains('.svg'))
                        {
                            List<string> iconUrlStrList = icon.getUrl().split('.svg')[0].split('/');
                            System.debug('getColors: ' + tr.getColors());
                            for(Schema.DescribeColorResult clr: tr.getColors())
                            {
                                // extract color code for the SVG Icon to be displayed in lightning component.
                                if(clr.getTheme() == 'theme4')
                                {
                                    colorCode = clr.getColor();
                                }
                            }
                            // extract ICON Name
                            iconName = iconUrlStrList[iconUrlStrList.size()-1];
                            objIconDetail =  new TabIconDetails(iconName.toLowerCase(), typeOfObj, colorCode); 
                            return objIconDetail;
                        }
                    }
                }
            }
        }
        /** In fallback mode when:
            - no tab is present for the object 
            or 
            - tab is not added into any app, 
            display an account icon 
        **/ 
        objIconDetail =  new TabIconDetails(objName.toLowerCase(), typeOfObj, 'a094ed');
        return objIconDetail;
    }
    
    public class TabIconDetails
    {
        @AuraEnabled
        public String iconName  {   get;set;    }
        @AuraEnabled
        public String colorCode {   get;set;    } 
        @AuraEnabled
        public String typeOfObj {   get;set;    }
        public TabIconDetails(String iconName, String typeOfObj, String colorCode)
        {
            this.typeOfObj = typeOfObj;
            this.iconName = iconName;
            this.colorCode = colorCode;
        }
    }
}
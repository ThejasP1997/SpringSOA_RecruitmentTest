public class FileUploadRestrictionTriggerHandler{

public static void errorInuploadFile(List<ContentDocumentLink> attchmntList)
{
    try{
    If(attchmntList.size() > 0){
    for(ContentDocumentLink attchmnt : attchmntList)
    {
        System.debug('contentDocument==>'+attchmnt);
    }
    
    //Query to get the extension and their size respectively from custom settings
    List<uploadFileRestriction__c> strList = [select fileExtension__c from uploadFileRestriction__c];

    String strExtensionSize = '';

    Map<String,String> extensionMap = new Map<String,String>();

    for(uploadFileRestriction__c upload : strList)
    {
        strExtensionSize +=upload.fileExtension__c;
    }
    
    List<Id> ContentDocumentId = new List<Id>();

    for(ContentDocumentLink cntDocLink : attchmntList)
    {
        ContentDocumentId.add(cntDocLink.ContentDocumentId);
        System.debug('ContentDocumentId=>'+ContentDocumentId);
    }
    
    //Query for fetching the extension and size of the uploaded file 
    List<ContentVersion> contentType = [select FileExtension,ContentSize from ContentVersion  where
                                        ContentDocumentId IN :ContentDocumentId];
    System.debug('contentType=>'+contentType);

    List<String> stringOfExtensionSize = strExtensionSize.split(',');

    List<List<String>> ExtensionSizeList = new List<List<String>>();

    for(String extnsnSize : stringOfExtensionSize)
    {
        ExtensionSizeList.add(extnsnSize.split('-'));
    }
    //putting the extension and their size into the map respectively

    for(List<String> extnsnSize : ExtensionSizeList)
    {
        extensionMap.put(extnsnSize[0],extnsnSize[1]);
    }
    //Throwing error at the time of unsupported file upload 

    for (ContentVersion contntVrsion :contentType) 
    { 
        System.debug('forloop==>'+contntVrsion);
        if(!extensionMap.containsKey(contntVrsion.FileExtension)){
        //System.debug('contntVrsion==>'+contntVrsion.FileExtension);
            //for(ContentDocumentLink cont : attchmntList)
            //{
                //ContentVersion actualRecord = new ContentVersion();
                //actualRecord = Trigger.newMap.get(contntVrsion.Id);
                //contntVrsion.addError('File having this extension could not be attached,Please try some other extension.'); 
                ApexPages.addMessage(new ApexPages.Message(ApexPages.severity.ERROR,'File having this extension could not be attached,Please try some other extension.'));
            //}
        } 
        else if(contntVrsion.ContentSize > Integer.valueOf(extensionMap.get(contntVrsion.FileExtension)))
        {
            System.debug('contgentSize==>'+contntVrsion.ContentSize);
            //for(ContentDocumentLink cont : attchmntList)
            //ContentVersion actualRecord = Trigger.newMap.get(contntVrsion.Id);
            //contntVrsion.addError('Cannot attach file size greater than 2MB.'); 
            ApexPages.addMessage(new ApexPages.Message(ApexPages.severity.ERROR,'Cannot attach file size greater than 2MB.'));
            //}
        }
    }
    
}
}catch(Exception e){
    System.debug('ERRORMSG=>'+e.getMessage());
    ApexPages.addMessage(new ApexPages.Message(ApexPages.severity.ERROR,e.getMessage()));
}
}
}
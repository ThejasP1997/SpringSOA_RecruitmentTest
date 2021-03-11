public with sharing class SampleLookupController {
    
    private final static Integer MAX_RESULTS = 15;
    
    @AuraEnabled(cacheable=true)
    public static List<LookupSearchResult> search(String searchTerm, List<String> selectedIds) {
        // Prepare query paramters
        searchTerm += '*';
        
        // Execute search query
        List<List<SObject>> searchResults = [FIND :searchTerm IN ALL FIELDS RETURNING
                                             Skills__c (Id, Name, Skills_ID__c WHERE id NOT IN :selectedIds)
                                             
                                             LIMIT :MAX_RESULTS];
        
        // Prepare results
        List<LookupSearchResult> results = new List<LookupSearchResult>();
        
        // Extract Accounts & convert them into LookupSearchResult
        String accountIcon = 'custom:Skills__c';
        Skills__c [] accounts = ((List<Skills__c>) searchResults[0]);
        for (Skills__c account : accounts) {
            results.add(new LookupSearchResult(account.Id, 'Skills__c', accountIcon, account.Name,account.Skills_ID__c));
        }
        
        return results;
    }
}
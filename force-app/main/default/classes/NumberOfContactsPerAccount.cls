public class NumberOfContactsPerAccount {
    List<Account> accList = [select id,Number_of_Contacts__c,(select id from contacts)  from Account];
    
}
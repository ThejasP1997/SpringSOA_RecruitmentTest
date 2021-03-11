public class ContactAndLeadSearch {
    public static List<List< SObject>> searchContactsAndLeads (String str){
        Contact con = new Contact(LastName='Smith');
        insert con;
        Lead ld = new Lead(LastName='Smith',Company='test');
        insert ld;
        List<List<sobject>> searchList = [Find 'Smith' in ALL Fields returning Contact(FirstName,LastName),Lead(FirstName,LastName)];
        Lead[] searchAccounts = (Lead[])searchList[1];
		Contact[] searchContacts = (Contact[])searchList[0];
        return searchList;
        
    }

}
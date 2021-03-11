public class ContactSearch {
    public static List<Contact> searchForContacts (String one, String two){
        List<Contact> con = [select id,NAme,LastName from contact where LastName Like :one and MailingPostalCode Like:two];
        return con;
        
    }
    

}
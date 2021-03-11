public class AccountHandler {
    /*public static Account insertNewAccount(String acc_name){
        Id accId;
        Account act = new Account();
        try{
            if(!acc_Name.equals('')){
                
                
                Account acc = new Account(Name = acc_name);
                List<Account> acclist = new List<Account>{acc};
                    Database.SaveResult[] srList = Database.insert(accList, false);
                //insert acc;
                for(Database.SaveResult sr : srList){
                    if (sr.isSuccess()) {
                        // Operation was successful, so get the ID of the record that was processed
                        //System.debug('Successfully inserted contact. Contact ID: ' + sr.getId());
                        accId = sr.getId();
                    } else {
                        // Operation failed, so get all errors
                        //for(Database.Error err : sr.getErrors()) {
                        //System.debug('The following error has occurred.');
                        //System.debug(err.getStatusCode() + ': ' + err.getMessage());
                        //System.debug('Contact fields that affected this error: ' + err.getFields());
                        return null;
                        //}
                    }
                }
                act = [select id,Name from Account where id=:accId];
                return act;
                
            }
            else return null;
        }catch(DMLException e){
            //return act;
        }
        return act;
    } */
    
}
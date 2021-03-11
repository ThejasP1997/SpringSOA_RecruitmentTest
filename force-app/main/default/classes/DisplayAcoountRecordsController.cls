/*----------------------------------------------------------------------------------*/
/*
 * Controller Name: DisplayAcoountRecordsController
 * Descripton: Controller To display 10 most recently created Account records.
 * Called by Component Name: DisplayAccountRecordsComponent.cmp
 * 
/*----------------------------------------------------------------------------------*/

public class DisplayAcoountRecordsController {
    
    //Controller to display 10 recently created Account Records
    @AuraEnabled
    public static List<Account> getAccountRecord()
    {
        return new List<Account>([Select id,Name,Phone,BillingCountry,BillingCity from Account order by CreatedDate desc LIMIT  10]);
    }
}
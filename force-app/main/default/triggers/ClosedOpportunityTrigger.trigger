trigger ClosedOpportunityTrigger on Opportunity (after insert,after update) {
    List<Task> tk = new List<Task>();
    //List<Opportunity> optyList = []
    for(Opportunity opty : [select id,StageName  from Opportunity where ID In: Trigger.new]){
        
        if(opty.StageName  == 'Closed Won'){
            Task t = new Task();
            t.WhatId = opty.id;
            t.subject = 'Follow Up Test Task';
            tk.add(t);
            
        }
    }
    insert tk;

}
trigger ContentDocumentRestriction on ContentDocument (before insert,before update) {
    for(ContentDocument cont: Trigger.new){
        System.debug('cont=>'+cont);
        if(cont.ContentSize > 7138767){
            cont.addError('Get Lost. Heavy File!!');
        }
    }
}
const { Datastore } = require('@google-cloud/datastore');

const datastore = new Datastore({
  projectId: process.env.PROJECTID,
  keyFilename: './keyfile.json'
});

module.exports = {

insert_bcti_doc_details: async (params) => { 
return new Promise((resolve,reject) => {
    const bcti_data = {
        INVOICE_NUMBER: 'BCTI_113001913',
        VENDOR: 'Elders_3 Rural Services Aust Ltd',
        DOC_NAME: '113001913.pdf',
        DOC_NO: '113001913',
        EMAIL_ID: 'xyz3@gmail.com',       
        IS_EMAILED: 'false',
        IS_PRINTED: 'false',
        IS_EXCEPTION: 'false',
        EXCEPTION_REMARKS: '',
        TYPE: 'BCTI',
        CREATED_DATETIME: new Date().toISOString().
                  replace(/T/, ' ').      
                  replace(/\..+/, '')         
    };
    datastore.save({
        key: datastore.key('BCTI_DOC_DETAILS_NEW'),
        data: bcti_data,
    }).then((resp) => {
        console.log('successfully data saved to Datastore');   
        console.log(resp[0].mutationResults[0].key["path"][0].id);
        resolve(resp);
    }).catch((error) => {
        console.log('\nError occurred in datastore.js/insert_bcti_doc_details.');

        if (error.stack) {
            console.error(error.stack);
        } else {
            console.error(error);
        }        
    });
});
},


insert_po_doc_details: async (params) => { 
    let formatted_date = new Date().toISOString().
                  replace(/T/, ' ').      
                  replace(/\..+/, '') ;

return new Promise((resolve,reject) => {
    const po_data = {
        INVOICE_NUMBER: 'PO_12231913',
        VENDOR: 'Rural2 Services Aust Ltd',
        DOC_NAME: 'PO_12231913.pdf',
        DOC_NO: '12231913',
        EMAIL_ID: 'abc2@gmail.com',       
        IS_EMAILED: 'false',
        IS_PRINTED: 'false',
        IS_EXCEPTION: 'false',
        EXCEPTION_REMARKS: '',
        TYPE: 'PO',
        CREATED_DATETIME: formatted_date         
    };
    
    console.log('Current date : ' + formatted_date);
    
    datastore.save({
        key: datastore.key('PO_DOC_DETAILS_NEW'),
        data: po_data,
    }).then((resp) => {
        console.log('successfully po data saved to Datastore');        
        resolve(resp);
    }).catch((error) => {
        console.log('\nError occurred in datastore.js/insert_po_doc_details.');

        if (error.stack) {
            console.error(error.stack);
        } else {
            console.error(error);
        }        
    });
});
},

insert_credit_doc_details: async (params) => { 
return new Promise((resolve,reject) => {
    const credit_data = {
        INVOICE_NUMBER: 'CR_11201913',
        VENDOR: 'Services1 Aust Ltd',
        DOC_NAME: '11201913.pdf',
        DOC_NO: '11201913',
        EMAIL_ID: 'pqr1@gmail.com',       
        IS_EMAILED: 'false',
        IS_PRINTED: 'false',
        IS_EXCEPTION: 'false',
        EXCEPTION_REMARKS: '',
        TYPE: 'CREDIT NOTE',
        CREATED_DATETIME: new Date().toISOString().
                  replace(/T/, ' ').      
                  replace(/\..+/, '')         
    };
    datastore.save({
        key: datastore.key('CREDIT_DOC_DETAILS_NEW'),
        data: credit_data,
    }).then((resp) => {
        console.log('successfully data saved to Datastore');        
        console.log(resp);
        resolve(resp);
    }).catch((error) => {
        console.log('\nError occurred in datastore.js/insert_credit_doc_details.');

        if (error.stack) {
            console.error(error.stack);
        } else {
            console.error(error);
        }        
    });
});
}
	
}

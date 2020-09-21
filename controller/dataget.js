const {
    Datastore
} = require('@google-cloud/datastore');
var async = require("async");

const ds = new Datastore({
    projectId: process.env.PROJECTID,
    keyFilename: './keyfile.json'
});

module.exports = {

    get_waitingtoprint_data: async function(req, res) {
        try {

            var doc_arr = new Array();
            var bcti_doc = new Object();

            const q = ds.createQuery('BCTI_DOC_DETAILS_NEW');
            await ds.runQuery(q, (err, entities) => {
                if (err) {
                    console.log(err);
                    return;
                }

                async.forEach(entities, function(data) {
                    // console.log('data........');
                    // console.log(data);
                    var docObj = new Object();                    
                    docObj["VENDOR"] = data.VENDOR;
                    docObj["TYPE"] = data.TYPE;
                    docObj["INVOICE_NUMBER"] = data.INVOICE_NUMBER;
                    docObj["CREATED_DATETIME"] = data.CREATED_DATETIME;                    

                    doc_arr.push(docObj);
                    // console.log('inside....');
                    // console.log(doc_arr);
                });    
                
            // console.log('outside....');
            // console.log(doc_arr);
            bcti_doc["data"] = doc_arr;
            console.log(bcti_doc);
            res.render('waitingtoprint', {data: bcti_doc.data});                            
            });
        } catch (error) {
            console.log('\nError occurred in dataget.js/get_bcti_docs: ');

            if (error.stack) {
                console.error(error.stack);
            } else {
                console.error(error);
            }
        }
    },

    get_po_docs: async function(req, res) {
        try {
            const q = ds.createQuery('PO_DOC_DETAILS');
            ds.runQuery(q, (err, entities) => {
                if (err) {
                    console.log(err);
                    return;
                }

                var po_doc_arr = new Array();
                var po_doc = new Object();

                async.forEach(entities, function(data) {
                    var docObj = new Object();
                    docObj["PO_SEQ_NO"] = data.PO_SEQ_NO;
                    docObj["DOC_NAME"] = data.DOC_NAME;
                    docObj["DOC_NO"] = data.DOC_NO;
                    docObj["GCS_ID"] = data.GCS_ID;
                    docObj["CREATED_DATETIME"] = data.Date;

                    po_doc_arr.push(docObj);
                });

                po_doc["data"] = po_doc_arr;
                console.log(po_doc);
                res.json(po_doc);
            });
        } catch (error) {
            console.log('\nError occurred in dataget.js/get_po_docs: ');

            if (error.stack) {
                console.error(error.stack);
            } else {
                console.error(error);
            }
        }
    }
}
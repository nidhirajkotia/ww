const express = require("express");
var router = express.Router();

// var exphbs = require('express-handlebars');
const Authentication = require("../controller/auth");
const mailinbox = require("../controller/mailinbox");
const datastore = require("../controller/datastore");
const dataget = require("../controller/dataget");
const sendattachmentmail = require("../controller/sendattachmentmail");

// Define the route for home page
router.get('/', function(req, res) {
	console.log('Inside root');
    res.render('home');
});

// Define the route to read the PO documents

const auth = new Authentication();

router.get("/api_save_bcti_docs", auth.getauth, mailinbox.save_bcti_docs);

router.get("/waitingtoprint", function (req, res) { 	
	console.log('inside');
   dataget.get_waitingtoprint_data(req,res);
});

// router.get("/api_get_waitingtoprint", function (req, res) {  
//    dataget.get_po_docs(req,res);
// });

router.get("/api_upload", function (req, res) {  
   sendattachmentmail.save_attachment_in_storage(req,res);
});

router.get("/api_insert_po_doc_details", datastore.insert_po_doc_details);

router.get("/api_insert_bcti_doc_details",auth.getauth, datastore.insert_bcti_doc_details);

router.get("/api_insert_credit_doc_details",auth.getauth, datastore.insert_credit_doc_details);

// Define the route to read the BCTI documents
// router.get("/api_bcti_docs", mailinbox.list_bcti_docs);

// Define the route to read the CREDIT NOTES
// router.get("/api_credit_notes", mailinbox.list_credit_notes);

// Define the route to get the MATCHED documents
// router.get("/api_matched_docs", mailinbox.list_matched_docs);

// Define the route to get the list of EXCEPTIONS
// router.get("/api_exceptions", mailinbox.list_exceptions);

// Define the route to send the mail
// router.get("/api_sendmail", mailinbox.flightsearch_airport);

// Allow the function to be called like a function when required
module.exports = router;

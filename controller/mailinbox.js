// final code of mailinbox
const fs = require('fs');
var Promise = require('promise');
const readPDF = require("./pdfReader");
const db = require("./datastore");
const {Storage} = require('@google-cloud/storage');
const {
    google
} = require('googleapis');

var gmail = google.gmail('v1');
var cheerio = require('cheerio');
const sendMail = require("./sendattachmentmail");
//const Multer = require('multer');
var attachmentcontentarr = [];
var auth = '';
var isCreditNote = false;

module.exports = {

    save_bcti_docs: async (req, res) => {

        var promiseArray= [];

        //var query = "from:noreply@github.com is:unread";
        var query = "from:rjadav101@gmail.com";
        //var query = "from:nidhi.b999@gmail.com";
        var auth = res.locals.authdata;
        var gmail = google.gmail('v1');
        gmail.users.messages.list({
            auth: auth,
            userId: 'me',
            maxResults: 1,
            q: query
        }, async function(err, response) {
            if (err) console.log(err);
            var data = response.data.messages;
            if (data.length) {
                data.forEach((data) => {
                    promiseArray.push(readMail(data, auth));
                });
                Promise.all(promiseArray).then(function(resp) {
                    //console.log(resp[0]);
                    var maildata = resp[0];
                     maildata.forEach((data) => {
                        //sendMail.sendEmailWithAttachments(data, req, res);
                    });
                    res.send("success");
                })
            }
        });
    }
}

/**
 * Lists the labels in the user's account.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function readMail(messageID, auth) {

    return new Promise((resolve, reject) => {
        gmail.users.messages.get({
            auth: auth,
            userId: 'me',
            id: messageID.id
        }, function(err, response) {
            try {
                if (response.data != undefined && response.data.snippet != undefined) {
                    let body = response.data.snippet;
                    let bodyarr = body.split(' ');
                    console.log('Body arr issssss......');
                    console.log(bodyarr);
                    let invoicenumber, creditnumber, email = '', isException = false, exceptionRemarks = '';
                    if (bodyarr[0] == 'Invoice') {
                        invoicenumber = bodyarr[1];
                    }
                    else if (bodyarr[1] == 'Credit') {
                        creditnumber = bodyarr[1];
                        isCreditNote = true;
                    }

                    email = bodyarr[2];
                    console.log('Email........');
                    console.log(email);
                    if(email == undefined || email == '') {
                        isException = true,
                        exceptionRemarks = 'No Email Id';
                    }

                    let params = {
                            auth: auth,
                            userId: 'me',
                            message: response.data,
                            invoicenumber: invoicenumber,
                            creditnumber: creditnumber,
                            email: email,
                            isException: isException,
                            exceptionRemarks: exceptionRemarks
                        }

                    if (response.data.payload != undefined && response.data.payload.parts != undefined) {
                        
                        getAttachments(params).then(function(resp) {
                            resolve(resp);
                        });

                    } else {
                        console.log('No attachment found');
                        params.exceptionRemarks = 'No atatchment found';
                        resolve(params);
                    }
                }
            } catch (err) {
                console.log(err);
                reject(messageID.id);
            }
        });
    });
}


function getAttachments(params) {
    return new Promise(resolve => {
        var parts = params.message.payload.parts;
        var attachmentarray = [];
        if (parts !== undefined) {
            for (var i = 0; i < parts.length; i++) {
                var part = parts[i];
                if (part.filename && part.filename.length > 0) {
                    attachmentarray.push(readAttachment(params, part))
                }
            }

            if (attachmentarray.length > 0) {
                Promise.all(attachmentarray).then(function(res) {
                    console.log("success getAttachments ********");
                    resolve(res);
                })
            }

        } else {
            resolve("no attachment found");
        }
    });

}

function readAttachment(params, part) {
    return new Promise((resolve, reject) => {
        var request = gmail.users.messages.attachments.get({
            auth: params.auth,
            'id': part.body.attachmentId,
            'messageId': params.message.id,
            'userId': params.userId
        }, async function(err, response) {
            try {
                if (response !== undefined && response.data !== undefined && response.data.data !== undefined) {
                    let buff = new Buffer.from(response.data.data, 'base64');
                    let obj = await readPDF.pdfReader(buff);
                                        
                    params.attachment = response.data.data; 
                    params.docinvoicenumber = obj.invoicenumber;
                    params.vendor = obj.vendor;
                    params.documentname = part.filename;

                    console.log('Inside mail inbox');
                    console.log(params);
                    //save_attachment_in_storage(buff, params.documentname);
                    if(isCreditNote){
                        let save_credit_doc_details = await db.insert_credit_doc_details(params);    
                    }
                    else{
                        let save_bcti_doc_details = await db.insert_bcti_doc_details(params);    
                    }
                    
                    resolve(params);
                } else {
                    resolve('Not any Attachment');
                }
            } catch (err) {
                console.log(err);
                reject('error in readAttachment');
            }
        });

    });
}

function save_attachment_in_storage(buff, filename) {
    console.log('inside storage');
     return new Promise(resolve => {
        const storage = new Storage({keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS});
        
        // A bucket is a container for objects (files).
        const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);
        //console.log('Bucket Name: ' + bucket);
        // Create a new blob in the bucket and upload the file data.
          const blob = bucket.file(filename).getMetadata().then(function (res){
            console.log('blob response');
            //console.log(res);
            resolve(res);
          });

          // blob.getmetadata().then(function (res){
          //   console.log('blob response');
          //   console.log(res);
          // });
                           
            // blob.save(buff).then(function(res){
            //     console.log('Attachment saved to cloud storageee');
            //     console.log(res);
            //     resolve("Attachment saved to cloud storage");
            // });            
    });
}
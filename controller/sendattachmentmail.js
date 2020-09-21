const {
    google
} = require('googleapis');

let gmail = google.gmail('v1');
const {Storage} = require('@google-cloud/storage');
const MailComposer = require('nodemailer/lib/mail-composer');
const fs = require('fs');
let auth = '';

module.exports = {

  sendEmailWithAttachments: async (data, req, res) => {

  // ----------nodemailer test----------------------------------------------------
  let auth = res.locals.authdata;

  let mail = new MailComposer(
    {
      to: "nrajkotiya@tcs.woolworths.com.au",
      text: "Test mail with attachment",
      html: " <strong> Test mail with attachment </strong>",
      subject: "Test email gmail-nodemailer-composer",
      textEncoding: "base64", 
      attachments: [
        {   // encoded string as an attachment
          filename: data.documentname,
          content: data.attachment,
          encoding: 'base64'
        }
        // {   // encoded string as an attachment
        //   filename: 'text2.txt',
        //   content: 'aGVsbG8gd29ybGQh',
        //   encoding: 'base64'
        // },
      ]
    });

  console.log('Mail content');
  console.log(mail);

  mail.compile().build( (error, msg) => {
    if (error) return console.log('Error compiling email ' + error);

    const encodedMessage = Buffer.from(msg)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const gmail = google.gmail({version: 'v1', auth});
    // console.log('Gmail Content:');
    // console.log(gmail);
    gmail.users.messages.send({
     
      userId: 'me',
      resource: {
        raw: encodedMessage,
      }
    }, (err, result) => {
      if (err) return console.log('NODEMAILER - The API returned an error: ' + err);

      console.log("NODEMAILER - Sending email reply from server:", result.data);
    });
  })
},

save_attachment_in_storage: async (req, res) => {
     return new Promise(resolve => {
        const storage = new Storage({keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS});
        console.log(storage);
        // const multer = Multer({
        //     storage: Multer.memoryStorage(),
        //     limits: {
        //         fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
        //     },
        // });

        // A bucket is a container for objects (files).
        const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);
        console.log('Bucket Name: ' + bucket.name);
        // Create a new blob in the bucket and upload the file data.

          const blob = bucket.file('51470761962020.pdf');
                    
          fs.readFile('./51470761962020.pdf', (err, content) => {         
            blob.save(content);
          });

          // console.log('blob');
          // console.log(blobStream);

          // blobStream.on('error', (err) => {
          //   next(err);
          // });

          // blobStream.on('finish', () => {
          //   // The public URL can be used to directly access the file via HTTP.
          //   const publicUrl = format(
          //     `https://storage.googleapis.com/${bucket.name}/${blob.name}`
          //   );
          //   console.log('Inside stream........');

          //   res.status(200).send(publicUrl);
          // });

          //blobStream.end(req.file.buffer);
        
    });

}

}
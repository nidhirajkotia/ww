const fs = require('fs');
const pdf = require('pdf-parse');
 
//let dataBuffer = fs.readFileSync('51470761962020.pdf');

module.exports = {
	pdfReader: async (PDFBuffer) => { 
	
	   return new Promise((resolve,reject) => {
		 try{
				pdf(PDFBuffer).then(function(data) {
					var content = data.text.split('\n');	
					var obj = {};					
					
					for( var k = 0; k < content.length; k++ ){
						if(content[k].indexOf('Invoice No') == 0)
						{
							obj.invoiceNumber = content[k].split(":")[1];
							break; 
						}
						if(content[k].indexOf('SUPPLIER ADDRESS') == 0)
						{																			
							obj.vendor = content[k+1];								
						}
					}

					resolve(obj);
				});
			}
			catch(err)
			{
				reject('error in read pdf');		
			}
		 });	
	}	
}
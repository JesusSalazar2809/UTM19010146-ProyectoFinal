const nodeMailer = require('nodemailer');
const hogan = require('hogan.js');
const fs = require('fs');
const path = require('path');

class Email {
    constructor(){
        this.transport = nodeMailer.createTransport({
            service:'gmail',
            auth:{
                user:"jesussalazar140100@gmail.com",
                pass:"Teamojessy2809"
            }
        });
    }

    sendEmail(email,data){
        return new Promise((resolve, reject) => {
            const template = fs.readFileSync(path.resolve(__dirname,'../assets/templatesHTML/welcomOnBoard.html'),'utf-8');
            const templateCompiled = hogan.compile(template);
            this.transport.sendMail({
                from:'"El choyas",<jesussalazar140100@gmail.com>',
                to: email,
                subject: "Envio de correo",
                html:templateCompiled.render(data)
            })
            .then((response)=>{
                resolve(response);
            })
            .catch((error)=>{
                reject(error);
            })
        })
    }
}

module.exports = new Email();
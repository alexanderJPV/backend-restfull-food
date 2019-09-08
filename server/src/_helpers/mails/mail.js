'use strict'

const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'xhosone@gmail.com',
        pass: 'informatica151'
    }
});

async function sendMail(pathParam, subject, url, user) {
    console.log('enviar mail');
    readHTMLFile(__dirname + pathParam, function (err, html) {
        const template = handlebars.compile(html);
        const replacements = {
            username: user.email,
            url: url
        };
        const htmlToSend = template(replacements);
        const mailOptions = {
            to: user.email,
            subject: subject,
            html: htmlToSend
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
    });
}

module.exports = {
    sendMail,
}
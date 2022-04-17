const mailer = require("nodemailer");
const getEmailData = (to, text, subject) => {
    return (data = {
        from: "React Authorization Bot <--------->",
        to: to,
        subject: subject,
        html: `<p>${text}</p>`,
    });
};
const sendEmail = (to, text, subject) => {
    const SMTPTransport = mailer.createTransport({
        service: "Gmail",
        auth: {
            user: "---------",
            pass: "---------",
        },
    });
    const mail = getEmailData(to, text, subject);
    SMTPTransport.sendMail(mail, (error, response) => {
        if (error) console.log(error);
        else console.log("Email sent successfully");
        SMTPTransport.close();
    });
};
module.exports = {sendEmail};

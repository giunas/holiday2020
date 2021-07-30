var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var nodemailer = require('nodemailer');

function inviaEmailLocatore(emailLocatore, oggetto, corpo) {
	sendEmail(emailLocatore, oggetto, corpo);
}

function inviaEmailAffittuario(emailAffittuario, oggetto, corpo) {
	sendEmail(emailAffittuario, oggetto, corpo);
}

function inviaEmailQuestura(emailLocatore, oggetto, corpo) {
	sendEmail(emailLocatore, oggetto, corpo);
}

function inviaEmailUfficioTurismo(emailLocatore, oggetto, corpo) {
	sendEmail(emailLocatore, oggetto, corpo);
}

function sendEmail(emailDest, oggetto, corpo) {
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'progwebemobile@gmail.com',
			pass: '12321343'
		}
	});

	var mailOptions;

	mailOptions = {
		from: 'progwebemobile@gmail.com',
			to: emailDest,
			subject: oggetto,
			html: corpo,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		}

		else {
			console.log('Email sent: ' + info.response);
		}
	});

}

module.exports={
  //sendEmailPdf: sendEmailPdf
  inviaEmailLocatore:inviaEmailLocatore,
  inviaEmailAffittuario:inviaEmailAffittuario,
  inviaEmailQuestura:inviaEmailQuestura,
  inviaEmailUfficioTurismo:inviaEmailUfficioTurismo
};
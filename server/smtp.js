// for test only!

Meteor.startup(function () {
//  process.env.MAIL_URL = 'smtp://ludo-sendgrid:tami22wilA@smtp.sendgrid.net:587';
//  process.env.MAIL_URL = 'smtp://SMTP_Injection:b5fe5f82b66f33e6a85b36248fc261aca5ebb402@smtp.sparkpostmail.com:587';
  process.env.MAIL_URL = "smtp://postmaster%40sandbox2c3d068cb2ba4a028b248eea5399ff6e.mailgun.org:cf47f1545131ccea68856b7e71459c58-b6183ad4-4a358367@smtp.mailgun.org:587";
});

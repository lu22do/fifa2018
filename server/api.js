Meteor.methods({
  sendVerificationLink() {
    let userId = Meteor.userId();
    console.log('sendVerificationLink for userId=' + userId);
    if (userId) {
      return Accounts.sendVerificationEmail(userId);
    }
  },

  sendTestEmail() {
    console.log('sendTestEmail');
    Email.send({
      to: "ephem22-fifatest1@yahoo.com",
      from: "no-reply@fifa2018otv.herokuapp.com",
      subject: "Test Email 2",
      text: "The contents of our email in plain text.",
    });
  },
});

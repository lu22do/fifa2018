import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import { SelectionList } from '../imports/ui/SelectionList.jsx';
import { Email as EmailComponent, Item, Span, A, renderEmail } from 'react-html-email'

var fs = Npm.require("fs");

Meteor.methods({
  sendVerificationLink() {
    let userId = Meteor.userId();
    console.log('sendVerificationLink for userId=' + userId);
    if (userId) {
      return Accounts.sendVerificationEmail(userId);
    }
  },

  sendTestEmail() {
    let selections = Selections.find({}, {sort:{score: -1, created: 1}, limit: 10}).fetch();
    let counter = 1;
    let ranking = 1;
    let prevScore = -1;

    selections = selections.map(selection => {
      const user = Meteor.users.findOne(selection.owner);

      if (selection.score != prevScore) {
        counter = ranking;
      }
      prevScore = selection.score;
      ranking++;

      selection.ownername = user ? user.username : "unknown",
      selection.rank = counter;
      selection.id = selection._id;
      return selection;
    });

    const title = 'FIFA2018 OTV - Top 10!';

    const headCSS =
      '.table { border-collapse: collapse; } ' +
      '.table th, .table td { padding: 4px; text-align: left; border-top: 1px solid #ddd; } ' +
      '* { font-family: sans-serif; font-size: 14px; }';

    const editorial = 'Today is an exceptional day with a total change in score thanks to Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

    const emailHTML = renderEmail(
      <EmailComponent title={title} headCSS={headCSS}>
        <Item align="center">
          <br/>
          <Span>
            Hello, hello, here is the top 10 as of today:
          </Span>

          <br/><br/>

          <SelectionList selections={selections}
            selectionCount={selections.length}
            compactLayout={true}
            gameState='started'
            renderEmail={true} />

          <br/>
          <Span>
            {editorial}
          </Span>

          <br/><br/>
          <Span>
            Full details on: <A href="http://www.fifa2018otv.com">www.fifa2018otv.com</A>.
          </Span>
        </Item>
      </EmailComponent>
    );

    //console.log('sendTestEmail write file');
    //fs.writeFileSync('/Users/lpierre/Downloads/mail.html', emailHTML);
    //return;

    // const emailHTML = ReactDOMServer.renderToStaticMarkup(
    //   <SelectionList selections={selections}
    //                  selectionCount={selections.length}
    //                  compactLayout={true}
    //                  gameState={'started'}
    //                  hideCreationDate={true} />));

    // Email.send({
    //   to: "ephem22-fifatest1@yahoo.com",
    //   from: "no-reply@fifa2018otv.herokuapp.com",
    //   subject: "Test Email 2",
    //   text: "The contents of our email in plain text.",
    // });

    // console.log('sendTestEmail: ' + emailHTML);

    Email.send({
      to: "ephem22-fifatest1@yahoo.com",
      from: "no-reply@fifa2018otv.com",
      subject: title,
      html: emailHTML
    });
  },
});

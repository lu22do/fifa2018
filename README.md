This is a fifa 2018 betting game developped using meteor/react/bootstrap. It is based on https://github.com/lu22do/accounts-boilerplate-react.

Concepts used in this app:
- Country - a country participating to the world cup
- Match - a real match that occurred, the result of the match contribute to the score of the country  
- Selection - each player create up to 3 selections made of countries, the score of the selection is the total of the scores of the countries that make it  

The UI react components are the following:
- App
- Topbar
- Auth:
  - Login
  - Register
- Users:
  - User list
- All selections  
- Your selections:
  - Selection list
  - New selection
  - Edit selection (missing)
- Matches
  - Match list
  - New match
  - Edit match

Todo:
- calculate score
- add leaderboard view
- add edit selection
- use radio button for winner
- use alphabetical order for selections
- max 3 selections

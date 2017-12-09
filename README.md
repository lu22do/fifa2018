This is a fifa 2018 betting game developped using meteor/react/bootstrap. It is based on https://github.com/lu22do/accounts-boilerplate-react.

Concepts used in this app:
- Team - a team participating to the world cup
- Match - a real match that occurred, the result of the match contribute to the score of the team  
- Selection - each player create up to 3 selections made of teams, the score of the selection is the total of the scores of the teams that make it  

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
- Team scores

Todo:
- add compact leaderboard view (all teams ordered by points)
- final point counting
- fix tracking of doc change

Other ideas:
- support email notifications

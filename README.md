This is a fifa 2018 betting game developped using meteor/react/bootstrap. It is based on https://github.com/lu22do/accounts-boilerplate-react.

Concepts used in this app:
- Team - a team participating to the world cup
- Match - a real match that occurred, the result of the match contribute to the score of the team  
- Selection - each player create up to 3 selections made of teams, the score of the selection is the total of the scores of the teams that make it  

The UI react components are the following:
- App
- Topbar
- Welcome
- Auth:
  - Login
  - Register
- Users (admin only)
  - User list
- Game state (admin only)
- All selections  
- Your selections:
  - Selection list/ranking
  - New selection
- Matches
  - Match list
  - New match
  - Edit match
- Team list

Improvement ideas:
- add support for reset password
- ask confirmation before deleting a selection

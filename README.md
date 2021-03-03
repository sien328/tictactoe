## Game of Tictactoe with React.js

npm run dev to start up dev environment, running the client and server concurrently.

The frontend is using react and backend server running with express. Used the reactstrap/bootstrap library for some quick styles.

## signup form
When email is submitted the, the data is passe to the server route /auth, then backend server makes an API to the tictactoe API. Generally we would make authentication calls from the backend, to keep sensitive data from being seen on the client. Here we are storing the response token, to session storage in the browser. Once token is stored, redirect route to /tictactoe. 


## Basic game of Tic-Tac-Toe,
1. Render board of 9 squares.
2. Wait for user click input
3. Update board state, check for game end, increment next turn.
4. Request move from API with token and board state, Repeat move #3
5. Repeat steps #2 - #4, till game ending condition is met.
6. Reset set game (reset state)

## Didn't does
Wasn't able to figure out "suggest a move", tried to use the same /engine endpoint but it doesn't seem to accept a board with a even number of moves. At one point there was a bug where the API call would place double move on one click (think i'm in the right direction). Will come back to the feature some other time.

Didn't focus much on the css or device repsonsiveness. 

## If had more time
- Would be fun to implement a full auth process, create account, login, lognout.
- If it was for production, would set up dev and prod, run commands.
- Add more css to make it look better, probably would not have use bootstrap prestyled components.


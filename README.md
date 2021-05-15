# Snake
Two-player snake game implemented with [p5.js] and [socket.io]

![Screenshot](./screenshots/snake.png)

[p5.js]: https://p5js.org
[socket.io]: https://socket.io


# Installation & build
```console
$ cd client && npm install && npm start
$ cd server && npm install && npm start
```


# Deployment
- **Client:** deployed on Github (see `gh-pages` branch served from `dist/` folder).
- **Server:** deployed on Heroku following [heroku-nodejs][this tutorial]:

```console
$ sudo snap install heroku --classic
$ heroku login
$ heroku create snake-two-players --region eu
$ git remote -v  # verify a remote was created for heroku
$ git subtree push --prefix server heroku master
```

[heroku-nodejs]: https://devcenter.heroku.com/articles/getting-started-with-nodejs?singlepage=true


# Structure
The application follows the Client-Server model, where these two components communicate using socket.io:

- **Server (for logic):**
  + Game loop
  + Move snake & place food
  + Collision detection

- **Client (for GUI):**
  + Paint snake and food

This type of architecture allows to have multiple clients (in different browser tabs) on the same game.


# Inspiration
Inspired by this [video tutorial][video-tutorial].

[video-tutorial]: https://www.youtube.com/watch?v=ppcBIHv_ZPs

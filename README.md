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

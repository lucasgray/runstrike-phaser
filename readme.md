# Runstrike-Game

This is the tower defense side of runstrike.

It is a companion project to a `react-native` augmented reality fitness game.  Resources gathered in that game will contribute towards the inventory in this game.   

To run locally:

`npm install && npm run dev`

Production webpack config is set up via a heroku postbuild hook.

`git push heroku` 

Assuming you have the standard heroku remote, assets will be built for production and the Procfile is set up to serve `./`

## Technologies used

* Phaser
* Typescript
* Webpack



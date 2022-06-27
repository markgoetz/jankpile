# Jankpile

Jankpile is a web app to help Magic: the Gathering players construct Brawl and Historic Brawl decks.  Players can search for commanders by color, select a commander, then add spells and lands to their deck.  Jankpile includes search features to help players find spells that go well with their commander, and also summarizes decks to help players know the right combination of lands to add.

Jankpile was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), and uses Redux Toolkit, Sass, and TypeScript.  It is also hosted on Netlify, using serverless functions to connect to the official [Scryfall API](https://scryfall.com/docs/api).

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode, running the serverless functions locally.  Open [http://localhost:8888](http://localhost:8888) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Code structure

Here is a quick description of each of the top-level folders in the `src` folder:
* `assets` - static image and font assets that get compiled into the app.
* `components` - React components used for the UI.  These are further subdivided according to which of the four main panels they belong to, or `common` if they're reused throughout the app.
* `definitions` - the Typescript definitions.
* `functions` - the main folder for the Netlify serverless functions.
* `lib` - utility functions used by both the client-side app and the serverless functions.
* `redux-modules` - the Redux slices, organized according to the Ducks pattern.
* `styles` - all CSS styles used by the application.  CSS should follow the [BEM](http://getbem.com/) and [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/) methodologies.

## Contributing

I'd love to get help developing Jankpile!  Please open a PR with me as a reviewer, making sure your code fits the style guidelines.

I also keep a [Trello board](https://trello.com/b/qKoQLARt/jankpile) with all of my planned updates to Jankpile.

# Monitoring Dashboard (Covid-19)

Solution developed in [React](https://reactjs.org) aimed at assisting patient monitoring.

**Requirements:**
* [Node](https://nodejs.org) (with npm)

## Installing dependencies

To run the app in the development mode or build the app, you need to install the app's dependencies.

```
npm install
```

## Running in the development mode

The app settings can be changed in the `public/settings.js` file.

```
npm start
```

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment

```
npm run build
```

Builds the app for production to the `build` folder.

After that the app settings can be changed in the `build/settings.js` file.

Your app is ready to be deployed!

For environments using Node, the easiest way to handle this would be to install [serve](https://github.com/zeit/serve) and let it handle the rest:

```
npm install -g serve
serve -s build
```

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Real-time data

Real-time data is obtained with a publish-subscribe pattern through a communication with a broker.

Settings, such as the broker's address, can be changed through the `settings.js` file mentioned in the previous sections.

The data obtained follows the topic names and patterns presented below:


- Topic name: **`oximeters/:id`**  
Message pattern:

        {
            beat: number,
            spo2: number,
            temp: number
        }


- Topic name: **`alerts/:id`**  
Message pattern:

        {
            alertType: number
        }

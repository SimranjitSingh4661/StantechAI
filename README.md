# React Native Starter Project

This is the base project structure for React Native apps. Whenever starting a new project, we use this as a starter project for the app, as it saves us time for initializing and setting up essential things. We take clone of this repo and follow the structure to start development.

### Prerequisites

- [Development-Setup](https://reactnative.dev/docs/environment-setup) - Follow the instruction on the link to setup you development envrionment for Mac, Windows or Linux.
- [Node](https://nodejs.org/en/blog/release/v16.14.2/) - v16.14.2

### Initializing Project

#### After you have completed above setup, continue to initialize your project:

- Clone this project and how to install them.

* Clone the repo

  ```sh
  git clone <REPO_URL>
  ```

* Install node modules

  ```sh
  npm install or yarn install
  ```

### Setting up Project env variables

- Use the .env.template file in your root directory, to create your .env.dev and .env.prod files.
- .env.dev - Store your development keys in this file.
- .env.prod - Store your production keys in this file.
- You can use the ENV variable in you code, by importing them like below:

  ```
  import Config from 'react-native-config';

  console.log(Config.<YOU_ENV_KEY>);
  ```

### Folder structure

This template follows a very simple project structure:

- `src`: Main folder contains all your source code

- `api`: Contains all your api code.

- `assets`: Contains all your project inuse assets and images.

- `components`: Contains common components which are used in your project.

- `constants`: Contains all the constant for the project for eg, enums, color and string constant.

- `navigation`: Your project routes navigator.

- `screen`: Contains all screen which are used in our project.

- `services`: Contain common services used in your project.

- `shared`: Contain common shared code for your project.

- `store`: Contains Redux actions and reducers code.

- `utils`: Contain Utility functions.

- `App.js`: Main component that starts your whole app.

- `index.js`: Entry point of your application as per React-Native standards.

### Running and Building the project

- Create your app build with Production and Staging

- Android

  - Running

    ```sh
    npm run android:dev
    npm run android:prod
    ```

  - Build APK

    ```sh
    npm run build:android:dev
    npm run build:android:prod
    ```

- iOS

  - Running

    ```sh
    npm run ios:dev
    npm run ios:prod
    ```

    You may also run the apo using Xcode, by selecting preferred environment scheme.

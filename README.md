# Climathon App

## Installation
##### Required:
* NodeJS
* Ionic 2 & Cordova

##### Steps:
1. Download Repository
2. Install dependencies

    ```
    cd <repositoryDirectory> && npm install
    ```
    
3. Create a file named config.ts and place it inside the config directory. The config file should contain your firebase config variable and should have the following form

    ```
    export var firebaseConfig = {
      apiKey: "<API_KEY>",
      authDomain: "<PROJECT_ID>.firebaseapp.com",
      databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
      storageBucket: "<BUCKET>.appspot.com",
      messagingSenderId: "<SENDER_ID>",
    };
    ```
    
4. Done!

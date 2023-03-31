import {Container} from 'pixi.js';
import { Maze } from './maze';

let queue = null;

export var Game = (function() {
    var instance;
    function createInstance(app) {
        var object = new GameInstance(app);
        return object;
    }
    return {
        getInstance: function(app) {
            if (!instance) {
                instance = createInstance(app);
            }
            return instance;
        }
    };
})();

class GameInstance {
    constructor(app) {
        this.app = app;
        app.stage.removeChildren();
        this.scene = new Container();
        this.scene.sortableChildren = true;
        this.scene.sortChildrenByZIndex = true;
        this.scene.scale.set(2);
        app.stage.addChild(this.scene);    
        app.resizeTo = window;
        this.maze = null;
        app.ticker.add(this.ticker, this)
    }



    start(level) {
        // if (this.app.ticker !== null) {
        //     // this.app.ticker.destroy();
        // }
        if (this.maze !== undefined && this.maze !== null) {
            this.maze.destroy();
        }

        console.log("ticker", this.app.ticker)
        console.log('start game', level);
        this.scene.removeChildren();
        this.maze = new Maze(`level${level}`);        
    }

    ticker(delta) {
        if (this.maze === null || this.maze.mouse === null || this.maze.mouse.sprite === null) {
            return;
        }
        const height = this.maze.height * 2;
        const width = this.maze.width * 2;
        const x = this.maze.mouse.sprite.x * 2;
        const y = this.maze.mouse.sprite.y * 2;
        const screen = this.app.view;

        const minX = (screen.width/4 - width);
        const minY = (screen.height/4 - height);
        const maxX = 0;
        const maxY = 0;

        // console.log(x, screen.width/4, width)    

        this.scene.x = -x + screen.width/8;
        this.scene.y = -y + screen.height/4;

        if (this.scene.x < minX) {
            this.scene.x = minX;
        }
        if (this.scene.y < minY) {
            this.scene.y = minY;
        }
        if (this.scene.x > maxX) {
            this.scene.x = maxX;
        }
        if (this.scene.y > maxY) {
            this.scene.y = maxY;
        }
    }
}


// create subcription to messager queue for start game
// queue = MessagerQueue.getInstance();
// queue.subscribe('startGame', () => {
//     this.start();
// });


// let x = 0;
// // save x to local storage
// localStorage.setItem('x', x);
// // get x from local storage
// x = localStorage.getItem('x');


// // save x to session storage
// sessionStorage.setItem('x', x);
// // get x from session storage
// x = sessionStorage.getItem('x');

// // save x to cookie
// document.cookie = `x=${x}`;
// // get x from cookie
// x = document.cookie.split(';').find((c) => c.includes('x=')).split('=')[1];

// // save x to indexedDB
// const db = new Dexie('myDatabase');
// db.version(1).stores({
//     myTable: 'id'
// });
// db.open().then(() => {
//     db.myTable.put({ id: x });
// }
// // get x from indexedDB
// db.myTable.get(1).then((x) => {
//     console.log(x);
// }

// // save x to firebase
// const db = firebase.firestore();
// db.collection('myCollection').doc('myDoc').set({ id: x });
// // get x from firebase
// db.collection('myCollection').doc('myDoc').get().then((doc) => {


// // save x to aws
// const db = new AWS.DynamoDB.DocumentClient();
// const params = {
//     TableName: 'myTable',
//     Item: {
//         id: x
//     }
// };
// db.put(params, (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// }
// // get x from aws
// const params = {
//     TableName: 'myTable',
//     Key: {
//         id: x
//     }
// };
// db.get(params, (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// }


// save x to persistant storage

// get x from persistant storage

// save x to local storage


// local storage is good for save file
import * as firebase from 'firebase';
import ApiKey from '../constants/ApiKey';

class Fire {
    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(ApiKey.firebaseConfig);
        }
        this.db = firebase.database();
    };

    signInWithEmailAndPassword(email, password) {
        return new Promise((res, rej) => {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(result => res("SUCCESS"))
                .catch(error => {
                    let errorMessage = error.message;
                    rej(errorMessage);
                });
        });
    };

    createUserWithEmailAndPassword(email, password, name) {
        return new Promise((res, rej) => {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(result => {
                    try {
                        let user = firebase.auth().currentUser;
                        if (user != null) {
                            user.updateProfile({
                                displayName: name
                            });
                            this.addNewUserToDatabase({
                                uid: user.uid,
                                name: name,
                                email: email,
                                password: password,
                            });
                        }
                        res("SUCCESS");
                    } catch (error) {
                        rej(error);
                    }
                })
                .catch(error => {
                    let errorMessage = error.message;
                    rej(errorMessage);
                });
        });
    };

    addNewUserToDatabase({ uid, name, email, password } = {}) {
        const user = {
            uid,
            name,
            email,
            password,
            created_at: Date.now(),
        }
        this.db.ref('users/' + uid).set(user);
    };

    getUserName() {
        const user = firebase.auth().currentUser;
        if (user) return user.displayName;
        return "Guest";
    };

    signOut() {
        return new Promise((res, rej) => {
            this.onUserSignOut();
            firebase.auth().signOut().then(function () {
                res('SUCCESS');
            }).catch(function (error) {
                rej(error);
            });
        });
    };

    onUserSignOut() {
        const user = firebase.auth().currentUser;
        if (user) {
            const uid = user.uid;
            this.db.ref('users/' + uid).update({
                last_log: Date.now(),
            });
        }
    };

    updateUserBasket(items) {
        return new Promise((res, rej) => {
            const user = firebase.auth().currentUser;
            if (user) {
                const uid = user.uid;
                this.db.ref('users/' + uid).update({
                    basket: items,
                });
                res("SUCCESS");
            } else {
                rej("NO USER");
            }
        });
    };

    getUserBasket() {
        return new Promise( (res, rej) => {
            const user = firebase.auth().currentUser;
            const items = [];
            if (user) {
                const uid = user.uid;
                this.db.ref(`users/${uid}/basket/`).once("value")
                    .then( snapShot => {
                        if (!snapShot) res(items); // return empty array
                        snapShot.forEach( snap => {
                            items.push(snap.val());
                        });
                        res(items);
                    });
            } else {
                rej(items); //return empty array
            }
        });
    };

    getCategories() {
        return new Promise((res, rej) => {
            const categories = [];
            this.db.ref('categories/').once('value').then(snapShot => {
                if (!snapShot) rej("No data in categories");
                snapShot.forEach(snap => {
                    categories.push(snap.val());
                });
                res(categories);
            });
        })
    };

    writeCategories() {
        const id = 2;
        const item = {
            id: id,
            name: "T-Shirt",
            count: 3,
            image: "https://dks.scene7.com/is/image/GolfGalaxy/19ADIMXSLVTDTXXXXATT_Active_Red_Black?qlt=70&wid=600&fmt=pjpeg"

        };
        this.db.ref('categories/' + id).set(item);
    };

    writeItems() {
        const catId = 2; //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        const newItemId = this.db.ref('categoryItems/' + catId).push().key;
        const item = {
            id: newItemId,
            name: "Vans Boys Vantasy Island Green T-Shirt",
            description: "Try out a tropical look and sport vibrant color with the Vantasy Island green t-shirt for youth from Vans. This green tee has no neckline tag and 100% cotton construction for a comfortable feel and features screen-printed graphics on the back of a palm tree, a yellow sun and a tropical flower with 'Vans, Off the Wall' in colorful lettering providing a lively look overall!",
            productDetails: `Boys Vantasy Island Green T-Shirt from Vans.
            Screen-printed logo graphic across the back.
            Tagless neckline for comfort.
            Ribbed crewneck collar.
            100% cotton.
            Machine wash cold, tumble dry low.
            Imported.`,
            price: 19.95,
            extraInfo: [{ color: "GREEN" }],
            rating: 4.7,
            gender: "m",
            images: [
                "https://scene7.zumiez.com/is/image/zumiez/pdp_hero/Vans-Boys-Vantasy-Island-Green-T-Shirt-_335900-front-US.jpg",
                "https://scene7.zumiez.com/is/image/zumiez/pdp_hero/Vans-Boys-Vantasy-Island-Green-T-Shirt-_335900-back-US.jpg",
                "https://scene7.zumiez.com/is/image/zumiez/pdp_hero/Vans-Boys-Vantasy-Island-Green-T-Shirt-_335900-alt2-US.jpg"
            ],
        };
        this.db.ref('categoryItems/' + catId + "/" + newItemId).set(item);
    };

    getCategoryItems(categoryId) {
        return new Promise((res, rej) => {
            const items = [];
            this.db.ref('categoryItems/' + categoryId)
                .once("value")
                .then(snapShot => {
                    if (!snapShot) rej(`No data in categoryItems/${categoryId}`);
                    snapShot.forEach(snap => {
                        items.push(snap.val());
                    });
                    res(items);
                });
        })
    };

};

const Firebase = new Fire();
Object.freeze(Firebase);

export default Firebase;


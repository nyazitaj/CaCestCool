/* import React from "react"; */

export default class MyFunctions {

    constructor() {
        // return 'Testy';
    }

    SignupUser = () => {
        document.querySelector('#signin').addEventListener('submit', function (e) {
            e.preventDefault();

            const myFormData = new FormData(this);

            for (var value of myFormData.values()) {
                console.log(value);
            }
        });
    }

    LoginUser = () => {
        return 'Logged in';
    }

}

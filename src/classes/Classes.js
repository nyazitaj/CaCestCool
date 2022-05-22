import React from 'react';
import logo from '../assets/images/CaCestCool.png';

const axios = require('axios').default;

export class Logo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <img src={logo} alt="CaCestCool" />
        );
    }
}

// This class exports all the golabal variables defined by developper
export const port = '3001';
import React from 'react';

interface IProps {
    name?: string
}

const Hello = (props: IProps) => {
    if (props.name) {
        return <h1>Hello, {props.name}!</h1>;
    } else {
        return <span>Hey, stranger</span>;
    }
}


export default Hello;

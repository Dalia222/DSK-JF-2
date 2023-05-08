import React from 'react';

const Home = (props) => {
    return (
        <div>
            <h1>Home {props.user.username}</h1>
        </div>
    );
}

export default Home;

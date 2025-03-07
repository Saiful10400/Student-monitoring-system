import React from 'react';
import gif from "../../../public/images/loader.gif"
const Loading = () => {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <img src={gif} alt="" />
        </div>
    );
};

export default Loading;
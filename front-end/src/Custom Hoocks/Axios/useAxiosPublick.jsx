import React from 'react';
import axios from 'axios';

export const axiosPublic=axios.create({
    // baseURL:"http://localhost:5000"
    baseURL:"https://manage-students-socket-server.glitch.me"
})

const useAxiosPublick = () => {
    return axiosPublic
};

export default useAxiosPublick;
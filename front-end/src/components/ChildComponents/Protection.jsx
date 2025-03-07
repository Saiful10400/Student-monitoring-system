import React, { useContext } from 'react';
import { dataProvider } from '../ContextApi/ContextProvider';
import Loading from './Loading';

const Protection = ({children}) => {
    const{user,loading}=useContext(dataProvider)
    
    // let's return depending on the situation.
    
    if(loading){
        return <Loading></Loading>
    } else{
        return children
    }
};

export default Protection;
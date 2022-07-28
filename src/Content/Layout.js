
import './Layout.css';
import '../material-design-iconic-font/css/material-design-iconic-font.min.css';

// import { useState } from 'react'
// import SongList from './content/SongList';
// import SongDetail from './content/SongDetail'
import Header from './Header'
import Main from './Main'
import {Files} from '../Context/AppContext'
// import Popup from './Popup'


function Layout(props){
    //  const [isDisplayPopup, setIsDisplayPopup] = useState(false) 
    return(
        <>     
        <Files.Provider value={[]}>
            <Header /> 
            <div className='content'>
                <div className='leftCol'></div>
                <Main />     
                <div className='rightCol'></div>
            </div>
            
        </Files.Provider>
        </>
    )
}

export default Layout
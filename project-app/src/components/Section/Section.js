import {Routes, Route} from 'react-router-dom';
import About from '../About';
import Home from '../Home';
import Products from '../Products';
import Contact from '../Contact/Contact';

import Login from '../admin/Login/Login';
import ContactView from '../admin/Contact/ContactView';
import ContactResponse from '../admin/Contact/ContactResponse';

import ClientList from '../admin/Client/ClientList';
import ClientAdd from '../admin/Client/ClientAdd';
import ClientUpdate from '../admin/Client/ClientUpdate';


function Section(){

    return(

        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/about' element={<About />}/>
            <Route path='/products/*' element={<Products />}/>
            <Route path='/Contact' element={<Contact />}/>
            
            <Route path='/user/login' element={<Login />}/>
            <Route path='/ContactView' element={<ContactView />}/>
            <Route path='/admin/contact/response/:idContact' element={<ContactResponse />}/>
          
            <Route path='/ClientList' element={<ClientList />}/>
            <Route path='/admin/ClientAdd' element={<ClientAdd />}/>
            <Route path='/admin/ClientUpdate/:idClient' element={<ClientUpdate />}/>

        </Routes>
    )

}

export default Section;
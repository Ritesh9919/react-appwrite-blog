import { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {login, logout} from './store/authSlice';
import authService from './appwrite/auth';
import {Header, Footer} from './components';
import {Outlet} from 'react-router-dom';



function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    authService.getCurrectUser()
    .then((userData)=> {
      if(userData) {
        dispatch(login({userData}));
      }else{
        dispatch(logout());
      }
    })
    .finally(()=> {
       setLoading(false);
    })
  },[]);

  return !loading?(
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ):null
}

export default App

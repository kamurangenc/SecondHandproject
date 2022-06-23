import React from 'react'
import { Button } from 'reactstrap';
import {auth} from '../../firebase'
import { useNavigate } from 'react-router-dom';

function SignOut() {
  const navigate = useNavigate();

  return (
    <div>
        <Button style={{width:'100px',height:'50px'}} onClick={() => auth.signOut().then((navigate('/login')))}>Çıkış Yap</Button>
    </div>
  )
}

export default SignOut
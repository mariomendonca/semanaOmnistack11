import React, {useState} from 'react'
import {FiLogIn} from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import './styles.css'

import api from '../../services/api'
//import heroesImg from '../../assets/heroes.png'
//<img src={heroesImg} alt="Heroes"/>
//import logoImg from '../../asstes/logo.svg'
//<img src={logoImg} alt="be the hero"/>

export default function Logon(){
    const [id, setId] = useState('')
    const history = useHistory()

    async function handleLogin(e) {
        e.preventDefault()

        try {
            const response = await api.post('sessions', {id})
            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.name)

            history.push('/profile')
        } catch (err) {
            alert('falha no login')
        }
    }

    return(
     <div className="logon-container">
         <section className="form">
            <form onSubmit={handleLogin}>
                <h1>Faça seu logon</h1>

                <input placeholder="Sua id"
                value={id}
                onChange={e => setId(e.target.value)}
                />
                <button className="button" type="submit">Entrar</button>

                <Link className="back-link" to='/register'><FiLogIn size={16} color="#E02041"/> Não tenho cadastro</Link>
            </form>          
         </section>
     </div>
    )
}
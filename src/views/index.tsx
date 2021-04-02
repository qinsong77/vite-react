import React from 'react'
import { Link } from 'react-router-dom'
import './index.less'
import logo from '../assets/logo.svg'
import { Divider } from 'antd'

function Index() {
    return (
        <div className='index-layout'>
            <header>
                <div className='header-container'>
                    <div className='header-right'>
                        <img src={logo} className='container-logo' alt='logo' />
                        <h3>Notend</h3>
                        <Link to='/main'>main</Link>
                        <Link to='/chat'>chat</Link>
                        <Link to='/redirect'>redirect_to_main</Link>
                    </div>
                    <ul>
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                        <Divider type='vertical' />
                        <li>
                            <Link to='/register'>Register</Link>
                        </li>
                    </ul>
                </div>
            </header>
        </div>
    )
}

export default Index

import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Loader from './Loader';
const { Header } = Layout;
const Nav = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(localStorage.getItem('email'));
    const [loading, setLoading] = useState(false);
    const handleLogout = () => {
        setLoading(true);
        setTimeout(() => {
            localStorage.removeItem('auth');
            setAuth(null);
            setLoading(false);
            navigate('/');
        }, 100);
    }
    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem('auth'));
        setAuth(auth);
    }, [setAuth, navigate]);

    return (
        <>
            <Header>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    {!auth && <Menu.Item key="1"><Link to='/'>Home</Link></Menu.Item>}
                    <Menu.Item key="2"><Link to='/about'>About</Link></Menu.Item>
                    <Menu.Item key="3"><Link to='/contact'>Contact</Link></Menu.Item>
                    {auth && <Menu.Item key="4"><Link to='/' onClick={handleLogout}>Logout</Link></Menu.Item>}
                    {auth && <Menu.Item key="5">{auth.name}</Menu.Item>}
                </Menu>
            </Header>
            {loading && <Loader />}
        </>
    )
}

export default Nav;
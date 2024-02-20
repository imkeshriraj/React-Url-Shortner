import React, { useEffect, useState } from 'react';
import { Avatar, Button, Layout, Menu,Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Loader from './Loader';
const { Header } = Layout;
const {Title,Text} = Typography;
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
                <Avatar src='https://img.hotimg.com/1e66d29663bedce5a.png' style={{ width: '300px', height: '60px' }} shape='square'  />
                
                <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
                    {!auth && <Menu.Item key="1"><Link to='/'>Home</Link></Menu.Item>}
                    {/* <Menu.Item key="2"><Link to='/about'>About</Link></Menu.Item>
                    <Menu.Item key="3"><Link to='/contact'>Contact</Link></Menu.Item> */}
                </Menu>
               { auth && <div className='logout-wrapper'>
                     <Button onClick={handleLogout}>Logout</Button>
                     <Text strong>{auth.name}</Text>
                </div>}
            </Header>
            {loading && <Loader />}
        </>
    )
}

export default Nav;

import React from 'react';
import { Input, Button, Form, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const handleLogin = (value) => {
        setLoading(true);
        localStorage.setItem('auth', JSON.stringify(value));
        setTimeout(() => {
            const auth = JSON.parse(localStorage.getItem('auth'));
            if (auth.email) {
                navigate('/shorten-url');
                setLoading(false);
            }
        }, 1000);

    };

    return (
        <>
            <div className="loginWrapper">
                <div style={{ textAlign: 'center' }}>
                    <Title level={1}>Login</Title>
                    <Form onFinish={handleLogin}>
                        <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Please Enter Name' }]}>
                            <Input placeholder='Enter Your Name' size='large' />
                        </Form.Item>
                        <Form.Item name='email' label='Email' rules={[{ required: true, message: 'Please Enter Email' }, { type: 'email', message: 'Please Enter valid Email' }]}>
                            <Input placeholder='Enter Your Email' size='large' />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" size='large' loading={loading}>
                                Login
                            </Button>
                        </Form.Item>

                    </Form>
                </div>
            </div>
        </>
    );
}

export default Login;
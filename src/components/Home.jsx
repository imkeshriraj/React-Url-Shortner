import React, { useState, useEffect } from 'react';
import { Layout, Button, Typography, Input, Form, message, Table } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from './Loader';
const { Content, Footer } = Layout;
const { Title } = Typography;

const Home = () => {
    const [form] = Form.useForm();
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(false);
    const columns = [
        {
            title: 'S. No.',
            dataIndex: 'serialNumber',
            key: 'serialNumber',
            render: (text, record, index) => index + 1,
            width: '300',
        },
        {
            title: 'Short ID',
            dataIndex: 'shortId',
            key: 'shortId',
        },
        {
            title: 'Redirect URL',
            dataIndex: 'shortId',
            key: 'redirectUrl',
            render: text => <a href={`https://url-shortner-akn2.onrender.com/url/getShortUrl/${text}`} target='_short'>{`https://url-shortner-akn2.onrender.com/url/getShortUrl/${text}`}</a>,
            width: '200',
        },
        {
            title: 'Clicks',
            dataIndex: 'visitHistory',
            key: 'clicks',
            render: visitHistory => visitHistory.length,
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
    ];
    const handleSubmit = async (values) => {
        setLoading(true);
        const auth = JSON.parse(localStorage.getItem('auth'));
        const postData = {
            url: values.url,
            email: auth.email
        };
        try {
            const response = await axios.post('https://url-shortner-akn2.onrender.com/url/generate', postData);
            setShortenedUrl(`https://url-shortner-akn2.onrender.com/url/getShortUrl/${response.data.shortId}`);
            form.resetFields();
            fetchUrls();
            message.success("Short Url Generated");
            setLoading(false);
        } catch (error) {
            message.error('There was an error');
            setLoading(false);

        }

    };

    const handleClear = () => {
        setShortenedUrl('');
        form.resetFields();
    };
    const fetchUrls = async () => {
        setLoading(true);
        const auth = JSON.parse(localStorage.getItem('auth'));
        try {
            const response = await axios.post('https://url-shortner-akn2.onrender.com/url/getAllUrls', { email: auth.email });
            setUrls(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error, 'error')
            message.error(error.message);
        }
    };

    useEffect(() => {
        fetchUrls();
    }, []);
    return (
        <Layout className="layout">
            <Content style={{ padding: '50px', textAlign: 'center' }}>
                <Title level={2}>Welcome to Our URL Shortener</Title>
                <Form onFinish={handleSubmit} form={form} layout='vertical'>
                    <Form.Item label='original Url' name='url' rules={[{ required: true, message: 'Please enter Url' }]}>
                        <Input placeholder='Enter Url...' size='large' />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size='large'>
                            Generate
                        </Button>
                    </Form.Item>
                </Form>
                <Button onClick={handleClear} style={{ marginLeft: '10px', height: 'auto' }}>Clear</Button>
                {shortenedUrl && (
                    <div className='shortUrl-result'>
                        <Title level={2}>Your short URL:</Title>
                        <Title level={5} copyable color='#9290C3'>{shortenedUrl}</Title>
                        <Link to={shortenedUrl} target='_short'>Your Short Url </Link>
                    </div>
                )}
                <div style={{ marginBottom: '4rem' }}>
                    <Table
                        dataSource={urls}
                        columns={columns}
                        rowKey="_id"
                        pagination={false}
                    />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center', position: 'fixed', bottom: '0', width: '100%' }}>©2024 URL Shortener. All rights reserved by @imkeshriraj.</Footer>
            {loading && <Loader />}
        </Layout>
    );
}

export default Home;
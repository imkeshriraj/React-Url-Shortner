import React, { useState, useEffect } from 'react';
import { Layout, Button, Typography, Input, Form, message, Table, Tooltip } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import QRCode from 'qrcode.react';
const { Content, Footer } = Layout;
const { Title , Text} = Typography;

const Home = () => {
    const [form] = Form.useForm();
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(false);
    const generateQRCode = (url) => (
        <QRCode value={url} size={70} />
    );
    const formatDate = (dateString) =>{
        const date = new Date(dateString);
        const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        return date.toLocaleString('en-US', options);
    }

    const columns = [
        {
            title: 'S. No.',
            dataIndex: 'serialNumber',
            key: 'serialNumber',
            render: (text, record, index) => index + 1,
            width: 100,
        },
        {
            title: 'Original Url',
            dataIndex: 'redirectUrl',
            key: 'redirectUrl',
            render: text => (
                <Tooltip title={text}>
                    <a href={text} target='_short' style={{ display: 'inline-block', maxWidth: '160px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{text}</a>
                </Tooltip>
            ),
            ellipsis: true,
            width: 200
        },
    
        {
            title: 'Short Url',
            dataIndex: 'shortId',
            key: 'redirectUrl',
            render: text => <Tooltip key={text}><a href={`https://url-shortner-akn2.onrender.com/url/getShortUrl/${text}`} target='_short'>{`https://url-shortner-akn2.onrender.com/url/getShortUrl/${text}`}</a></Tooltip>,
            ellipsis: true,
        },
        {
            title: 'Clicks',
            dataIndex: 'visitHistory',
            key: 'clicks',
            render: visitHistory => visitHistory.length,
            width: 100
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: text => formatDate(text)
        },
        {
            title: 'QR Code',
            dataIndex: 'shortId',
            key: 'shortId',
            render: (text) => generateQRCode(`https://url-shortner-akn2.onrender.com/url/getShortUrl/${text}`),
            width: 300
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
        <Layout className="layout" >
            <Content style={{ padding: '50px', textAlign: 'center' }} className='home'>
            <Title level={1}>Simplify Your URLs</Title>
      <Text type="secondary" >Effortlessly create short, memorable links for your website or social media campaigns.</Text>
                <Form onFinish={handleSubmit} form={form} layout='vertical'>
                    <Form.Item label='Original Url' name='url' rules={[{ required: true, message: 'Please enter Url' }]}>
                        <Input placeholder='Enter Original Url...' size='large' />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size='large'>
                            Generate
                        </Button>
                    </Form.Item>
                </Form>
                {shortenedUrl && (
                    <div className='shortUrl-result'>
                        <Title level={2}>Your short URL:</Title>
                        <Link to={shortenedUrl} target='_short'>  <Title level={5} copyable color='#9290C3'>{shortenedUrl}</Title></Link>
                        <Button onClick={handleClear} style={{ marginLeft: '10px', height: 'auto' }}>Clear</Button>
                    </div>
                )}
                <div style={{ marginBottom: '4rem' }}>
                    <Table
                        dataSource={urls}
                        columns={columns}
                        rowKey="_id"
                        pagination={false}
                        scroll={{ x: true }}
                    />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center', position: 'fixed', bottom: '0', width: '100%' }}>©2024 URL Shortener. All rights reserved by <Link to='https://www.linkedin.com/in/imkeshriraj/' target='_blank'><Text strong style={{color:'blue'}} >@imkeshriraj.</Text> </Link></Footer>
            {loading && <Loader />}
        </Layout>
    );
}

export default Home;
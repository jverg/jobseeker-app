import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { loginUser } from '@services/login/login-http.service';
import styles from './Login.module.less';

const Login: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    type LoginValues = {
        email: string;
        password: string;
    };
    const onFinish = async (values: LoginValues) => {
        try {
            setLoading(true);
            const token = await loginUser(values.email, values.password);
            console.log(token);
            window.location.assign('/home');
            setLoading(false);
        } catch (requestError: any) {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={styles.wrapForm}>
            <Form
                name="login"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className={styles.formElement}
            >
                <Form.Item
                    label="Enter your email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input disabled={loading} placeholder='johndoe@email.com' />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password disabled={loading} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
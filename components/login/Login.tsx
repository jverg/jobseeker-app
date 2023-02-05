import React, { useState } from 'react';
import { Form, Input } from 'antd';
import loginUser from '@services/login/login-http.service';
import useNotification from '@hooks/notification/useNotification';
import StateEnum from '@constants/state.enum';
import UiButton from '@components/ui/button/UiButton';
import styles from './Login.module.less';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const [generalError] = useNotification(
    StateEnum.ERROR,
    'Something went wrong',
    'Oops, something went wrong, please try again later!',
  );

  type LoginValues = {
    email: string;
    password: string;
  };

  const onFinish = async (values: LoginValues) => {
    try {
      setLoading(true);
      const token = await loginUser(values.email, values.password);
      localStorage.setItem('user', JSON.stringify(token.user));
      localStorage.setItem('jwt', token.token.accessToken);
      window.location.assign('/');
      setLoading(false);
    } catch (requestError: any) {
      generalError();
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapForm}>
      <Form name="login" layout="vertical" onFinish={onFinish} autoComplete="off" className={styles.formElement}>
        <Form.Item
          label="Enter your email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input disabled={loading} placeholder="johndoe@email.com" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password disabled={loading} />
        </Form.Item>
        <Form.Item>
          <UiButton type="primary" size="small" htmlType="submit" onClick={() => {}}>
            Login
          </UiButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;

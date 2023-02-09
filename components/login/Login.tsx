import React, { useState } from 'react';
import { Form, Input } from 'antd';
import loginUser from '@services/login/login-http.service';
import useNotification from '@hooks/notification/useNotification';
import StateEnum from '@constants/state.enum';
import { useTranslation } from 'next-i18next';
import UiButton from '@components/ui/button/UiButton';
import Router from 'next/router';
import styles from './Login.module.less';

const Login: React.FC = () => {
  const { t: translate } = useTranslation(['common']);
  const [loading, setLoading] = useState(false);

  const [wrongCredentials] = useNotification(
    StateEnum.INFO,
    translate('notifications.wrong_credentials'),
    translate('notifications.wrong_credentials_try_again'),
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
      wrongCredentials();
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapForm}>
      <Form name="login" layout="vertical" onFinish={onFinish} autoComplete="off" className={styles.formElement}>
        <Form.Item
          label={translate('enter_your_email')}
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input disabled={loading} placeholder="johndoe@email.com" data-testid="email-input" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password disabled={loading} data-testid="password-input" />
        </Form.Item>
        <Form.Item>
          <UiButton type="primary" size="small" htmlType="submit" onClick={() => {}}>
            {translate('login')}
          </UiButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;

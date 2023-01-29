import React from 'react';
import { Layout, Image, Dropdown } from 'antd';
import UiButton from '@components/ui/button/UiButton';
import type { MenuProps } from 'antd';
import styles from './AppLayout.module.less';

const { Header, Content } = Layout;

type AppLayoutProps = { children: React.ReactNode };

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const items: MenuProps['items'] = [
    {
      label: 'Ελληνικά',
      key: '0',
      icon: <Image preview={false} src="/assets/svgs/greek-flag.svg" alt="Greek flag" />,
    },
    {
      label: 'Αγγλικά',
      key: '1',
      icon: <Image preview={false} src="/assets/svgs/greek-flag.svg" alt="Greek flag" />,
    },
  ];

  return (
    <>
      <Layout>
        <Header className={styles.wrapHeader}>
          <Image preview={false} src="/assets/svgs/kariera-logo.svg" alt="Kariera logo" />
          <div className={styles.wrapLogoutAndLang}>
            <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
              <div className={styles.wrapLanguageChange}>
                <Image
                  preview={false}
                  src="/assets/svgs/globe-icon.svg"
                  alt="Globe icon"
                  className={styles.globeImage}
                />
                <Image
                  preview={false}
                  src="/assets/svgs/greek-flag.svg"
                  alt="Greek flag"
                  className={styles.flagImage}
                />
              </div>
            </Dropdown>
            <UiButton
              type="primary"
              size="small"
              onClick={() => {
                localStorage.removeItem('jwt');
                window.location.assign('/login');
              }}
            >
              Logout
            </UiButton>
          </div>
        </Header>
      </Layout>
      <Content>{children}</Content>
    </>
  );
};

export default AppLayout;

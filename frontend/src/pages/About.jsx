import { Button, Result } from 'antd';

import useLanguage from '@/locale/useLanguage';

const About = () => {
  const translate = useLanguage();
  return (
    <Result
      icon={
        <img
          src="/ani-logo.png"
          alt="5star ERP"
          style={{ width: 140 }}
        />
      }
      title="5Star ERP System"

      subTitle={translate('Do you need help on customize of this app')}
      extra={
        <>
          <p>
            Website : <a href="https://github.com/DharmGadhiya">github.com</a>{' '}
          </p>
          <p>
            GitHub :{' '}
            <a href="https://github.com/DharmGadhiya">
              https://github.com/DharmGadhiya
            </a>
          </p>
          <Button
            type="primary"
            onClick={() => {
              window.open(`https://github.com/DharmGadhiya`);
            }}
          >
            {translate('Contact us')}
          </Button>
        </>
      }
    />
  );
};

export default About;

import { Button, Result } from 'antd';

import useLanguage from '@/locale/useLanguage';

const About = () => {
  
  return (
    <Result
      status="info"
      title={'IDURAR'}
      subTitle={'Do you need help on customize of this app'}
      extra={
        <>
          <p>
            GitHub :{' '}
            <a href="https://github.com/idurar/idurar-erp-crm">
              https://github.com/idurar/idurar-erp-crm
            </a>
          </p>
          <Button
            type="primary"
            onClick={() => {
              window.open(`https://www.idurarapp.com/contact-us/`);
            }}
          >
            {'Contact us'}
          </Button>
        </>
      }
    />
  );
};

export default About;

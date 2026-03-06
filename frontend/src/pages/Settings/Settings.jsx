import {
  FileImageOutlined,
} from '@ant-design/icons';

import TabsContent from '@/components/TabsContent/TabsContent';

import CompanyLogoSettings from './CompanyLogoSettings';

import useLanguage from '@/locale/useLanguage';
import { useParams } from 'react-router-dom';

export default function Settings() {
  const translate = useLanguage();
  const { settingsKey } = useParams();

  const content = [
    {
      key: 'company_logo',
      label: translate('Company Logo'),
      icon: <FileImageOutlined />,
      children: <CompanyLogoSettings />,
    }
  ];

  const pageTitle = translate('Settings');

  return <TabsContent defaultActiveKey={'company_logo'} content={content} pageTitle={pageTitle} />;
}

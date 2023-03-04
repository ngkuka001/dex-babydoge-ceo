import { useEffect } from 'react';
import { LANGUAGE, LANGUAGE_KEY } from 'constants/index';
import { useTranslation } from 'react-i18next';
import { Select, Space, Image } from 'antd';
import { LANGUAGE_RESOURCES } from 'language/i18n';
import { useAppSelector } from 'hooks/useStore';

import selectLanguage from 'store/language/selector';
import UsFlag from 'resources/svg/USFlag';
import ChinaFlag from 'resources/svg/ChinaFlag';
import IconArrowDown from 'resources/svg/IconArrowDown';

const { Option } = Select;

const LanguageSelect = () => {
  const { t, i18n } = useTranslation();

  const currentLanguage = useAppSelector(selectLanguage);

  const LANGUAGE_OPTIONS = [
    {
      value: LANGUAGE.EN,
      label: t('common.english'),
      image: <UsFlag />,
    },
    // {
    //   value: LANGUAGE.CN,
    //   label: t('common.china'),
    //   image: <ChinaFlag />,
    // },
  ];

  const handleChangeLanguage = (value: string) => () => {
    let language = value;
    if (Object.keys(LANGUAGE_RESOURCES).indexOf(value) === -1) {
      language = LANGUAGE.EN;
    }

    if (value.indexOf('zh') >= 0) {
      language = LANGUAGE.CN;
    }

    i18n.changeLanguage(language);
    document.documentElement.setAttribute('lang', LANGUAGE_KEY[language]);
  };

  useEffect(() => {
    handleChangeLanguage(localStorage.getItem('i18App') || LANGUAGE.EN)();
  }, []);

  const optionsRenderProps = (item: any) => {
    return item?.image;
  };

  return (
    <div className="language-select">
      <Select
        value={currentLanguage}
        onSelect={handleChangeLanguage}
        getPopupContainer={(trigger: any) => trigger.parentElement}
        dropdownMatchSelectWidth={false}
        placement="bottomRight"
        suffixIcon={<IconArrowDown />}
      >
        {LANGUAGE_OPTIONS.map((item: any) => (
          <Option value={item.value} key={item.value}>
            {optionsRenderProps(item)}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default LanguageSelect;

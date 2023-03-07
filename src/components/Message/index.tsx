// @ts-nocheck

import { getI18n } from 'react-i18next';
import { message } from 'antd';

export default function showMessage(msgType: string, msgContent: string, objValue?: any) {
  message.config({
    maxCount: 1,
  });
  message[msgType]({
    content: getI18n()?.t(msgContent, objValue) || msgContent,
    className: 'event-message',
    duration: 3,
    maxCount: 1,
  });
}

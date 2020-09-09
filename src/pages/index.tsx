import React, { useCallback } from 'react';
import styles from './index.less';
import { Button, Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

const Page = (): JSX.Element => {
  const getPassword = useCallback(() => {
    const maxLen = [10, 26, 26];
    const baseIndex = [48, 65, 97];

    let passwd = '';
    for (let i = 0; i < 6; i++) {
      const type = Math.floor(Math.random() * 3);
      const index = Math.floor(Math.random() * maxLen[type]);
      const ascii = baseIndex[type] + index;
      passwd += String.fromCharCode(ascii);
    }

    console.log(passwd);
  }, []);

  return (
    <div className={styles.page}>
      <Button onClick={getPassword}>生成</Button>
    </div>
  );
};

export default Page;

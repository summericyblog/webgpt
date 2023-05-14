import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export interface IAboutPageProps {}

const ChatPage: React.FunctionComponent<IAboutPageProps> = (props) => {
  const [message, setMessage] = useState('');
  const { number } = useParams();

  useEffect(() => {
    if (number) {
      setMessage('adsf' + number);
    }
  }, []);

  return (
    <div>
      <p>This is the About page.</p>
      <p>{message} </p>
    </div>
  );
};

export default ChatPage;

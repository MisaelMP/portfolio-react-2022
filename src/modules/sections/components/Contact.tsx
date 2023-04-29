import React, { Fragment } from 'react';

const Contact = () => {
  return (
    <Fragment>
      <h2>Contact me</h2>
      <div>
        You can always find me through any of these emails or by telepathic communication, feel free to chose either:{' '}
        <br />
        <div className='contact'>
          <a
            href='mailto:misaelmdev@gmail.com'
            className='contact__link'
          >
            <h2>THIS</h2>
            <span className='is-hidden'>misaelmdev@gmail.com</span>
          </a>
        </div>
        <h2>or</h2>
        <br />
        <div className='contact'>
          <a
            href='mailto:contact@misaelm.com'
            className='contact__link '
          >
            <h2>THAT</h2>
            <span className='is-hidden'>contact@misaelm.com</span>
          </a>
        </div>
      </div>
    </Fragment>
  );
};

export default Contact;

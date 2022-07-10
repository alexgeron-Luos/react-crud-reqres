import React from 'react';
import Link from 'next/link';
import Styles from './styles.module.scss';

const Footer = () => {
  return (
    <footer className={Styles.footerBox}>
      <Link href="https://reqres.in">
        <a target="_blank" rel="noopener noreferrer">
          API Doc
        </a>
      </Link>
      <span> - </span>
      <Link href="https://github.com/alexgeron-Luos/react-reqres">
        <a target="_blank" rel="noopener noreferrer">
          Source code
        </a>
      </Link>
    </footer>
  );
};
export default Footer;

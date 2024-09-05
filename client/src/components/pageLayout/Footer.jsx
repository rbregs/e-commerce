import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer >
      <p>Alrights reserved © 2022 - {currentYear} Company Name</p>
    </footer>
  );
}
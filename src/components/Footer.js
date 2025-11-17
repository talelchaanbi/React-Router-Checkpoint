import React from 'react';

function Footer() {
  return (
    <footer className="mt-4 py-3 border-top text-center">
      <div className="container">
        <small className="text-muted">© {new Date().getFullYear()} MovieHub. Made with ❤️</small>
      </div>
    </footer>
  );
}

export default Footer;

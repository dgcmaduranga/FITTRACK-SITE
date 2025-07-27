import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-light text-center py-3 mt-5">
      <div className="container">
        <small>
          &copy; {new Date().getFullYear()} FitTrack • Built by Charith 💪
        </small>
      </div>
    </footer>
  );
}

export default Footer;

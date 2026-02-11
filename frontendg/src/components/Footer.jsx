import React from 'react';
import '../css/footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="dashboard-footer">
      <div className="footer-left">
        <h3>Student Dashboard</h3>
        <p>Stay productive. Stay focused.</p>
      </div>

      <div className="footer-center">
        <p>© {year} All rights reserved</p>
      </div>

      <div className="footer-right">
        <a href="#">Help</a>
        <a href="#">Privacy</a>
        <a href="#">Contact</a>
      </div>
    </footer>
  );
}

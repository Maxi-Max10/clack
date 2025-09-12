function loadUserBar() {
  fetch('components/userbar.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('userbar-container').innerHTML = html;
      const token = localStorage.getItem('token');
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userBar = document.getElementById('user-bar');
        userBar.innerHTML = `
          <ul>
            <li style="font-weight:bold;color:#28a745;">${payload.username}</li>
            <li><a href="#" id="logout-btn">Cerrar sesión</a></li>
          </ul>
        `;
        document.getElementById('logout-btn').onclick = function() {
          localStorage.removeItem('token');
          location.reload();
        };
      }
    });
}
document.addEventListener('DOMContentLoaded', loadUserBar);
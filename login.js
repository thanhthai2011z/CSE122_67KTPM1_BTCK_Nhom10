const loginForm = document.getElementById('loginForm');
const roleSelect = document.getElementById('roleSelect');
const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const loginErrorMessage = document.getElementById('loginErrorMessage');

function showError(message) {
  loginErrorMessage.innerText = message;
  loginErrorMessage.classList.remove('hidden');
}

function hideError() {
  loginErrorMessage.classList.add('hidden');
}

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  hideError();

  const role = roleSelect.value;
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username) {
    showError('Vui lòng nhập Tên tài khoản hoặc Email!');
    return;
  }

  if (!password) {
    showError('Vui lòng nhập Mật khẩu!');
    return;
  }

  if (password.length < 3) {
    showError('Mật khẩu phải chứa ít nhất 3 ký tự!');
    return;
  }

  const userSession = {
    username: username,
    role: role,
    loginTime: new Date().toISOString()
  };

  localStorage.setItem('smartshelf_user', JSON.stringify(userSession));

  if (role === 'shopper') {
    window.location.href = 'shopper-search.html';
  } else if (role === 'associate') {
    window.location.href = 'associate-check.html';
  } else if (role === 'manager') {
    window.location.href = 'manager-dashboard.html';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const savedUser = JSON.parse(localStorage.getItem('smartshelf_user') || 'null');
  if (savedUser) {
    usernameInput.value = savedUser.username || '';
    roleSelect.value = savedUser.role || 'shopper';
  }
});

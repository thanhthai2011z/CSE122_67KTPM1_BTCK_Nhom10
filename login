
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SmartShelf - Đăng nhập hệ thống</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="../css/style.css">
</head>
<body>

  <header class="navbar">
    <div class="container navbar-inner">
      <a href="shopper-search.html" class="brand-logo">
        🛒 SmartShelf <span class="brand-badge">Hệ thống Điều hành</span>
      </a>
      <nav>
        <a href="shopper-search.html" class="btn btn-outline" style="padding: 6px 14px;">Vào trang Mua sắm</a>
      </nav>
    </div>
  </header>

  <main class="container" style="display: flex; justify-content: center; align-items: center; min-height: 80vh;">
    
    <div class="search-hero" style="width: 100%; max-width: 440px; margin: 0; padding: 32px; box-shadow: var(--shadow-modal);">
      
      <div style="text-align: center; margin-bottom: 24px;">
        <span style="font-size: 3rem;">🔐</span>
        <h1 style="font-size: 1.5rem; font-weight: 800; color: var(--dark); margin-top: 8px;">Đăng nhập SmartShelf</h1>
        <p style="color: var(--slate-500); font-size: 0.88rem;">Chọn vai trò để truy cập đúng giao diện vận hành</p>
      </div>

      <form id="loginForm">
        
        <div class="form-group">
          <label for="roleSelect">Vai trò người dùng</label>
          <select id="roleSelect" class="form-select" style="background: #fff;">
            <option value="shopper">🛍️ Khách mua sắm (Giao diện SV1)</option>
            <option value="associate">👷 Nhân viên cửa hàng (Giao diện SV2)</option>
            <option value="manager">📊 Quản lý / Admin (Giao diện SV3)</option>
          </select>
        </div>

        <div class="form-group">
          <label for="usernameInput">Tài khoản / Email</label>
          <input type="text" id="usernameInput" class="form-input" placeholder="Nhập tên tài khoản..." required />
        </div>

        <div class="form-group">
          <label for="passwordInput">Mật khẩu</label>
          <input type="password" id="passwordInput" class="form-input" placeholder="Nhập mật khẩu..." required />
        </div>

        <div id="loginErrorMessage" class="hidden" style="background: var(--danger-bg); color: var(--danger-text); padding: 10px; border-radius: var(--radius-sm); font-size: 0.85rem; margin-bottom: 16px; border-left: 4px solid var(--danger-text);">
          --
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px; font-size: 1rem; margin-top: 8px;">
          Đăng nhập ngay
        </button>

      </form>

      <div style="text-align: center; margin-top: 20px; font-size: 0.85rem; color: var(--slate-500); border-top: 1px solid var(--slate-200); padding-top: 16px;">
        Chưa có tài khoản? <a href="#" onclick="alert('Tính năng Đăng ký mở rộng!')" style="color: var(--primary); font-weight: 600; text-decoration: none;">Đăng ký ngay</a>
      </div>

    </div>

  </main>

  <script src="../js/login.js"></script>
</body>
</html>

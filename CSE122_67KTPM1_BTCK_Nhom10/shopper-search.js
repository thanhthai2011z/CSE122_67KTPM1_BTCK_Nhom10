
// Mock Data chất lượng cao với Icon minh họa
const mockProducts = [
  { id: "P01", name: "Sữa tươi Vinamilk 1L", category: "Dairy", stock: 12, zone: "Kệ A1-02", price: "35,000đ", icon: "🥛" },
  { id: "P02", name: "Sữa tươi TH True Milk 1L", category: "Dairy", stock: 0, zone: "Kệ A1-05", price: "38,000đ", icon: "🥛" },
  { id: "P03", name: "Bánh Oishi Tôm Cay", category: "Snacks", stock: 25, zone: "Kệ B2-01", price: "10,000đ", icon: "🍿" },
  { id: "P04", name: "Bánh Lay's Khoai Tây Vị Tự Nhiên", category: "Snacks", stock: 0, zone: "Kệ B2-04", price: "22,000đ", icon: "🥔" },
  { id: "P05", name: "Nước Ngọt Coca Cola 330ml", category: "Beverage", stock: 0, zone: "Kệ C1-03", price: "12,000đ", icon: "🥤" },
  { id: "P06", name: "Nước Ngọt Pepsi Cảnh Báo Lạnh", category: "Beverage", stock: 18, zone: "Kệ C1-04", price: "12,000đ", icon: "🥤" }
];

// DOM References
const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const stockOnlyToggle = document.getElementById('stockOnlyToggle');
const resultCountHeader = document.getElementById('resultCountHeader');

// Modal Elements
const aiModal = document.getElementById('aiModal');
const aiLoadingState = document.getElementById('aiLoadingState');
const aiResultState = document.getElementById('aiResultState');
const aiErrorState = document.getElementById('aiErrorState');
const btnCloseModalX = document.getElementById('btnCloseModalX');

// Render Sản phẩm
function renderProducts(products) {
  productGrid.innerHTML = '';
  resultCountHeader.innerText = `Tìm thấy ${products.length} sản phẩm`;

  if (products.length === 0) {
    productGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; background: #fff; border-radius: var(--radius-md);">
        <span style="font-size: 3rem;">🔍</span>
        <h3 style="margin-top: 10px; color: var(--slate-700);">Không tìm thấy sản phẩm phù hợp</h3>
        <p style="color: var(--slate-500); font-size: 0.9rem;">Thử thay đổi từ khóa tìm kiếm hoặc bỏ lọc còn hàng.</p>
      </div>`;
    return;
  }

  products.forEach(p => {
    const isOutOfStock = p.stock === 0;
    const cardHtml = `
      <article class="product-card">
        <div>
          <div class="product-thumb">${p.icon}</div>
          <div style="display: flex; justify-content: space-between; align-items: start;">
            <span class="badge-stock ${isOutOfStock ? 'stock-out' : 'stock-in'}">
              ${isOutOfStock ? 'Hết hàng' : `Còn ${p.stock} sp`}
            </span>
            <span class="location-tag">📍 ${p.zone}</span>
          </div>
          <h3 class="product-title" style="margin-top: 10px;">${p.name}</h3>
          <p class="product-meta">Danh mục: ${p.category}</p>
        </div>

        <div style="margin-top: 16px; border-top: 1px solid var(--slate-200); padding-top: 12px; display: flex; align-items: center; justify-content: space-between;">
          <span class="product-price">${p.price}</span>
          ${isOutOfStock 
            ? `<button class="btn btn-ai" onclick="triggerAI2('${p.id}')">✨ Gợi ý thay thế</button>`
            : `<a href="shopper-product-location.html?id=${p.id}" class="btn btn-outline">Xem vị trí</a>`
          }
        </div>
      </article>
    `;
    productGrid.insertAdjacentHTML('beforeend', cardHtml);
  });
}

// Xử lý Lọc & Tìm kiếm
function handleFilter() {
  const query = searchInput.value.toLowerCase().trim();
  const selectedCat = categoryFilter.value;
  const isStockOnly = stockOnlyToggle.checked;

  const filtered = mockProducts.filter(p => {
    const matchQuery = p.name.toLowerCase().includes(query);
    const matchCat = selectedCat === 'ALL' || p.category === selectedCat;
    const matchStock = !isStockOnly || p.stock > 0;
    return matchQuery && matchCat && matchStock;
  });

  renderProducts(filtered);
}

searchInput.addEventListener('input', handleFilter);
categoryFilter.addEventListener('change', handleFilter);
stockOnlyToggle.addEventListener('change', handleFilter);

// ==========================================================================
// MÔ PHỎNG LUỒNG TRẢI NGHIỆM AI-2 (PRODUCT ALTERNATIVE AI)
// ==========================================================================
function triggerAI2(productId) {
  const targetProduct = mockProducts.find(p => p.id === productId);
  if (!targetProduct) return;

  // Bước 1: Mở Modal & Bật Loading Shimmer
  aiModal.classList.remove('hidden');
  aiLoadingState.classList.remove('hidden');
  aiResultState.classList.add('hidden');
  aiErrorState.classList.add('hidden');

  // Mô phỏng thời gian suy nghĩ của AI (1.2 giây)
  setTimeout(() => {
    aiLoadingState.classList.add('hidden');

    // Logic giả lập: Tìm sp cùng Category và còn hàng
    const alternative = mockProducts.find(p => p.category === targetProduct.category && p.stock > 0);

    if (alternative) {
      // Bước 2 & 3: Render Kết quả & Giải thích
      document.getElementById('aiSuggestedName').innerText = alternative.name;
      document.getElementById('aiSuggestedPrice').innerText = alternative.price;
      document.getElementById('aiSuggestedLocation').innerText = alternative.zone;
      document.getElementById('aiReasonText').innerText = 
        `Sản phẩm '${alternative.name}' thuộc cùng danh mục '${targetProduct.category}', mức giá tương đồng (${alternative.price}) và hiện sẵn có ${alternative.stock} sản phẩm tại ${alternative.zone}.`;

      aiResultState.classList.remove('hidden');

      // Bước 4: Thao tác Chấp nhận / Bỏ qua
      document.getElementById('btnAcceptAI').onclick = () => {
        aiModal.classList.add('hidden');
        window.location.href = `shopper-product-location.html?id=${alternative.id}`;
      };
      document.getElementById('btnRejectAI').onclick = () => {
        aiModal.classList.add('hidden');
      };
    } else {
      // Trạng thái AI thất bại
      aiErrorState.classList.remove('hidden');
      document.getElementById('btnCloseAIError').onclick = () => {
        aiModal.classList.add('hidden');
      };
    }
  }, 1200);
}

// Đóng modal khi bấm nút X
btnCloseModalX.onclick = () => aiModal.classList.add('hidden');

// Khởi chạy
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(mockProducts);
});
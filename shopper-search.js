// Đoạn code render sản phẩm trong js/shopper-search.js
function renderProducts(products) {
  productGrid.innerHTML = '';
  resultCountHeader.innerText = `Tìm thấy ${products.length} sản phẩm`;

  if (products.length === 0) {
    productGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; background: #fff; border-radius: var(--radius-md);">
        <span style="font-size: 2.5rem;">🔍</span>
        <h3 style="margin-top: 8px; color: var(--slate-700);">Không tìm thấy sản phẩm</h3>
        <p style="color: var(--slate-500); font-size: 0.88rem;">Thử đổi từ khóa hoặc bỏ tích lọc còn hàng.</p>
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
          <h3 class="product-title">${p.name}</h3>
          <p class="product-meta">Danh mục: ${p.category}</p>
        </div>

        <div style="margin-top: 16px; border-top: 1px solid var(--slate-200); padding-top: 12px; display: flex; align-items: center; justify-content: space-between;">
          <span class="product-price">${p.price}</span>
          ${isOutOfStock 
            ? `<button class="btn btn-ai" onclick="triggerAI2('${p.id}')">✨ Gợi ý thay thế</button>`
            : `<a href="shopper-detail.html?id=${p.id}" class="btn btn-outline">Xem chi tiết & Vị trí</a>`
          }
        </div>
      </article>
    `;
    productGrid.insertAdjacentHTML('beforeend', cardHtml);
  });
}

// Xử lý nút bấm "Chấp nhận & Dẫn đường" của AI
function triggerAI2(productId) {
  const targetProduct = mockProducts.find(p => p.id === productId);
  if (!targetProduct) return;

  aiModal.classList.remove('hidden');
  aiLoadingState.classList.remove('hidden');
  aiResultState.classList.add('hidden');
  aiErrorState.classList.add('hidden');

  setTimeout(() => {
    aiLoadingState.classList.add('hidden');

    const alternative = mockProducts.find(p => p.category === targetProduct.category && p.stock > 0);

    if (alternative) {
      document.getElementById('aiSuggestedName').innerText = alternative.name;
      document.getElementById('aiSuggestedPrice').innerText = alternative.price;
      document.getElementById('aiSuggestedLocation').innerText = alternative.zone;
      document.getElementById('aiReasonText').innerText = 
        `Sản phẩm '${alternative.name}' thuộc cùng danh mục '${targetProduct.category}', giá (${alternative.price}) và hiện còn ${alternative.stock} sp tại ${alternative.zone}.`;

      aiResultState.classList.remove('hidden');

      // CHUYỂN TRANG CHÍNH XÁC KHÔNG CÓ PREFIX "pages/"
      document.getElementById('btnAcceptAI').onclick = () => {
        aiModal.classList.add('hidden');
        window.location.href = `shopper-detail.html?id=${alternative.id}`;
      };
      document.getElementById('btnRejectAI').onclick = () => {
        aiModal.classList.add('hidden');
      };
    } else {
      aiErrorState.classList.remove('hidden');
      document.getElementById('btnCloseAIError').onclick = () => {
        aiModal.classList.add('hidden');
      };
    }
  }, 1200);
}

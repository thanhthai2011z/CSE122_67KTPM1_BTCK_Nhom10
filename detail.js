const mockProducts = [
  { 
    id: "P01", 
    name: "Sữa tươi Vinamilk 1L", 
    category: "Dairy", 
    stock: 12, 
    zone: "Kệ A1-02", 
    price: "35,000đ", 
    icon: "🥛",
    desc: "Sữa tươi tiệt trùng Vinamilk 100% cung cấp dưỡng chất, canxi và vitamin D3 dồi dào cho cả gia đình.",
    aisle: "Lối đi số 1",
    tier: "Tầng 2 (Tầng mắt nhìn)",
    zoneGroup: "A",
    guide: "Từ Cổng vào chính -> Rẽ trái vào Lối đi số 1 -> Đi khoảng 10m đến Kệ A1 -> Sản phẩm nằm ở Tầng 2."
  },
  { 
    id: "P02", 
    name: "Sữa tươi TH True Milk 1L", 
    category: "Dairy", 
    stock: 0, 
    zone: "Kệ A1-05", 
    price: "38,000đ", 
    icon: "🥛",
    desc: "Sữa tươi nguyên chất TH True Milk làm hoàn toàn từ sữa tươi sạch của trang trại TH.",
    aisle: "Lối đi số 1",
    tier: "Tầng 3",
    zoneGroup: "A",
    guide: "Từ Cổng vào chính -> Rẽ trái vào Lối đi số 1 -> Đi đến cuối Dãy A1."
  },
  { 
    id: "P03", 
    name: "Bánh Oishi Tôm Cay", 
    category: "Snacks", 
    stock: 25, 
    zone: "Kệ B2-01", 
    price: "10,000đ", 
    icon: "🍿",
    desc: "Snack Oishi vị tôm cay giòn rụm, hương vị đậm đà hấp dẫn.",
    aisle: "Lối đi số 2",
    tier: "Tầng 1 (Tầng dưới)",
    zoneGroup: "B",
    guide: "Đi thẳng từ Cổng chính vào Trung tâm -> Rẽ phải vào Khu B2 (Bánh kẹo) -> Kệ B2-01 ở bên tay trái."
  },
  { 
    id: "P04", 
    name: "Bánh Lay's Khoai Tây Vị Tự Nhiên", 
    category: "Snacks", 
    stock: 0, 
    zone: "Kệ B2-04", 
    price: "22,000đ", 
    icon: "🥔",
    desc: "Bánh quy khoai tây Lay's giòn tan từ khoai tây chọn lọc tự nhiên.",
    aisle: "Lối đi số 2",
    tier: "Tầng 2",
    zoneGroup: "B",
    guide: "Đi thẳng từ Cổng chính -> Vào Khu B2 -> Kệ B2-04 ở cuối Dãy B."
  },
  { 
    id: "P05", 
    name: "Nước Ngọt Coca Cola 330ml", 
    category: "Beverage", 
    stock: 0, 
    zone: "Kệ C1-03", 
    price: "12,000đ", 
    icon: "🥤",
    desc: "Nước giải khát có ga Coca-Cola hương vị sảng khoái tức thì.",
    aisle: "Lối đi số 3 (Tủ mát)",
    tier: "Tầng giữa Tủ mát",
    zoneGroup: "C",
    guide: "Đi về phía góc phải Siêu thị -> Khu vực Tủ mát C1 -> Mở cửa tủ C1-03."
  },
  { 
    id: "P06", 
    name: "Nước Ngọt Pepsi Lạnh", 
    category: "Beverage", 
    stock: 18, 
    zone: "Kệ C1-04", 
    price: "12,000đ", 
    icon: "🥤",
    desc: "Nước ngọt Pepsi hương vị sảng khoái bùng nổ, sẵn sàng phục vụ lạnh.",
    aisle: "Lối đi số 3 (Tủ mát)",
    tier: "Tầng dưới Tủ mát",
    zoneGroup: "C",
    guide: "Đi về phía góc phải Siêu thị -> Khu vực Tủ mát C1 -> Tủ C1-04 bên cạnh tủ Coca."
  }
];

function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id') || 'P01';
}

function renderProductDetail() {
  const targetId = getProductIdFromUrl();
  const product = mockProducts.find(p => p.id === targetId) || mockProducts[0];

  document.getElementById('breadcrumbName').innerText = product.name;
  document.getElementById('productIcon').innerText = product.icon;
  document.getElementById('productName').innerText = product.name;
  document.getElementById('productPrice').innerText = product.price;
  document.getElementById('productDesc').innerText = product.desc;
  document.getElementById('categoryBadge').innerText = product.category;

  const stockBadge = document.getElementById('stockBadge');
  if (product.stock > 0) {
    stockBadge.innerText = `Còn hàng (${product.stock} sp)`;
    stockBadge.className = 'badge-stock stock-in';
  } else {
    stockBadge.innerText = 'Hết hàng trên kệ';
    stockBadge.className = 'badge-stock stock-out';
  }

  document.getElementById('infoZone').innerText = product.zone;
  document.getElementById('infoAisle').innerText = product.aisle;
  document.getElementById('infoTier').innerText = product.tier;
  document.getElementById('navigationGuide').innerText = product.guide;

  highlightZoneOnMap(product.zoneGroup);

  setupActionButtons(product);
}

function highlightZoneOnMap(zoneGroup) {
  const boxA = document.getElementById('zoneBoxA');
  const boxB = document.getElementById('zoneBoxB');
  const boxC = document.getElementById('zoneBoxC');

  [boxA, boxB, boxC].forEach(box => {
    box.style.borderColor = 'var(--slate-200)';
    box.style.background = 'var(--bg-app)';
    box.style.color = 'var(--slate-500)';
  });

  let activeBox = null;
  if (zoneGroup === 'A') activeBox = boxA;
  if (zoneGroup === 'B') activeBox = boxB;
  if (zoneGroup === 'C') activeBox = boxC;

  if (activeBox) {
    activeBox.style.borderColor = 'var(--primary)';
    activeBox.style.background = 'var(--primary-light)';
    activeBox.style.color = 'var(--primary-dark)';
    activeBox.insertAdjacentHTML('beforeend', ' <br><span style="font-size: 0.75rem; color: var(--primary);">📍 Vị trí sản phẩm</span>');
  }
}

function setupActionButtons(product) {
  const btnAdd = document.getElementById('btnAddToList');
  const btnShare = document.getElementById('btnShareLocation');

  btnAdd.onclick = () => {
    let shoppingList = JSON.parse(localStorage.getItem('smartshelf_cart') || '[]');
    
    if (!shoppingList.some(item => item.id === product.id)) {
      shoppingList.push(product);
      localStorage.setItem('smartshelf_cart', JSON.stringify(shoppingList));
      alert(`Đã thêm "${product.name}" vào Danh sách mua sắm của bạn!`);
    } else {
      alert(`Sản phẩm "${product.name}" đã có trong Danh sách mua sắm.`);
    }
  };

  btnShare.onclick = () => {
    alert(`Đã lưu vị trí "${product.zone}" (${product.aisle}) vào bộ nhớ thiết bị.`);
  };
}

document.addEventListener('DOMContentLoaded', () => {
  renderProductDetail();
});

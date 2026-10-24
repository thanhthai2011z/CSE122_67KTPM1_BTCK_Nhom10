const initialData = {
  products: [
    { id: 'P1', name: 'Sữa tươi Vinamilk 1L', stock: 45, zoneId: 'Z1' },
    { id: 'P2', name: 'Bánh Snack Poca', stock: 5, zoneId: 'Z2' }
  ],
  shelves: [
    { id: 'S1', name: 'Kệ Bánh Kẹo A1', zoneId: 'Z1', fillPercentage: 80 },
    { id: 'S2', name: 'Kệ Sữa B2', zoneId: 'Z2', fillPercentage: 12 }
  ],
  shelfChecks: [],
  restockTasks: [
    { id: 'T1', shelfId: 'S2', priority: 2, status: 'Chờ', reason: 'Tồn kho thấp (<15%)' },
    { id: 'T2', shelfId: 'S1', priority: 1, status: 'Đang xử lý', reason: 'Giờ cao điểm' }
  ],
  zones: [
    { id: 'Z1', name: 'Khu A - Bánh kẹo', status: 'Xanh' },
    { id: 'Z2', name: 'Khu B - Thực phẩm tươi', status: 'do' }
  ],
  users: [
    { id: 'U1', name: 'Nguyễn Văn A', role: 'Associate' }
  ]
};

function initStorage() {
  Object.keys(initialData).forEach(key => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(initialData[key]));
    }
  });
}
initStorage();

function getItems(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function addItem(key, newItem) {
  const items = getItems(key);
  items.push(newItem);
  localStorage.setItem(key, JSON.stringify(items));
}

function updateItem(key, id, updatedFields) {
  let items = getItems(key);
  items = items.map(item => item.id === id ? { ...item, ...updatedFields } : item);
  localStorage.setItem(key, JSON.stringify(items));
}
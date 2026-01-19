export default function Navbar() {
  return (
    <nav style={{ background: '#333', color: '#fff', padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ fontWeight: 'bold' }}>متجر الملابس</div>
      <div>
        <span style={{ marginLeft: '10px' }}>الرئيسية</span>
        <span>المنتجات</span>
      </div>
    </nav>
  );
}
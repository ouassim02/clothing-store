"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Upload, Save, X, Package, Tag, DollarSign, 
  Sparkles, TrendingUp, ShoppingBag,
  Users, Settings, LogOut, Trash2, Edit, LayoutDashboard, ShoppingCart
} from "lucide-react";

// مكون الإحصائيات
function StatCard({ icon: Icon, title, value, color, trend }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`bg-gradient-to-br ${color} p-6 rounded-3xl shadow-xl relative overflow-hidden`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <motion.div 
            className="bg-white/30 backdrop-blur-sm p-3 rounded-2xl"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Icon className="text-white" size={24} strokeWidth={2.5} />
          </motion.div>
          {trend && (
            <motion.span 
              className="text-white/90 text-sm font-bold bg-white/20 px-2 py-1 rounded-full"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {trend}
            </motion.span>
          )}
        </div>
        <div className="text-white">
          <p className="text-sm opacity-90 mb-1">{title}</p>
          <motion.p 
            className="text-3xl font-black"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {value}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  const [activeView, setActiveView] = useState("main"); // "main" or "settings"
  const [products, setProducts] = useState<any[]>([
    { id: 1, name: "Tenue de soirée", price: 4500, category_id: 1, image_url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500", description: "", colors: "Red, Black", stock: 10, track_stock: true },
    { id: 2, name: "Scarf", price: 1800, category_id: 3, image_url: "scarf.jpg", description: "", colors: "Blue", stock: 50, track_stock: true },
    { id: 3, name: "Veste En Cuir", price: 6200, category_id: 2, image_url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500", description: "", colors: "Brown", stock: 5, track_stock: true },
    { id: 4, name: "Jupe Classique", price: 3200, category_id: 1, image_url: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500", description: "", colors: "Grey", stock: 20, track_stock: false },
  ]);
  const [categories, setCategories] = useState([
    { id: 1, name: "Robes", slug: "robes" },
    { id: 2, name: "Chemisiers", slug: "chemisiers" },
    { id: 3, name: "Accessoires", slug: "accessoires" },
  ]);

  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    salesThisMonth: 0,
    uniqueClients: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    // تحميل الطلبيات من localStorage
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders);

    // حساب الإحصائيات
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthOrders = savedOrders.filter((o: any) => {
      const orderDate = new Date(o.date);
      return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
    });

    const uniqueClients = new Set(savedOrders.map((o: any) => o.phone)).size;
    const totalRevenue = savedOrders.reduce((sum: number, o: any) => sum + o.total, 0);

    setStats({
      totalProducts: products.length,
      salesThisMonth: monthOrders.length,
      uniqueClients: uniqueClients,
      totalRevenue: totalRevenue
    });
  }, [products, activeView]); // تحديث عند تغيير المنتجات أو التبديل للوحة التحكم

  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [productData, setProductData] = useState({
    id: null as number | null,
    name: "",
    price: "",
    category_id: "none",
    description: "",
    image: null as File | null,
    image_url: "",
    colors: "",
    stock: "0",
    track_stock: true
  });
  const [categoryData, setCategoryData] = useState({
    id: null as number | null,
    name: ""
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductData({ ...productData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitProduct = () => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { 
        ...p, 
        name: productData.name, 
        price: Number(productData.price), 
        category_id: productData.category_id === "none" ? null : Number(productData.category_id),
        description: productData.description,
        image_url: previewImage || p.image_url,
        colors: productData.colors,
        stock: Number(productData.stock),
        track_stock: productData.track_stock
      } : p));
    } else {
      const newProduct = {
        id: Date.now(),
        name: productData.name,
        price: Number(productData.price),
        category_id: productData.category_id === "none" ? null : Number(productData.category_id),
        description: productData.description,
        image_url: previewImage || "",
        colors: productData.colors,
        stock: Number(productData.stock),
        track_stock: productData.track_stock
      };
      setProducts([...products, newProduct]);
    }
    setShowAddProduct(false);
    setEditingProduct(null);
    setProductData({ id: null, name: "", price: "", category_id: "none", description: "", image: null, image_url: "", colors: "", stock: "0", track_stock: true });
    setPreviewImage(null);
  };

  const handleSubmitCategory = () => {
    if (editingCategory) {
      setCategories(categories.map(c => c.id === editingCategory.id ? { 
        ...c, 
        name: categoryData.name,
        slug: categoryData.name.toLowerCase().replace(/\s+/g, '-')
      } : c));
    } else {
      const newCat = {
        id: Date.now(),
        name: categoryData.name,
        slug: categoryData.name.toLowerCase().replace(/\s+/g, '-'),
      };
      setCategories([...categories, newCat]);
    }
    setShowAddCategory(false);
    setEditingCategory(null);
    setCategoryData({ id: null, name: "" });
  };

  const startEditProduct = (product: any) => {
    setEditingProduct(product);
    setProductData({
      id: product.id,
      name: product.name,
      price: product.price.toString(),
      category_id: product.category_id ? product.category_id.toString() : "none",
      description: product.description || "",
      image: null,
      image_url: product.image_url,
      colors: product.colors || "",
      stock: (product.stock || 0).toString(),
      track_stock: product.track_stock ?? true
    });
    setPreviewImage(product.image_url);
    setShowAddProduct(true);
  };

  const startEditCategory = (category: any) => {
    setEditingCategory(category);
    setCategoryData({
      id: category.id,
      name: category.name
    });
    setShowAddCategory(true);
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const deleteCategory = (id: number) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-[#E0B0FF]/10 to-purple-50">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 backdrop-blur-xl border-b border-[#E0B0FF]/20 sticky top-0 z-40 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="text-[#E0B0FF]" size={32} />
            </motion.div>
            <div>
              <motion.h1 
                className="text-2xl font-black bg-gradient-to-r from-[#E0B0FF] to-purple-600 bg-clip-text text-transparent"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Boutique Amina
              </motion.h1>
              <p className="text-sm text-gray-500 font-medium">Tableau de Bord</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveView(activeView === "main" ? "settings" : "main")}
              className={`p-2 rounded-xl transition-colors ${activeView === "settings" ? "bg-[#E0B0FF] text-white" : "hover:bg-[#E0B0FF]/10 text-gray-600"}`}
            >
              {activeView === "main" ? <Settings size={22} /> : <LayoutDashboard size={22} />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-xl hover:bg-red-50 transition-colors"
            >
              <LogOut className="text-red-500" size={22} />
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        {activeView === "main" ? (
          <>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              <StatCard 
                icon={ShoppingBag}
                title="Total Produits"
                value={stats.totalProducts.toString()}
                color="from-pink-500 to-rose-600"
                trend="0%"
              />
              <StatCard 
                icon={TrendingUp}
                title="Ventes du Mois"
                value={stats.salesThisMonth.toString()}
                color="from-purple-500 to-indigo-600"
                trend="0%"
              />
              <StatCard 
                icon={Users}
                title="Clients"
                value={stats.uniqueClients.toString()}
                color="from-amber-500 to-orange-600"
                trend="0%"
              />
              <StatCard 
                icon={DollarSign}
                title="Revenus"
                value={`${stats.totalRevenue} DA`}
                color="from-emerald-500 to-teal-600"
                trend="0%"
              />
            </motion.div>

            {/* Action Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Add Category Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#E0B0FF]/20"
              >
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-gradient-to-br from-purple-100 to-[#E0B0FF]/10 p-3 rounded-2xl"
                  >
                    <Tag className="text-purple-600" size={24} />
                  </motion.div>
                  <h2 className="text-2xl font-black text-purple-900">Gestion de Catégories</h2>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowAddCategory(true)}
                  className="w-full bg-gradient-to-r from-purple-500 to-[#E0B0FF] text-white py-4 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-2"
                >
                  <Plus size={24} />
                  Ajouter Catégorie
                </motion.button>
              </motion.div>

              {/* Add Product Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#E0B0FF]/20"
              >
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-gradient-to-br from-[#E0B0FF]/10 to-purple-100 p-3 rounded-2xl"
                  >
                    <Package className="text-[#E0B0FF]" size={24} />
                  </motion.div>
                  <h2 className="text-2xl font-black text-purple-900">Ajouter Produit</h2>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowAddProduct(true)}
                  className="w-full bg-gradient-to-r from-[#E0B0FF] to-purple-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-2"
                >
                  <Plus size={24} />
                  Nouveau Produit
                </motion.button>
              </motion.div>
            </div>

            {/* Recent Orders Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-white rounded-3xl p-8 shadow-xl border-2 border-[#E0B0FF]/20"
            >
              <h2 className="text-2xl font-black text-purple-900 mb-6 flex items-center gap-3">
                <ShoppingCart className="text-[#E0B0FF]" /> آخر الطلبيات
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead>
                    <tr className="border-b border-pink-50">
                      <th className="pb-4 font-bold text-gray-500">العميل</th>
                      <th className="pb-4 font-bold text-gray-500">التاريخ</th>
                      <th className="pb-4 font-bold text-gray-500">الإجمالي</th>
                      <th className="pb-4 font-bold text-gray-500">الحالة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-pink-50">
                    {orders.length > 0 ? orders.slice().reverse().map((order) => (
                      <tr key={order.id}>
                        <td className="py-4">
                          <div className="font-bold text-purple-900">{order.customer}</div>
                          <div className="text-xs text-gray-400">{order.phone}</div>
                        </td>
                        <td className="py-4 text-gray-600 text-sm">
                          {new Date(order.date).toLocaleDateString('ar-DZ')}
                        </td>
                        <td className="py-4 font-black text-[#E0B0FF]">{order.total} DA</td>
                        <td className="py-4">
                          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold">
                            مؤكد
                          </span>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-gray-400 font-medium">
                          لا توجد طلبيات بعد
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </>
        ) : (
          <div className="space-y-8">
            {/* Categories Management */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#E0B0FF]/20"
            >
              <h2 className="text-2xl font-black text-purple-900 mb-6 flex items-center gap-3">
                <Tag className="text-[#E0B0FF]" /> التحكم في الفئات
              </h2>
              <div className="grid gap-4">
                {categories.map((cat) => (
                  <div key={cat.id} className="flex items-center justify-between p-4 bg-[#E0B0FF]/5 rounded-2xl border border-[#E0B0FF]/10">
                    <div>
                      <span className="font-bold text-purple-900">{cat.name}</span>
                      <span className="text-xs text-gray-400 mr-2">({cat.slug})</span>
                    </div>
                    <div className="flex gap-2">
                      <motion.button 
                        whileTap={{ scale: 0.9 }}
                        onClick={() => startEditCategory(cat)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                      >
                        <Edit size={18} />
                      </motion.button>
                      <motion.button 
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteCategory(cat.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Products Management */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#E0B0FF]/20"
            >
              <h2 className="text-2xl font-black text-purple-900 mb-6 flex items-center gap-3">
                <Package className="text-[#E0B0FF]" /> التحكم في المنتجات
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-right">
                  <thead>
                    <tr className="border-b border-pink-50">
                      <th className="pb-4 font-bold text-gray-500">المنتج</th>
                      <th className="pb-4 font-bold text-gray-500">الفئة</th>
                      <th className="pb-4 font-bold text-gray-500">السعر</th>
                      <th className="pb-4 font-bold text-gray-500">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-pink-50">
                    {products.map((prod) => (
                      <tr key={prod.id} className="group">
                        <td className="py-4 font-bold text-purple-900">{prod.name}</td>
                        <td className="py-4 text-gray-600">
                          {categories.find(c => c.id === Number(prod.category_id))?.name || "بدون فئة"}
                        </td>
                        <td className="py-4 font-black text-[#E0B0FF]">{prod.price} DA</td>
                        <td className="py-4">
                          <div className="flex gap-2">
                            <motion.button 
                              whileTap={{ scale: 0.9 }}
                              onClick={() => startEditProduct(prod)}
                              className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                            >
                              <Edit size={18} />
                            </motion.button>
                            <motion.button 
                              whileTap={{ scale: 0.9 }}
                              onClick={() => deleteProduct(prod.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 size={18} />
                            </motion.button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )}

      </div>

      {/* Modal: Add Category */}
      <AnimatePresence>
        {showAddCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-900/40 backdrop-blur-sm"
            onClick={() => setShowAddCategory(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-purple-900">{editingCategory ? "تعديل فئة" : "Nouvelle Catégorie"}</h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => { setShowAddCategory(false); setEditingCategory(null); }}
                  className="p-2 hover:bg-pink-50 rounded-xl transition-colors"
                >
                  <X size={24} className="text-gray-600" />
                </motion.button>
              </div>

              <input
                type="text"
                placeholder="Nom de la catégorie"
                value={categoryData.name}
                onChange={(e) => setCategoryData({ ...categoryData, name: e.target.value })}
                className="w-full bg-gradient-to-r from-[#E0B0FF]/10 to-purple-50 border-2 border-[#E0B0FF]/20 rounded-2xl px-4 py-4 outline-none focus:ring-2 ring-[#E0B0FF]/30 font-medium mb-6"
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmitCategory}
                className="w-full bg-gradient-to-r from-purple-500 to-[#E0B0FF] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg"
              >
                <Save size={20} />
                {editingCategory ? "تحديث الفئة" : "Enregistrer"}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal: Add Product */}
      <AnimatePresence>
        {showAddProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-900/40 backdrop-blur-sm overflow-y-auto"
            onClick={() => setShowAddProduct(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl my-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-purple-900">{editingProduct ? "تعديل منتج" : "Ajouter Produit"}</h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => { setShowAddProduct(false); setEditingProduct(null); }}
                  className="p-2 hover:bg-pink-50 rounded-xl transition-colors"
                >
                  <X size={24} className="text-gray-600" />
                </motion.button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-purple-900 mb-2">Nom du Produit</label>
                  <input
                    type="text"
                    placeholder="Ex: Robe Élégante"
                    value={productData.name}
                    onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                    className="w-full bg-gradient-to-r from-[#E0B0FF]/10 to-purple-50 border-2 border-[#E0B0FF]/20 rounded-2xl px-4 py-3 outline-none focus:ring-2 ring-[#E0B0FF]/30 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-purple-900 mb-2">Prix (DA)</label>
                  <input
                    type="number"
                    placeholder="2800"
                    value={productData.price}
                    onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                    className="w-full bg-gradient-to-r from-[#E0B0FF]/10 to-purple-50 border-2 border-[#E0B0FF]/20 rounded-2xl px-4 py-3 outline-none focus:ring-2 ring-[#E0B0FF]/30 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-purple-900 mb-2">الفئة (المجموعة)</label>
                  <select
                    value={productData.category_id}
                    onChange={(e) => setProductData({ ...productData, category_id: e.target.value })}
                    className="w-full bg-gradient-to-r from-[#E0B0FF]/10 to-purple-50 border-2 border-[#E0B0FF]/20 rounded-2xl px-4 py-3 outline-none focus:ring-2 ring-[#E0B0FF]/30 font-medium"
                  >
                    <option value="none">Sélectionner...</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-purple-900 mb-2">الألوان (فواصل بينها)</label>
                    <input
                      type="text"
                      placeholder="Red, Blue, Green"
                      value={productData.colors}
                      onChange={(e) => setProductData({ ...productData, colors: e.target.value })}
                      className="w-full bg-gradient-to-r from-[#E0B0FF]/10 to-purple-50 border-2 border-[#E0B0FF]/20 rounded-2xl px-4 py-3 outline-none focus:ring-2 ring-[#E0B0FF]/30 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-purple-900 mb-2">الكمية في المخزن</label>
                    <input
                      type="number"
                      placeholder="10"
                      value={productData.stock}
                      onChange={(e) => setProductData({ ...productData, stock: e.target.value })}
                      className="w-full bg-gradient-to-r from-[#E0B0FF]/10 to-purple-50 border-2 border-[#E0B0FF]/20 rounded-2xl px-4 py-3 outline-none focus:ring-2 ring-[#E0B0FF]/30 font-medium"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-pink-50/50 p-4 rounded-2xl">
                  <input
                    type="checkbox"
                    id="track_stock"
                    checked={productData.track_stock}
                    onChange={(e) => setProductData({ ...productData, track_stock: e.target.checked })}
                    className="w-5 h-5 rounded border-[#E0B0FF] text-[#E0B0FF] focus:ring-[#E0B0FF]"
                  />
                  <label htmlFor="track_stock" className="text-sm font-bold text-purple-900 cursor-pointer">
                    تتبع المخزون (ينقص عند البيع)
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-bold text-purple-900 mb-2">Image du Produit</label>
                  <motion.label
                    whileHover={{ scale: 1.02 }}
                    className="w-full bg-gradient-to-r from-[#E0B0FF]/10 to-purple-50 border-2 border-dashed border-[#E0B0FF]/30 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-[#E0B0FF]/10 transition-colors"
                  >
                    {previewImage ? (
                      <motion.img
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        src={previewImage}
                        alt="Preview"
                        className="max-h-48 rounded-xl"
                      />
                    ) : (
                      <>
                        <Upload className="text-[#E0B0FF] mb-2" size={40} />
                        <p className="text-gray-600 font-medium">Cliquer pour télécharger</p>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </motion.label>
                </div>

                <div>
                  <label className="block text-sm font-bold text-purple-900 mb-2">Description</label>
                  <textarea
                    placeholder="Description du produit..."
                    value={productData.description}
                    onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                    rows={4}
                    className="w-full bg-gradient-to-r from-[#E0B0FF]/10 to-purple-50 border-2 border-[#E0B0FF]/20 rounded-2xl px-4 py-3 outline-none focus:ring-2 ring-[#E0B0FF]/30 font-medium resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmitProduct}
                  className="w-full bg-gradient-to-r from-[#E0B0FF] via-purple-500 to-[#E0B0FF] text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl mt-6"
                >
                  <Save size={22} />
                  {editingProduct ? "تحديث المنتج" : "Publier le Produit"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
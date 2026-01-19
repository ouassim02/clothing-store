"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Upload, Save, X, Package, Tag, DollarSign, 
  Sparkles, TrendingUp, ShoppingBag,
  Users, Settings, LogOut
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
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    category: "none",
    description: "",
    image: null as File | null
  });
  const [categoryName, setCategoryName] = useState("");
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
    console.log("Product submitted:", productData);
    setShowAddProduct(false);
    setProductData({ name: "", price: "", category: "none", description: "", image: null });
    setPreviewImage(null);
  };

  const handleSubmitCategory = () => {
    console.log("Category submitted:", categoryName);
    setShowAddCategory(false);
    setCategoryName("");
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
              className="p-2 rounded-xl hover:bg-[#E0B0FF]/10 transition-colors"
            >
              <Settings className="text-gray-600" size={22} />
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
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <StatCard 
            icon={ShoppingBag}
            title="Total Produits"
            value="4"
            color="from-pink-500 to-rose-600"
            trend="0%"
          />
          <StatCard 
            icon={TrendingUp}
            title="Ventes du Mois"
            value="0"
            color="from-purple-500 to-indigo-600"
            trend="0%"
          />
          <StatCard 
            icon={Users}
            title="Clients"
            value="0"
            color="from-amber-500 to-orange-600"
            trend="0%"
          />
          <StatCard 
            icon={DollarSign}
            title="Revenus"
            value="0 DA"
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
                <h3 className="text-2xl font-black text-purple-900">Nouvelle Catégorie</h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowAddCategory(false)}
                  className="p-2 hover:bg-pink-50 rounded-xl transition-colors"
                >
                  <X size={24} className="text-gray-600" />
                </motion.button>
              </div>

              <input
                type="text"
                placeholder="Nom de la catégorie"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full bg-gradient-to-r from-[#E0B0FF]/10 to-purple-50 border-2 border-[#E0B0FF]/20 rounded-2xl px-4 py-4 outline-none focus:ring-2 ring-[#E0B0FF]/30 font-medium mb-6"
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmitCategory}
                className="w-full bg-gradient-to-r from-purple-500 to-[#E0B0FF] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg"
              >
                <Save size={20} />
                Enregistrer
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
                <h3 className="text-2xl font-black text-purple-900">Ajouter Produit</h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowAddProduct(false)}
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
                  <label className="block text-sm font-bold text-purple-900 mb-2">Catégorie</label>
                  <select
                    value={productData.category}
                    onChange={(e) => setProductData({ ...productData, category: e.target.value })}
                    className="w-full bg-gradient-to-r from-[#E0B0FF]/10 to-purple-50 border-2 border-[#E0B0FF]/20 rounded-2xl px-4 py-3 outline-none focus:ring-2 ring-[#E0B0FF]/30 font-medium"
                  >
                    <option value="none">Sélectionner...</option>
                    <option value="robes">Robes</option>
                    <option value="chemisiers">Chemisiers</option>
                    <option value="accessoires">Accessoires</option>
                  </select>
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
                  Publier le Produit
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
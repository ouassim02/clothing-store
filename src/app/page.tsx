"use client";

import { useState, useEffect } from "react";
import { 
  Home, ShoppingBag, ShoppingCart, Headset, Loader2, 
  Plus, Minus, Trash2, Search, X, Sparkles, Heart, Star,
  TrendingUp, Award, Zap, Gift
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// مكون الكارت الاحترافي المميز
function FeaturedCard({ onAction }: { onAction: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-[40px] overflow-hidden border border-[#E0B0FF]/20 shadow-2xl mx-auto max-w-sm mb-8 relative"
    >
      <div className="absolute top-4 right-4 bg-gradient-to-r from-[#E0B0FF] to-purple-600 text-white px-4 py-2 rounded-full text-xs font-black z-10 shadow-lg">
      Nouveau
      </div>
      
      <div className="bg-gradient-to-br from-[#E0B0FF]/30 via-purple-200 to-[#E0B0FF]/40 h-64 w-full flex items-center justify-center relative overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-6 left-6"
        >
          <Sparkles className="text-yellow-400" size={28} />
        </motion.div>
        
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="opacity-20 text-pink-600"
        >
          <Heart size={140} fill="currentColor" />
        </motion.div>
        
        <img 
          src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-70"
          alt="Featured"
        />
      </div>

      <div className="p-8 text-right">
        <h3 className="text-3xl font-black mb-3 bg-gradient-to-r from-purple-900 to-pink-700 bg-clip-text text-transparent">
      Dernières tendances de la mode  
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          Madame, la boutique Amina est toujours à votre service. Nous vous proposons une sélection rigoureuse des plus beaux modèles, d'une qualité internationale.
        </p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 text-white py-5 rounded-3xl font-black text-lg shadow-xl shadow-pink-300/50"
        >
          Entrez dans le magasin
        </motion.button>
      </div>
    </motion.div>
  );
}

// كروت المميزات
function FeatureCard({ icon: Icon, title, description, gradient }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.03 }}
      className={`bg-gradient-to-br ${gradient} p-6 rounded-3xl text-right shadow-lg`}
    >
      <div className="bg-white/30 backdrop-blur-sm w-14 h-14 rounded-2xl flex items-center justify-center mb-4 mr-auto">
        <Icon size={28} className="text-white" strokeWidth={2.5} />
      </div>
      <h4 className="text-white font-black text-lg mb-2">{title}</h4>
      <p className="text-white/80 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

// كروت الفئات
function CategoryCard({ title, image, count, onClick }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative rounded-3xl overflow-hidden shadow-xl cursor-pointer group"
    >
      <div className="h-40 relative">
        <img src={image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={title} />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/40 to-transparent" />
      </div>
      
      <div className="absolute bottom-0 right-0 left-0 p-5 text-right">
        <h4 className="text-white font-black text-xl mb-1">{title}</h4>
        <p className="text-pink-200 text-sm font-bold">{count} منتج</p>
      </div>
      
      <motion.div 
        className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full"
        whileHover={{ scale: 1.1 }}
      >
        <Star className="text-yellow-500 inline" size={14} fill="currentColor" />
      </motion.div>
    </motion.div>
  );
}

// أيقونات التنقل
function NavIcon({ icon: Icon, label, isActive, onClick, badge = 0 }: any) {
  return (
    <motion.div
      onClick={onClick}
      className={`flex flex-col items-center cursor-pointer relative transition-all ${isActive ? "text-[#E0B0FF] scale-110" : "text-gray-400"}`}
      whileTap={{ scale: 0.8 }}
    >
      {badge > 0 && (
        <motion.span 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 bg-purple-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white"
        >
          {badge}
        </motion.span>
      )}
      <Icon size={26} strokeWidth={isActive ? 2.5 : 2} fill={isActive ? "rgba(224, 176, 255, 0.1)" : "none"} />
      <span className="text-[10px] mt-1 font-bold tracking-wide">{label}</span>
    </motion.div>
  );
}

export default function StoreFront() {
  const [activeTab, setActiveTab] = useState("home");
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  
  const [viewingProduct, setViewingProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: "", phone: "", city: "الجزائر العاصمة", commune: "" });

  const myWhatsApp = "213563413607";
  const deliveryFees: any = {
    "أدرار": 800, "الشلف": 600, "الأغواط": 600, "أم البواقي": 600, "باتنة": 600,
    "بجاية": 600, "بسكرة": 600, "بشار": 800, "البليدة": 400, "البويرة": 500,
    "تمنراست": 1000, "تبسة": 600, "تلمسان": 600, "تيارت": 600, "تيزي وزو": 500,
    "الجزائر العاصمة": 400, "الجلفة": 600, "جيجل": 600, "سطيف": 500, "سعيدة": 600,
    "سكيكدة": 600, "سيدي بلعباس": 600, "عنابة": 600, "قالمة": 600, "قسنطينة": 500,
    "المدية": 500, "مستغانم": 600, "المسيلة": 600, "معسكر": 600, "ورقلة": 800,
    "وهران": 500, "البيض": 800, "إليزي": 1200, "برج بوعريريج": 500, "الطارف": 600,
    "تندوف": 1200, "تيسمسيلت": 600, "الوادي": 800, "خنشلة": 600, "سوق أهراس": 600,
    "تيبازة": 500, "ميلة": 600, "عين الدفلى": 500, "النعامة": 800, "عين تموشنت": 600,
    "غرداية": 800, "غليزان": 600, "تيميمون": 1000, "برج باجي مختار": 1200, "أولاد جلال": 800,
    "بني عباس": 1000, "إن صالح": 1200, "إن قزام": 1200, "تقرت": 800, "جانت": 1200,
    "المغير": 800, "المنيعة": 1000
  };

  // بيانات وهمية للعرض
  const demoProducts = [
    { id: 1, name: "Tenue de soirée", price: 4500, image_url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500" },
    { id: 2, name: "Scarf", price: 1800, image_url: "scarf.jpg" },
    { id: 3, name: "Veste En Cuir", price: 6200, image_url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500" },
    { id: 4, name: "Jupe Classique", price: 3200, image_url: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500" },
  ];

  useEffect(() => {
    setProducts(demoProducts);
    setFilteredProducts(demoProducts);
  }, []);

  useEffect(() => {
    const results = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredProducts(results);
  }, [searchQuery, products]);

  const addToCart = (product: any, size: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item => (item.id === product.id && item.size === size) ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1, size }];
    });
  };

  const totalPrice = cart.reduce((s, i) => s + (i.price * i.qty), 0) + (cart.length > 0 ? (deliveryFees[customerInfo.city] || 800) : 0);

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-[#E0B0FF]/10 via-purple-50 to-[#E0B0FF]/10 text-purple-950 font-sans selection:bg-[#E0B0FF]/30">
      
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-2xl border-b border-[#E0B0FF]/20 h-16 flex items-center px-6 justify-between shadow-lg">
        <div className="w-10">
          {!isSearching ? (
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => { setIsSearching(true); setActiveTab("store"); }}>
              <Search size={22} className="text-gray-400" />
            </motion.button>
          ) : (
            <X size={22} className="text-[#E0B0FF] cursor-pointer" onClick={() => { setIsSearching(false); setSearchQuery(""); }} />
          )}
        </div>

        <AnimatePresence mode="wait">
          {!isSearching ? (
            <motion.h1 
              key="title" 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="text-xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#E0B0FF] to-purple-600 uppercase"
            >
              Boutique Amina ✨
            </motion.h1>
          ) : (
            <motion.input 
              key="search" initial={{ width: 0 }} animate={{ width: "70%" }}
              className="bg-[#E0B0FF]/10 border-[#E0B0FF]/20 border-2 rounded-full px-4 py-1 text-sm outline-none text-right text-purple-900 focus:ring-2 ring-[#E0B0FF]/30"
              placeholder="ابحثي عن فستان..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} autoFocus
            />
          )}
        </AnimatePresence>

        <div className="w-10 flex justify-end">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Headset size={22} className="text-gray-400 cursor-pointer" onClick={() => window.open(`https://wa.me/${myWhatsApp}`)} />
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-28 px-4 max-w-2xl mx-auto">
        
        {activeTab === "home" && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {/* Hero Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-right mb-8 px-4"
            >
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-5xl font-black leading-tight mb-3 bg-gradient-to-r from-purple-900 via-[#E0B0FF] to-purple-900 bg-clip-text text-transparent">
                Ta beauté commence ici madame<br/> 
                </h2>
                <p className="text-gray-500 text-lg font-medium">Votre première destination pour l'élégance en Algérie 🇩🇿</p>
              </motion.div>
            </motion.div>

            {/* Featured Card */}
            <FeaturedCard onAction={() => setActiveTab("store")} />

            {/* Features Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              <FeatureCard 
                icon={TrendingUp}
                title="Dernières tendances"
                description="Variété Renouvelé"
                gradient="from-pink-500 to-rose-600"
              />
              <FeatureCard 
                icon={Award}
                title="Haute qualité"
                description="Produits Haute qualité"
                gradient="from-purple-500 to-indigo-600"
              />
              <FeatureCard 
                icon={Zap}
                title="L'ivraison Rapide"
                description="L'ivraison 58 willaya"
                gradient="from-amber-500 to-orange-600"
              />
              <FeatureCard 
                icon={Gift}
                title="Offres spéciales"
                description="Des réductions pour nos clients"
                gradient="from-emerald-500 to-teal-600"
              />
            </motion.div>

            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex justify-between items-center mb-5 px-2">
                <button className="text-[#E0B0FF] text-sm font-bold">Affi tout←</button>
                <h3 className="text-2xl font-black text-purple-900">Acheter par catégorie</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <CategoryCard 
                  title="Les Robes" 
                  image="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500"
                  count={2}
                  onClick={() => setActiveTab("store")}
                />
                <CategoryCard
  title="Scarf"
  image_url="scarf.jpg"
  count={1}
  price={1800} // تأكد أن مكون CategoryCard مبرمج لاستقبال السعر
  onClick={() => setActiveTab("store")}
/>
              
              </div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10 bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-[#E0B0FF]/20"
            >
              <div className="flex justify-around items-center text-center">
                <div>
                  <div className="text-3xl font-black text-[#E0B0FF] mb-1">500+</div>
                  <div className="text-xs text-gray-600">Clientes Satisfait</div>
                </div>
                <div className="w-px h-12 bg-[#E0B0FF]/20" />
                <div>
                  <div className="text-3xl font-black text-purple-600 mb-1">100%</div>
                  <div className="text-xs text-gray-600">Haut Qualité</div>
                </div>
                <div className="w-px h-12 bg-[#E0B0FF]/20" />
                <div>
                  <div className="text-3xl font-black text-[#E0B0FF] mb-1">24/7</div>
                  <div className="text-xs text-gray-600">Service Client</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === "store" && (
          <div className="grid grid-cols-2 gap-4">
            {loading ? <Loader2 className="animate-spin mx-auto col-span-2 mt-10 text-pink-500" /> : 
              filteredProducts.map((p, idx) => (
                <motion.div 
                  layout 
                  key={p.id} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => { setViewingProduct(p); setSelectedSize("M"); }}
                  whileHover={{ scale: 1.05, y: -8 }}
                  className="bg-white rounded-[35px] overflow-hidden border-2 border-[#E0B0FF]/20 shadow-lg hover:shadow-2xl hover:shadow-[#E0B0FF]/30 transition-all cursor-pointer"
                >
                  <div className="relative">
                    <img src={p.image_url} className="w-full h-48 object-cover" alt={p.name} />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Heart className="text-[#E0B0FF]" size={16} />
                    </div>
                  </div>
                  <div className="p-4 text-right">
                    <h4 className="text-sm font-bold truncate mb-2 text-purple-900">{p.name}</h4>
                    <div className="flex justify-between items-center">
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-gradient-to-r from-[#E0B0FF] to-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-bold"
                        onClick={(e) => { e.stopPropagation(); setViewingProduct(p); }}
                      >
                        أضف
                      </motion.button>
                      <p className="text-[#E0B0FF] font-black text-base">{p.price} DA</p>
                    </div>
                  </div>
                </motion.div>
              ))
            }
          </div>
        )}

        {activeTab === "cart" && (
          <div className="text-right">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3 text-purple-900">
            Panier de vos achats <ShoppingCart className="text-[#E0B0FF]" size={24}/>
            </h2>
            {cart.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center text-gray-300 flex flex-col items-center"
              >
                <ShoppingBag size={80} className="mb-4 opacity-20" />
                <p className="text-lg font-bold">Le panier est actuellement vide</p>
                <button 
                  onClick={() => setActiveTab("store")}
                  className="mt-6 bg-gradient-to-r from-[#E0B0FF] to-purple-600 text-white px-8 py-3 rounded-2xl font-bold"
                >
                Entrez dans le magasin
                </button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {cart.map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-4 bg-white p-4 rounded-3xl border-2 border-[#E0B0FF]/20 items-center shadow-md"
                  >
                    <img src={item.image_url} className="w-20 h-20 rounded-2xl object-cover" />
                    <div className="flex-grow">
                      <h4 className="text-sm font-bold text-purple-900">{item.name}</h4>
                      <p className="text-[#E0B0FF] text-xs font-bold mt-1">{item.price} DA | {item.size}</p>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setCart(cart.filter((_, i) => i !== idx))} 
                      className="text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={20}/>
                    </motion.button>
                  </motion.div>
                ))}
                <div className="bg-gradient-to-br from-purple-50 to-[#E0B0FF]/10 p-6 rounded-[35px] border-2 border-[#E0B0FF]/20 mt-10 shadow-xl">
                  <div className="flex justify-between text-xl font-black text-purple-900 mb-2">
                    <span className="text-[#E0B0FF]">{totalPrice} DA</span>
                    <span>الإجمالي:</span>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowCheckout(true)} 
                    className="w-full bg-gradient-to-r from-[#E0B0FF] via-purple-500 to-[#E0B0FF] text-white py-5 rounded-3xl font-black mt-6 shadow-2xl shadow-[#E0B0FF]/30"
                  >
                    تأكيد الطلب 🛍️
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Product Modal */}
      <AnimatePresence>
        {viewingProduct && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setViewingProduct(null)} 
              className="absolute inset-0 bg-purple-950/60 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ y: 100, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              exit={{ y: 100, opacity: 0 }}
              className="bg-white w-full max-w-md rounded-[45px] overflow-hidden relative z-10 shadow-2xl"
            >
              <div className="relative">
                <img src={viewingProduct.image_url} className="w-full h-80 object-cover" />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setViewingProduct(null)}
                  className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center"
                >
                  <X size={20} className="text-gray-600" />
                </motion.button>
              </div>
              
              <div className="p-8 text-right">
                <h3 className="text-2xl font-black mb-2 text-purple-900">{viewingProduct.name}</h3>
                <p className="text-[#E0B0FF] text-3xl font-black mb-4">{viewingProduct.price} DA</p>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  قطعة مميزة مصممة لتبرز جمالكِ سيدتي. منتج عالي الجودة بأفضل الأسعار.
                </p>
                
                <div className="mb-2 text-sm font-bold text-purple-900">اختاري المقاس:</div>
                <div className="flex flex-row-reverse gap-3 mb-8">
                  {['S', 'M', 'L', 'XL'].map(s => (
                    <motion.button 
                      key={s} 
                      onClick={() => setSelectedSize(s)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-14 h-14 rounded-2xl border-2 font-black transition-all ${
                        selectedSize === s 
                          ? "border-[#E0B0FF] bg-gradient-to-br from-[#E0B0FF] to-purple-600 text-white shadow-lg" 
                          : "border-[#E0B0FF]/20 text-purple-300 bg-[#E0B0FF]/10"
                      }`}
                    >
                      {s}
                    </motion.button>
                  ))}
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { addToCart(viewingProduct, selectedSize); setViewingProduct(null); }} 
                  className="w-full bg-gradient-to-r from-[#E0B0FF] via-purple-500 to-[#E0B0FF] text-white py-5 rounded-3xl font-black shadow-xl"
                >
                  Ajouté au panier 🛒
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <div className="fixed inset-0 z-[70] flex items-end justify-center">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setShowCheckout(false)} 
              className="absolute inset-0 bg-purple-950/40 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ y: "100%" }} 
              animate={{ y: 0 }} 
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white w-full max-w-md p-8 rounded-t-[50px] relative z-10 shadow-2xl"
            >
              <div className="w-16 h-1.5 bg-[#E0B0FF]/30 rounded-full mx-auto mb-8" />
              <h3 className="text-3xl font-black mb-8 text-center bg-gradient-to-r from-purple-900 to-pink-700 bg-clip-text text-transparent">
              Votre info pour l'ivraison  🚚
              </h3>
              
              <input 
                className="w-full bg-gradient-to-r from-[#E0B0FF]/10 to-purple-50 border-2 border-[#E0B0FF]/20 p-4 rounded-3xl mb-4 text-right outline-none focus:ring-2 ring-[#E0B0FF]/30 font-medium" 
                placeholder="الاسم الكامل" 
                onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})} 
              />
              <input 
                className="w-full bg-gradient-to-r from-[#E0B0FF]/10 to-purple-50 border-2 border-[#E0B0FF]/20 p-4 rounded-3xl mb-4 text-right outline-none focus:ring-2 ring-[#E0B0FF]/30 font-medium" 
                placeholder="رقم الهاتف" 
                type="tel" 
                onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})} 
              />
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input 
                  className="w-full bg-gradient-to-r from-[#E0B0FF]/10 to-purple-50 border-2 border-[#E0B0FF]/20 p-4 rounded-3xl text-right outline-none focus:ring-2 ring-[#E0B0FF]/30 font-medium" 
                  placeholder="البلدية" 
                  onChange={e => setCustomerInfo({...customerInfo, commune: e.target.value})} 
                />
                <select 
                  className="w-full bg-gradient-to-r from-[#E0B0FF]/10 to-purple-50 border-2 border-[#E0B0FF]/20 p-4 rounded-3xl text-right outline-none focus:ring-2 ring-[#E0B0FF]/30 font-medium" 
                  onChange={e => setCustomerInfo({...customerInfo, city: e.target.value})}
                  value={customerInfo.city}
                >
                  {Object.keys(deliveryFees).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const list = cart.map(i => `• ${i.name} [${i.size}]`).join("%0A");
                  
                  // تسجيل الطلبية محلياً للعرض في لوحة التحكم
                  const newOrder = {
                    id: Date.now(),
                    customer: customerInfo.name,
                    phone: customerInfo.phone,
                    total: totalPrice,
                    date: new Date().toISOString(),
                    items: cart.length
                  };
                  const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
                  localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

                  window.open(`https://wa.me/${myWhatsApp}?text=طلب جديد من بوتيك أمينة:%0A------------------%0A${list}%0A------------------%0Aالإجمالي: ${totalPrice} DA%0Aالاسم: ${customerInfo.name}%0Aالهاتف: ${customerInfo.phone}%0Aالولاية: ${customerInfo.city}%0Aالبلدية: ${customerInfo.commune}`);
                }} 
                className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white py-5 rounded-3xl font-black text-lg shadow-2xl shadow-green-200"
              >
                تأكيد الطلب عبر واتساب 📱
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed bottom-0 w-full bg-white/95 backdrop-blur-2xl border-t-2 border-[#E0B0FF]/20 h-20 flex justify-around items-center px-4 rounded-t-[40px] z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
        <NavIcon icon={Home} label="Accueil" isActive={activeTab === "home"} onClick={() => { setActiveTab("home"); setIsSearching(false); }} />
        <NavIcon icon={ShoppingBag} label="Boutique" isActive={activeTab === "store"} onClick={() => setActiveTab("store")} />
        <NavIcon icon={ShoppingCart} label="La Panier" isActive={activeTab === "cart"} onClick={() => { setActiveTab("cart"); setIsSearching(false); }} badge={cart.length} />
      </nav>
    </div>
  );
}
import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { LogOut, Plus, Trash2, Pencil, Save, RotateCcw, X, Eye, Lock, Upload } from 'lucide-react';
import { Product } from '../types';
import {
  getStoredProducts,
  saveStoredProducts,
  clearStoredProducts,
} from '../data/productStore';
import { PRODUCTS } from '../data/portfolioData';

import appOmniPulseImg from '../assets/images/app_omnipulse_desktop_1785494849235.jpg';
import appNovaStudioImg from '../assets/images/app_novastudio_ide_1785494863797.jpg';
import appQuantumTraceImg from '../assets/images/app_quantumtrace_security_1785494875469.jpg';
import appHyperFlowImg from '../assets/images/app_hyperflow_cad_1785494890939.jpg';

const ADMIN_PASSWORD = 'admin2026';
const AUTH_KEY = 'portfolio_admin_auth';
const PRESET_IMAGES = [
  { label: 'OmniPulse DAW', src: appOmniPulseImg },
  { label: 'NovaStudio IDE', src: appNovaStudioImg },
  { label: 'QuantumTrace Security', src: appQuantumTraceImg },
  { label: 'HyperFlow CAD', src: appHyperFlowImg },
];

const emptyProduct = (): Product => ({
  id: '',
  title: '',
  category: '',
  year: String(new Date().getFullYear()),
  shortDescription: '',
  fullDescription: '',
  image: '',
  client: '',
  specs: [],
  tags: [],
  downloadUrl: '',
});

export const AdminDashboard: React.FC = () => {
  const [isAuthed, setIsAuthed] = useState<boolean>(
    () => sessionStorage.getItem(AUTH_KEY) === '1'
  );
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [products, setProducts] = useState<Product[]>(() => getStoredProducts() ?? PRODUCTS);
  const [savedFlash, setSavedFlash] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState<Product>(emptyProduct());
  const [tagRows, setTagRows] = useState<{ label: string; value: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const maxDim = 900;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          const scale = maxDim / Math.max(width, height);
          width = Math.round(width * scale);
          height = Math.round(height * scale);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, width, height);
        handleFormField('image', canvas.toDataURL('image/jpeg', 0.85));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthed(true);
      setLoginError('');
      sessionStorage.setItem(AUTH_KEY, '1');
    } else {
      setLoginError('Incorrect password. Try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthed(false);
    sessionStorage.removeItem(AUTH_KEY);
    setPassword('');
  };

  const handleSaveAll = () => {
    saveStoredProducts(products);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2000);
  };

  const handleReset = () => {
    clearStoredProducts();
    setProducts(PRODUCTS);
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyProduct());
    setTagRows([{ label: '', value: '' }]);
    setIsFormOpen(true);
  };

  const openEditForm = (product: Product) => {
    setEditingId(product.id);
    setForm({ ...product });
    setTagRows(
      product.specs.length > 0
        ? product.specs.map((s) => ({ ...s }))
        : [{ label: '', value: '' }]
    );
    setIsFormOpen(true);
  };

  const updateTagRow = (index: number, field: 'label' | 'value', val: string) => {
    setTagRows((prev) => prev.map((r, i) => (i === index ? { ...r, [field]: val } : r)));
  };

  const addTagRow = () => setTagRows((prev) => [...prev, { label: '', value: '' }]);

  const removeTagRow = (index: number) =>
    setTagRows((prev) => prev.filter((_, i) => i !== index));

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleFormField = (field: keyof Product, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    const specRows = tagRows
      .filter((r) => r.label.trim() && r.value.trim())
      .map((r) => ({ label: r.label.trim(), value: r.value.trim() }));

    const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const next: Product = {
      ...form,
      id: editingId ?? `${slug || 'app'}-${Date.now()}`,
      specs: specRows,
    };

    if (editingId) {
      setProducts((prev) => prev.map((p) => (p.id === editingId ? next : p)));
    } else {
      setProducts((prev) => [...prev, next]);
    }
    setIsFormOpen(false);
  };

  if (!isAuthed) {
    return (
      <section className="relative z-10 w-full min-h-screen flex items-center justify-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel p-8 sm:p-12 w-full max-w-md text-white"
        >
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#D7C4A3]/20 border border-[#D7C4A3]/40 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-[#D7C4A3]" />
            </div>
            <h1 className="font-serif text-3xl font-light tracking-wide">Admin Access</h1>
            <p className="text-xs text-neutral-300 font-light mt-2">
              Enter the admin password to manage portfolio apps.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              className="glass-input w-full px-4 py-3.5 text-sm font-light text-white placeholder-neutral-500"
            />
            {loginError && (
              <p className="text-xs text-red-400 font-light">{loginError}</p>
            )}
            <button
              type="submit"
              className="w-full glass-button-primary py-3.5 rounded-xl text-xs font-medium uppercase tracking-[0.2em] cursor-pointer"
            >
              Unlock Dashboard
            </button>
          </form>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel p-6 sm:p-10 text-white"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-light tracking-wide">
              Admin Control
            </h1>
            <p className="text-xs text-neutral-300 font-light mt-1">
              Manage the apps displayed in the portfolio. Changes persist in this browser.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {savedFlash && (
              <span className="text-xs text-[#D7C4A3] font-light">Saved</span>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <button
            onClick={openAddForm}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-button-primary text-xs font-medium uppercase tracking-wider cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add New App
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveAll}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              Save Changes
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset to Defaults
            </button>
          </div>
        </div>

        {isFormOpen && (
          <form onSubmit={handleSaveForm} className="mb-8 p-6 rounded-2xl bg-white/5 border border-[#D7C4A3]/30 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-serif text-xl font-light text-[#D7C4A3]">
                {editingId ? 'Edit App' : 'Add New App'}
              </h2>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                aria-label="Close form"
                className="p-2 rounded-full glass-button cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
                Title *
                <input
                  required
                  value={form.title}
                  onChange={(e) => handleFormField('title', e.target.value)}
                  className="glass-input px-4 py-3 text-sm font-light text-white"
                />
              </label>
              <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
                Category *
                <input
                  required
                  value={form.category}
                  onChange={(e) => handleFormField('category', e.target.value)}
                  className="glass-input px-4 py-3 text-sm font-light text-white"
                />
              </label>
              <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
                Year
                <input
                  value={form.year}
                  onChange={(e) => handleFormField('year', e.target.value)}
                  className="glass-input px-4 py-3 text-sm font-light text-white"
                />
              </label>
              <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
                Client
                <input
                  value={form.client}
                  onChange={(e) => handleFormField('client', e.target.value)}
                  className="glass-input px-4 py-3 text-sm font-light text-white"
                />
              </label>
            </div>

            <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
              Short Description *
              <input
                required
                value={form.shortDescription}
                onChange={(e) => handleFormField('shortDescription', e.target.value)}
                className="glass-input px-4 py-3 text-sm font-light text-white"
              />
            </label>

            <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
              Full Description
              <textarea
                rows={3}
                value={form.fullDescription}
                onChange={(e) => handleFormField('fullDescription', e.target.value)}
                className="glass-input px-4 py-3 text-sm font-light text-white resize-none"
              />
            </label>

              <div className="flex flex-col space-y-1.5 text-xs text-neutral-300">
                Image
                <div className="flex flex-wrap gap-2 items-center">
                  {PRESET_IMAGES.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handleFormField('image', preset.src)}
                      className={`p-1 rounded-xl border transition-all cursor-pointer ${
                        form.image === preset.src
                          ? 'border-[#D7C4A3] ring-1 ring-[#D7C4A3]/40'
                          : 'border-white/15 hover:border-white/40'
                      }`}
                      title={preset.label}
                    >
                      <img src={preset.src} alt={preset.label} className="w-16 h-12 object-cover rounded-lg" />
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 p-2 rounded-xl border border-white/15 text-[10px] uppercase tracking-wider text-neutral-300 hover:text-white hover:border-[#D7C4A3]/60 transition-all cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Upload Image
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => handleFormField('image', '')}
                    className={`p-2 rounded-xl border text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                      form.image === ''
                        ? 'border-[#D7C4A3] text-[#D7C4A3]'
                        : 'border-white/15 text-neutral-400 hover:border-white/40'
                    }`}
                  >
                    Custom URL
                  </button>
                </div>
                {form.image.startsWith('data:') ? (
                  <div className="flex items-center gap-3 mt-1">
                    <img
                      src={form.image}
                      alt="Uploaded preview"
                      className="w-16 h-12 object-cover rounded-lg border border-[#D7C4A3]/40"
                    />
                    <span className="text-[10px] text-neutral-400 font-light">
                      Uploaded image (stored in this browser)
                    </span>
                  </div>
                ) : (
                  form.image !== '' && (
                    <input
                      value={form.image}
                      onChange={(e) => handleFormField('image', e.target.value)}
                      placeholder="or paste an image URL here"
                      className="glass-input px-4 py-3 text-sm font-light text-white"
                    />
                  )
                )}
              </div>

            <div className="flex flex-col space-y-2">
              {tagRows.map((row, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    value={row.label}
                    onChange={(e) => updateTagRow(i, 'label', e.target.value)}
                    placeholder="Label"
                    className="glass-input px-3 py-2.5 text-sm font-light text-white flex-1"
                  />
                  <input
                    value={row.value}
                    onChange={(e) => updateTagRow(i, 'value', e.target.value)}
                    placeholder="Value"
                    className="glass-input px-3 py-2.5 text-sm font-light text-white flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => removeTagRow(i)}
                    aria-label="Remove tag"
                    className="p-2 rounded-xl text-neutral-400 hover:text-red-400 hover:bg-white/10 transition-colors shrink-0"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addTagRow}
                className="flex items-center gap-1.5 self-start px-3 py-2 rounded-xl text-xs text-neutral-300 border border-white/15 hover:border-[#D7C4A3]/50 hover:text-[#D7C4A3] transition-colors"
              >
                <Plus size={14} /> Add Tag
              </button>
            </div>

            <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
              Download URL
              <input
                value={form.downloadUrl ?? ''}
                onChange={(e) => handleFormField('downloadUrl', e.target.value)}
                className="glass-input px-4 py-3 text-sm font-light text-white"
              />
            </label>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-button-primary text-xs font-medium uppercase tracking-wider cursor-pointer"
              >
                <Save className="w-4 h-4" />
                {editingId ? 'Update App' : 'Add App'}
              </button>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-5 py-2.5 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="space-y-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D7C4A3]/30 transition-all flex items-center gap-4"
            >
              <div className="w-20 h-14 rounded-xl overflow-hidden border border-white/10 shrink-0">
                <img
                  src={product.image}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-white truncate">{product.title}</h3>
                <p className="text-xs text-neutral-400 font-light truncate">
                  {product.category} · {product.year} · {product.client || 'No client'}
                </p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => openEditForm(product)}
                  aria-label={`Edit ${product.title}`}
                  className="p-2.5 rounded-full glass-button cursor-pointer"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  aria-label={`Delete ${product.title}`}
                  className="p-2.5 rounded-full glass-button cursor-pointer"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-neutral-400 font-light">
            {products.length} app{products.length === 1 ? '' : 's'} · Click "Save Changes" to persist.
          </p>
          <a
            href="/"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            View Site
          </a>
        </div>
      </motion.div>
    </section>
  );
};

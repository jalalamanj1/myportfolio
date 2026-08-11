import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { LogOut, Plus, Trash2, Pencil, Save, RotateCcw, X, Eye, Lock, Upload, Layers, Download, Briefcase, Award, Globe, ChevronDown, ChevronRight, ChevronUp } from 'lucide-react';
import { Product, ServiceCategory, ServiceItem, PromptCategory, PromptItem, AboutData, ExperienceItem, CertificationItem, LanguageItem } from '../types';
import {
  getStoredProducts,
  saveStoredProducts,
  fetchProducts,
} from '../data/productStore';
import {
  getStoredServices,
  saveStoredServices,
  fetchServices,
} from '../data/serviceStore';
import { getStoredPromptCategories, saveStoredPromptCategories, fetchPromptCategories, mergePromptCategories } from '../data/promptStore';
import { getGitHubConfig, saveGitHubConfig, pushPromptsToGitHub, pushProductsToGitHub, pushServicesToGitHub, pushAboutToGitHub, GitHubConfig } from '../data/githubSync';
import { GitHubSyncCard } from './GitHubSyncCard';
import { getAboutData, saveStoredAbout, fetchAbout, getStoredAbout } from '../data/aboutStore';
import { PRODUCTS } from '../data/portfolioData';
import { assetUrl } from '../utils/asset';

const ADMIN_PASSWORD = 'admin2026';
const AUTH_KEY = 'portfolio_admin_auth';

const ICON_OPTIONS = [
  'Laptop', 'Code', 'Palette', 'Sparkles', 'Monitor', 'Smartphone', 'Globe',
  'Layout', 'Database', 'Server', 'Cpu', 'Wrench', 'Zap', 'Layers',
  'HelpCircle', 'Pentagon', 'Image', 'Share2', 'FileText', 'Box',
  'Component', 'Camera', 'Maximize2', 'Brush', 'MessageSquare', 'BookOpen',
  'FileCode', 'Search', 'Calendar',
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

const emptyCategory = (): ServiceCategory => ({
  id: '',
  title: '',
  subtitle: '',
  description: '',
  iconName: 'Sparkles',
  services: [],
});

const emptyService = (): ServiceItem => ({
  id: '',
  title: '',
  description: '',
  category: '',
  iconName: 'Sparkles',
  deliverables: [],
  actionType: 'request',
  actionUrl: '',
  actionLabel: '',
});

const emptyPromptCategory = (): PromptCategory => ({
  id: '',
  title: '',
  iconName: 'Sparkles',
  prompts: [],
});

const emptyPrompt = (): PromptItem => ({
  id: '',
  title: '',
  image: '',
  promptText: '',
  howToUse: [],
});

const slugify = (value: string): string =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

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

  const [tab, setTab] = useState<'apps' | 'services' | 'prompts' | 'profile'>('apps');
  const [services, setServices] = useState<ServiceCategory[]>(() => getStoredServices() ?? []);
  const [servicesSavedFlash, setServicesSavedFlash] = useState(false);

  const [catFormOpen, setCatFormOpen] = useState(false);
  const [catEditingId, setCatEditingId] = useState<string | null>(null);
  const [catForm, setCatForm] = useState<ServiceCategory>(emptyCategory());

  const [svcFormOpen, setSvcFormOpen] = useState(false);
  const [svcEditingId, setSvcEditingId] = useState<string | null>(null);
  const [svcCategoryId, setSvcCategoryId] = useState('');
  const [svcForm, setSvcForm] = useState<ServiceItem>(emptyService());

  const [promptCats, setPromptCats] = useState<PromptCategory[]>([]);
  useEffect(() => {
    let cancelled = false;
    getStoredPromptCategories().then((stored) => {
      if (cancelled || !stored || stored.length === 0) return;
      setPromptCats((prev) => (prev.length === 0 ? stored : prev));
    });
    return () => {
      cancelled = true;
    };
  }, []);
  const [promptsSavedFlash, setPromptsSavedFlash] = useState(false);

  const [ghConfig, setGhConfig] = useState<GitHubConfig>(() => getGitHubConfig());
  const [ghStatus, setGhStatus] = useState('');
  const [ghBusy, setGhBusy] = useState(false);

  const [promptCatFormOpen, setPromptCatFormOpen] = useState(false);
  const [promptCatEditingId, setPromptCatEditingId] = useState<string | null>(null);
  const [promptCatForm, setPromptCatForm] = useState<PromptCategory>(emptyPromptCategory());

  const [promptFormOpen, setPromptFormOpen] = useState(false);
  const [promptEditingId, setPromptEditingId] = useState<string | null>(null);
  const [promptCategoryId, setPromptCategoryId] = useState('');
  const [promptForm, setPromptForm] = useState<PromptItem>(emptyPrompt());
  const promptFileInputRef = useRef<HTMLInputElement>(null);

  const [about, setAbout] = useState<AboutData>(() => getAboutData());
  const [aboutSavedFlash, setAboutSavedFlash] = useState(false);

  const [expFormOpen, setExpFormOpen] = useState(false);
  const [expEditingIdx, setExpEditingIdx] = useState<number | null>(null);
  const [expForm, setExpForm] = useState<ExperienceItem>({ year: '', role: '', company: '', description: '' });

  const [certFormOpen, setCertFormOpen] = useState(false);
  const [certEditingIdx, setCertEditingIdx] = useState<number | null>(null);
  const [certForm, setCertForm] = useState<CertificationItem>({ name: '', issuer: '', year: '', credentialId: '' });

  const [langFormOpen, setLangFormOpen] = useState(false);
  const [langEditingIdx, setLangEditingIdx] = useState<number | null>(null);
  const [langForm, setLangForm] = useState<LanguageItem>({ language: '', level: '' });
  const [expandedCat, setExpandedCat] = useState<string | null>(null);

  const scrollToForm = (id: string) => {
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  useEffect(() => {
    if (!isAuthed) return;
    let cancelled = false;
    (async () => {
      const [fetchedProducts, fetchedServices, fetchedPrompts, fetchedAbout] = await Promise.all([
        fetchProducts(),
        fetchServices(),
        fetchPromptCategories(),
        fetchAbout(),
      ]);
      if (cancelled) return;
      if (!getStoredProducts()) {
        setProducts(fetchedProducts);
        saveStoredProducts(fetchedProducts);
      }
      if (!getStoredServices()) {
        setServices(fetchedServices);
        saveStoredServices(fetchedServices);
      }
      // File (prompts.json) is the source of truth for restored/shared prompts;
      // keep any locally-added prompts that aren't in the file, then persist the
      // merged set so the admin never gets stuck on a stale cache.
      const mergedPrompts = mergePromptCategories(
        (await getStoredPromptCategories()) ?? [],
        fetchedPrompts
      );
      setPromptCats(mergedPrompts);
      try {
        await saveStoredPromptCategories(mergedPrompts);
      } catch {
        // Persistence is best-effort here; in-memory state is still usable.
      }
      if (!getStoredAbout()) {
        setAbout(fetchedAbout);
        saveStoredAbout(fetchedAbout);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isAuthed]);

  const resizeImageFile = (file: File | Blob): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const max = 900;
          const ratio = Math.min(max / img.width, max / img.height, 1);
          const width = Math.max(1, Math.round(img.width * ratio));
          const height = Math.max(1, Math.round(img.height * ratio));
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Canvas not supported'));
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        };
        img.onerror = reject;
        img.src = reader.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await resizeImageFile(file);
      handleFormField('image', dataUrl);
    } catch {
      // ignore invalid image
    }
  };

  const handleImagePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    const item = Array.from({ length: items.length }, (_, i) => items[i]).find(
      (i) => i.type.startsWith('image/')
    );
    if (!item) return;
    e.preventDefault();
    const file = item.getAsFile();
    if (!file) return;
    resizeImageFile(file)
      .then((dataUrl) => handleFormField('image', dataUrl))
      .catch(() => {
        // ignore invalid clipboard image
      });
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

  const persistProducts = (next: Product[]) => {
    setProducts(next);
    saveStoredProducts(next);
    if (ghConfig.token) void handlePushProductsToGitHub(false, next);
  };

  const persistServices = (next: ServiceCategory[]) => {
    setServices(next);
    saveStoredServices(next);
    if (ghConfig.token) void handlePushServicesToGitHub(false, next);
  };

  const persistPromptCats = async (next: PromptCategory[]) => {
    setPromptCats(next);
    try {
      await saveStoredPromptCategories(next);
    } catch (err) {
      console.error('Failed to persist prompts:', err);
    }
    if (ghConfig.token) void handlePushPromptsToGitHub(false, next);
  };

  const persistAbout = (next: AboutData) => {
    setAbout(next);
    saveStoredAbout(next);
    if (ghConfig.token) void handlePushAboutToGitHub(false, next);
  };

  const handleSaveAll = () => {
    saveStoredProducts(products);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2000);
    if (ghConfig.token) {
      handlePushProductsToGitHub(false);
    }
  };

  const handleReset = () => {
    persistProducts(PRODUCTS);
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyProduct());
    setTagRows([{ label: '', value: '' }]);
    setIsFormOpen(true);
    scrollToForm('product-form');
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
    scrollToForm('product-form');
  };

  const updateTagRow = (index: number, field: 'label' | 'value', val: string) => {
    setTagRows((prev) => prev.map((r, i) => (i === index ? { ...r, [field]: val } : r)));
  };

  const addTagRow = () => setTagRows((prev) => [...prev, { label: '', value: '' }]);

  const removeTagRow = (index: number) =>
    setTagRows((prev) => prev.filter((_, i) => i !== index));

  const handleDelete = (id: string) => {
    persistProducts(products.filter((p) => p.id !== id));
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
      persistProducts(products.map((p) => (p.id === editingId ? next : p)));
    } else {
      persistProducts([...products, next]);
    }
    setIsFormOpen(false);
  };

  const handleSaveAllServices = () => {
    saveStoredServices(services);
    setServicesSavedFlash(true);
    setTimeout(() => setServicesSavedFlash(false), 2000);
    if (ghConfig.token) {
      handlePushServicesToGitHub(false);
    }
  };

  const handleResetServices = () => {
    persistServices([]);
  };

  const openCategoryForm = () => {
    setCatEditingId(null);
    setCatForm(emptyCategory());
    setCatFormOpen(true);
    scrollToForm('service-category-form');
  };

  const openEditCategory = (cat: ServiceCategory) => {
    setCatEditingId(cat.id);
    setCatForm({ ...cat });
    setCatFormOpen(true);
    scrollToForm('service-category-form');
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = slugify(catForm.title);
    const next: ServiceCategory = {
      ...catForm,
      id: catEditingId ?? `${slug || 'category'}-${Date.now()}`,
    };
    if (catEditingId) {
      persistServices(
        services.map((c) => {
          if (c.id !== catEditingId) return c;
          return {
            ...next,
            services: next.services.map((s) => ({ ...s, category: next.id })),
          };
        })
      );
    } else {
      persistServices([...services, next]);
    }
    setCatFormOpen(false);
  };

  const handleDeleteCategory = (id: string) => {
    persistServices(services.filter((c) => c.id !== id));
  };

  const openServiceForm = (categoryId: string) => {
    setSvcCategoryId(categoryId);
    setSvcEditingId(null);
    setSvcForm({ ...emptyService(), category: categoryId });
    setSvcFormOpen(true);
    scrollToForm('service-item-form');
  };

  const openEditService = (cat: ServiceCategory, svc: ServiceItem) => {
    setSvcCategoryId(cat.id);
    setSvcEditingId(svc.id);
    setSvcForm({
      ...svc,
      category: cat.id,
      deliverables: svc.deliverables ?? [],
    });
    setSvcFormOpen(true);
    scrollToForm('service-item-form');
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = slugify(svcForm.title);
    const deliverables = svcForm.deliverables
      ? svcForm.deliverables.map((d) => d.trim()).filter(Boolean)
      : [];
    const next: ServiceItem = {
      ...svcForm,
      id: svcEditingId ?? `${slug || 'service'}-${Date.now()}`,
      category: svcCategoryId,
      deliverables,
    };
    persistServices(
      services.map((c) => {
        if (c.id !== svcCategoryId) return c;
        const items = svcEditingId
          ? c.services.map((s) => (s.id === svcEditingId ? next : s))
          : [...c.services, next];
        return { ...c, services: items };
      })
    );
    setSvcFormOpen(false);
  };

  const handleDeleteService = (catId: string, svcId: string) => {
    persistServices(
      services.map((c) =>
        c.id === catId
          ? { ...c, services: c.services.filter((s) => s.id !== svcId) }
          : c
      )
    );
  };

  const handleSaveAllPrompts = async () => {
    try {
      await saveStoredPromptCategories(promptCats);
      setPromptsSavedFlash(true);
      setTimeout(() => setPromptsSavedFlash(false), 2000);
    } catch (err) {
      console.error('Failed to save prompts:', err);
      setGhStatus('Could not save prompts to browser storage.');
    }
    if (ghConfig.token) {
      void handlePushPromptsToGitHub(false);
    }
  };

  const handlePushProductsToGitHub = async (showErrors = true, data?: Product[]) => {
    if (!ghConfig.token) {
      if (showErrors) setGhStatus('Enter a GitHub token first.');
      return;
    }
    setGhBusy(true);
    setGhStatus('Pushing apps to GitHub…');
    try {
      await pushProductsToGitHub(ghConfig.token, ghConfig.repo, data ?? products);
      setGhStatus('Pushed — site is redeploying. Visitors see updates in ~2 min.');
    } catch (err) {
      setGhStatus(err instanceof Error ? err.message : 'Push failed.');
    } finally {
      setGhBusy(false);
    }
  };

  const handlePushServicesToGitHub = async (showErrors = true, data?: ServiceCategory[]) => {
    if (!ghConfig.token) {
      if (showErrors) setGhStatus('Enter a GitHub token first.');
      return;
    }
    setGhBusy(true);
    setGhStatus('Pushing services to GitHub…');
    try {
      await pushServicesToGitHub(ghConfig.token, ghConfig.repo, data ?? services);
      setGhStatus('Pushed — site is redeploying. Visitors see updates in ~2 min.');
    } catch (err) {
      setGhStatus(err instanceof Error ? err.message : 'Push failed.');
    } finally {
      setGhBusy(false);
    }
  };

  const handlePushPromptsToGitHub = async (showErrors = true, data?: PromptCategory[]) => {
    if (!ghConfig.token) {
      if (showErrors) setGhStatus('Enter a GitHub token first.');
      return;
    }
    setGhBusy(true);
    setGhStatus('Pushing to GitHub…');
    try {
      await pushPromptsToGitHub(ghConfig.token, ghConfig.repo, data ?? promptCats);
      setGhStatus('Pushed — site is redeploying. Visitors see updates in ~2 min.');
    } catch (err) {
      setGhStatus(err instanceof Error ? err.message : 'Push failed.');
    } finally {
      setGhBusy(false);
    }
  };

  const handleSaveAllAbout = () => {
    saveStoredAbout(about);
    setAboutSavedFlash(true);
    setTimeout(() => setAboutSavedFlash(false), 2000);
    if (ghConfig.token) {
      handlePushAboutToGitHub(false);
    }
  };

  const handleResetAbout = () => {
    persistAbout({ experiences: [], certifications: [], languages: [] });
  };

  const handlePushAboutToGitHub = async (showErrors = true, data?: AboutData) => {
    if (!ghConfig.token) {
      if (showErrors) setGhStatus('Enter a GitHub token first.');
      return;
    }
    setGhBusy(true);
    setGhStatus('Pushing about data to GitHub…');
    try {
      await pushAboutToGitHub(ghConfig.token, ghConfig.repo, data ?? about);
      setGhStatus('Pushed — site is redeploying. Visitors see updates in ~2 min.');
    } catch (err) {
      setGhStatus(err instanceof Error ? err.message : 'Push failed.');
    } finally {
      setGhBusy(false);
    }
  };

  const openExpForm = (idx?: number) => {
    setExpEditingIdx(idx ?? null);
    setExpForm(
      idx !== undefined && about.experiences[idx]
        ? { ...about.experiences[idx] }
        : { year: '', role: '', company: '', description: '' }
    );
    setExpFormOpen(true);
    scrollToForm('exp-form');
  };

  const handleSaveExp = (e: React.FormEvent) => {
    e.preventDefault();
    const list =
      expEditingIdx !== null
        ? about.experiences.map((it, i) => (i === expEditingIdx ? expForm : it))
        : [...about.experiences, expForm];
    persistAbout({ ...about, experiences: list });
    setExpFormOpen(false);
  };

  const handleDeleteExp = (idx: number) => {
    persistAbout({ ...about, experiences: about.experiences.filter((_, i) => i !== idx) });
  };

  const openCertForm = (idx?: number) => {
    setCertEditingIdx(idx ?? null);
    setCertForm(
      idx !== undefined && about.certifications[idx]
        ? { ...about.certifications[idx] }
        : { name: '', issuer: '', year: '', credentialId: '' }
    );
    setCertFormOpen(true);
    scrollToForm('cert-form');
  };

  const handleSaveCert = (e: React.FormEvent) => {
    e.preventDefault();
    const list =
      certEditingIdx !== null
        ? about.certifications.map((it, i) => (i === certEditingIdx ? certForm : it))
        : [...about.certifications, certForm];
    persistAbout({ ...about, certifications: list });
    setCertFormOpen(false);
  };

  const handleDeleteCert = (idx: number) => {
    persistAbout({ ...about, certifications: about.certifications.filter((_, i) => i !== idx) });
  };

  const openLangForm = (idx?: number) => {
    setLangEditingIdx(idx ?? null);
    setLangForm(
      idx !== undefined && about.languages[idx]
        ? { ...about.languages[idx] }
        : { language: '', level: '' }
    );
    setLangFormOpen(true);
    scrollToForm('lang-form');
  };

  const handleSaveLang = (e: React.FormEvent) => {
    e.preventDefault();
    const list =
      langEditingIdx !== null
        ? about.languages.map((it, i) => (i === langEditingIdx ? langForm : it))
        : [...about.languages, langForm];
    persistAbout({ ...about, languages: list });
    setLangFormOpen(false);
  };

  const handleDeleteLang = (idx: number) => {
    persistAbout({ ...about, languages: about.languages.filter((_, i) => i !== idx) });
  };

  const handleSaveGhConfig = () => {
    saveGitHubConfig(ghConfig);
    setGhStatus('GitHub connection saved.');
  };

  const handleDownloadPrompts = () => {
    const blob = new Blob([JSON.stringify(promptCats, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prompts.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleResetPrompts = () => {
    persistPromptCats([]);
  };

  const openPromptCategoryForm = () => {
    setPromptCatEditingId(null);
    setPromptCatForm(emptyPromptCategory());
    setPromptCatFormOpen(true);
    scrollToForm('prompt-category-form');
  };

  const openEditPromptCategory = (cat: PromptCategory) => {
    setPromptCatEditingId(cat.id);
    setPromptCatForm({ ...cat });
    setPromptCatFormOpen(true);
    scrollToForm('prompt-category-form');
  };

  const handleSavePromptCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = slugify(promptCatForm.title);
    const next: PromptCategory = {
      ...promptCatForm,
      id: promptCatEditingId ?? `${slug || 'category'}-${Date.now()}`,
    };
    if (promptCatEditingId) {
      persistPromptCats(promptCats.map((c) => (c.id === promptCatEditingId ? next : c)));
    } else {
      persistPromptCats([...promptCats, next]);
    }
    setPromptCatFormOpen(false);
  };

  const handleDeletePromptCategory = (id: string) => {
    persistPromptCats(promptCats.filter((c) => c.id !== id));
  };

  const openPromptForm = (categoryId: string) => {
    setPromptCategoryId(categoryId);
    setPromptEditingId(null);
    setPromptForm(emptyPrompt());
    setPromptFormOpen(true);
    setExpandedCat(categoryId);
    scrollToForm('prompt-form');
  };

  const openEditPrompt = (cat: PromptCategory, prompt: PromptItem) => {
    setPromptCategoryId(cat.id);
    setPromptEditingId(prompt.id);
    setPromptForm({ ...prompt, howToUse: prompt.howToUse ?? [] });
    setPromptFormOpen(true);
    scrollToForm('prompt-form');
  };

  const handleSavePrompt = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = slugify(promptForm.title);
    const next: PromptItem = {
      ...promptForm,
      id: promptEditingId ?? `${slug || 'prompt'}-${Date.now()}`,
    };
    persistPromptCats(
      promptCats.map((c) => {
        if (c.id !== promptCategoryId) return c;
        const items = promptEditingId
          ? c.prompts.map((p) => (p.id === promptEditingId ? next : p))
          : [...c.prompts, next];
        return { ...c, prompts: items };
      })
    );
    setPromptFormOpen(false);
  };

  const handleDeletePrompt = (catId: string, promptId: string) => {
    persistPromptCats(
      promptCats.map((c) =>
        c.id === catId
          ? { ...c, prompts: c.prompts.filter((p) => p.id !== promptId) }
          : c
      )
    );
  };

  const handlePromptImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await resizeImageFile(file);
      setPromptForm((prev) => ({ ...prev, image: dataUrl }));
    } catch {
      // ignore invalid image
    }
  };

  const handlePromptImagePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    const item = Array.from({ length: items.length }, (_, i) => items[i]).find(
      (i) => i.type.startsWith('image/')
    );
    if (!item) return;
    e.preventDefault();
    const file = item.getAsFile();
    if (!file) return;
    resizeImageFile(file)
      .then((dataUrl) => setPromptForm((prev) => ({ ...prev, image: dataUrl })))
      .catch(() => {
        // ignore invalid clipboard image
      });
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
              Manage the apps and services shown on the site. Changes persist in this browser.
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

        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={() => setTab('apps')}
            className={`px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
              tab === 'apps'
                ? 'bg-[#D7C4A3] text-black shadow-lg font-semibold'
                : 'glass-button text-neutral-300 hover:text-white'
            }`}
          >
            Apps
          </button>
          <button
            onClick={() => setTab('services')}
            className={`px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
              tab === 'services'
                ? 'bg-[#D7C4A3] text-black shadow-lg font-semibold'
                : 'glass-button text-neutral-300 hover:text-white'
            }`}
          >
            Services
          </button>
          <button
            onClick={() => setTab('prompts')}
            className={`px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
              tab === 'prompts'
                ? 'bg-[#D7C4A3] text-black shadow-lg font-semibold'
                : 'glass-button text-neutral-300 hover:text-white'
            }`}
          >
            Prompts
          </button>
          <button
            onClick={() => setTab('profile')}
            className={`px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
              tab === 'profile'
                ? 'bg-[#D7C4A3] text-black shadow-lg font-semibold'
                : 'glass-button text-neutral-300 hover:text-white'
            }`}
          >
            Profile
          </button>
        </div>

        {tab === 'apps' && (
        <>

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

        <GitHubSyncCard
          config={ghConfig}
          onConfigChange={setGhConfig}
          status={ghStatus}
          busy={ghBusy}
          onSaveConfig={handleSaveGhConfig}
          onPush={() => handlePushProductsToGitHub(true)}
          pushLabel="Push Apps to GitHub"
        />

        {isFormOpen && (
          <form id="product-form" onSubmit={handleSaveForm} onPaste={handleImagePaste} className="mb-8 p-6 rounded-2xl bg-white/5 border border-[#D7C4A3]/30 space-y-4">
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
                  <span className="text-[10px] text-neutral-400 font-light">
                    or paste an image (Ctrl+V)
                  </span>
                </div>
                {form.image.startsWith('data:') ? (
                  <div className="flex items-center gap-3 mt-1">
                    <img
                      src={assetUrl(form.image)}
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
                  src={assetUrl(product.image)}
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
        </>
        )}

        {tab === 'services' && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <button
                onClick={openCategoryForm}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-button-primary text-xs font-medium uppercase tracking-wider cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Category
              </button>
              <div className="flex items-center gap-2">
                {servicesSavedFlash && (
                  <span className="text-xs text-[#D7C4A3] font-light">Saved</span>
                )}
                <button
                  onClick={handleSaveAllServices}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Services
                </button>
                <button
                  onClick={handleResetServices}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Services
                </button>
              </div>
            </div>

            <GitHubSyncCard
              config={ghConfig}
              onConfigChange={setGhConfig}
              status={ghStatus}
              busy={ghBusy}
              onSaveConfig={handleSaveGhConfig}
              onPush={() => handlePushServicesToGitHub(true)}
              pushLabel="Push Services to GitHub"
            />

            {catFormOpen && (
              <form id="service-category-form" onSubmit={handleSaveCategory} className="mb-8 p-6 rounded-2xl bg-white/5 border border-[#D7C4A3]/30 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-serif text-xl font-light text-[#D7C4A3]">
                    {catEditingId ? 'Edit Category' : 'Add Category'}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setCatFormOpen(false)}
                    aria-label="Close form"
                    className="p-2 rounded-full glass-button cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
                  Title *
                  <input
                    required
                    value={catForm.title}
                    onChange={(e) => setCatForm({ ...catForm, title: e.target.value })}
                    className="glass-input px-4 py-3 text-sm font-light text-white"
                  />
                </label>
                <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
                  Subtitle
                  <input
                    value={catForm.subtitle}
                    onChange={(e) => setCatForm({ ...catForm, subtitle: e.target.value })}
                    className="glass-input px-4 py-3 text-sm font-light text-white"
                  />
                </label>
                <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
                  Description
                  <textarea
                    rows={3}
                    value={catForm.description}
                    onChange={(e) => setCatForm({ ...catForm, description: e.target.value })}
                    className="glass-input px-4 py-3 text-sm font-light text-white resize-none"
                  />
                </label>
                <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
                  Icon
                  <select
                    value={catForm.iconName}
                    onChange={(e) => setCatForm({ ...catForm, iconName: e.target.value })}
                    className="glass-input px-4 py-3 text-sm font-light text-white bg-black/40"
                  >
                    {ICON_OPTIONS.map((name) => (
                      <option key={name} value={name} className="bg-black text-white">
                        {name}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-button-primary text-xs font-medium uppercase tracking-wider cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    {catEditingId ? 'Update Category' : 'Add Category'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCatFormOpen(false)}
                    className="px-5 py-2.5 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {svcFormOpen && (
              <form id="service-item-form" onSubmit={handleSaveService} className="mb-8 p-6 rounded-2xl bg-white/5 border border-[#D7C4A3]/30 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-serif text-xl font-light text-[#D7C4A3]">
                    {svcEditingId ? 'Edit Service' : 'Add Service'}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setSvcFormOpen(false)}
                    aria-label="Close form"
                    className="p-2 rounded-full glass-button cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
                  Title *
                  <input
                    required
                    value={svcForm.title}
                    onChange={(e) => setSvcForm({ ...svcForm, title: e.target.value })}
                    className="glass-input px-4 py-3 text-sm font-light text-white"
                  />
                </label>
                <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
                  Description *
                  <textarea
                    required
                    rows={3}
                    value={svcForm.description}
                    onChange={(e) => setSvcForm({ ...svcForm, description: e.target.value })}
                    className="glass-input px-4 py-3 text-sm font-light text-white resize-none"
                  />
                </label>
                <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
                  Icon
                  <select
                    value={svcForm.iconName}
                    onChange={(e) => setSvcForm({ ...svcForm, iconName: e.target.value })}
                    className="glass-input px-4 py-3 text-sm font-light text-white bg-black/40"
                  >
                    {ICON_OPTIONS.map((name) => (
                      <option key={name} value={name} className="bg-black text-white">
                        {name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
                  Deliverables (one per line)
                  <textarea
                    rows={3}
                    value={(svcForm.deliverables ?? []).join('\n')}
                    onChange={(e) =>
                      setSvcForm({ ...svcForm, deliverables: e.target.value.split('\n') })
                    }
                    className="glass-input px-4 py-3 text-sm font-light text-white resize-none"
                  />
                </label>
                <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
                  Button Action
                  <select
                    value={svcForm.actionType ?? 'request'}
                    onChange={(e) =>
                      setSvcForm({
                        ...svcForm,
                        actionType: e.target.value as ServiceItem['actionType'],
                      })
                    }
                    className="glass-input px-4 py-3 text-sm font-light text-white bg-black/40"
                  >
                    <option value="request" className="bg-black text-white">Request Service</option>
                    <option value="link" className="bg-black text-white">Open Link</option>
                    <option value="download" className="bg-black text-white">Download</option>
                  </select>
                </label>
                {(svcForm.actionType === 'link' || svcForm.actionType === 'download') && (
                  <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
                    Link / File URL *
                    <input
                      required
                      value={svcForm.actionUrl ?? ''}
                      onChange={(e) => setSvcForm({ ...svcForm, actionUrl: e.target.value })}
                      placeholder={svcForm.actionType === 'download' ? 'https://example.com/file.zip' : 'https://example.com'}
                      className="glass-input px-4 py-3 text-sm font-light text-white"
                    />
                  </label>
                )}
                <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
                  Button Label (optional)
                  <input
                    value={svcForm.actionLabel ?? ''}
                    onChange={(e) => setSvcForm({ ...svcForm, actionLabel: e.target.value })}
                    placeholder="Leave empty for default (e.g. Request Service)"
                    className="glass-input px-4 py-3 text-sm font-light text-white"
                  />
                </label>
                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-button-primary text-xs font-medium uppercase tracking-wider cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    {svcEditingId ? 'Update Service' : 'Add Service'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSvcFormOpen(false)}
                    className="px-5 py-2.5 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {services.length === 0 ? (
              <div className="p-10 text-center rounded-2xl bg-white/5 border border-white/10">
                <Layers className="w-8 h-8 text-[#D7C4A3] mx-auto mb-4" />
                <h3 className="font-serif text-xl font-light text-white mb-1">No categories yet</h3>
                <p className="text-xs text-neutral-400 font-light">
                  Click "Add Category" to create your first service category, then add services inside it.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {services.map((cat) => (
                  <div key={cat.id} className="p-5 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2.5 rounded-xl bg-white/10 border border-white/15 text-[#D7C4A3] shrink-0">
                          <Layers className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm font-medium text-white truncate">{cat.title}</h3>
                          <p className="text-xs text-neutral-400 font-light">
                            {cat.services.length} service{cat.services.length === 1 ? '' : 's'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => openEditCategory(cat)}
                          aria-label={`Edit ${cat.title}`}
                          className="p-2.5 rounded-full glass-button cursor-pointer"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(cat.id)}
                          aria-label={`Delete ${cat.title}`}
                          className="p-2.5 rounded-full glass-button cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      {cat.services.map((svc) => (
                        <div
                          key={svc.id}
                          className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                        >
                          <div className="min-w-0">
                            <h4 className="text-sm font-light text-white truncate">{svc.title}</h4>
                            <p className="text-xs text-neutral-400 font-light truncate">{svc.description}</p>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => openEditService(cat, svc)}
                              aria-label={`Edit ${svc.title}`}
                              className="p-2 rounded-lg glass-button cursor-pointer"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteService(cat.id, svc.id)}
                              aria-label={`Delete ${svc.title}`}
                              className="p-2 rounded-lg glass-button cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-red-400" />
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => openServiceForm(cat.id)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-neutral-300 border border-dashed border-white/20 hover:border-[#D7C4A3]/50 hover:text-[#D7C4A3] transition-colors"
                      >
                        <Plus size={14} /> Add Service
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs text-neutral-400 font-light">
                {services.length} categor{services.length === 1 ? 'y' : 'ies'} · Click "Save Services" to persist.
              </p>
            </div>
          </div>
        )}

        {tab === 'prompts' && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <button
                onClick={openPromptCategoryForm}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-button-primary text-xs font-medium uppercase tracking-wider cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Category
              </button>
              <div className="flex items-center gap-2">
                {promptsSavedFlash && (
                  <span className="text-xs text-[#D7C4A3] font-light">Saved</span>
                )}
                <button
                  onClick={handleSaveAllPrompts}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Prompts
                </button>
                <button
                  onClick={handleDownloadPrompts}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Prompts JSON
                </button>
                <button
                  onClick={handleResetPrompts}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Prompts
                </button>
              </div>
            </div>

            <GitHubSyncCard
              config={ghConfig}
              onConfigChange={setGhConfig}
              status={ghStatus}
              busy={ghBusy}
              onSaveConfig={handleSaveGhConfig}
              onPush={() => handlePushPromptsToGitHub(true)}
              pushLabel="Push Prompts to GitHub"
            />

            {promptCatFormOpen && (
              <form id="prompt-category-form" onSubmit={handleSavePromptCategory} className="mb-8 p-6 rounded-2xl bg-white/5 border border-[#D7C4A3]/30 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-serif text-xl font-light text-[#D7C4A3]">
                    {promptCatEditingId ? 'Edit Category' : 'Add Category'}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setPromptCatFormOpen(false)}
                    aria-label="Close form"
                    className="p-2 rounded-full glass-button cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
                  Title *
                  <input
                    required
                    value={promptCatForm.title}
                    onChange={(e) => setPromptCatForm({ ...promptCatForm, title: e.target.value })}
                    className="glass-input px-4 py-3 text-sm font-light text-white"
                  />
                </label>
                <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
                  Icon
                  <select
                    value={promptCatForm.iconName}
                    onChange={(e) => setPromptCatForm({ ...promptCatForm, iconName: e.target.value })}
                    className="glass-input px-4 py-3 text-sm font-light text-white bg-black/40"
                  >
                    {ICON_OPTIONS.map((name) => (
                      <option key={name} value={name} className="bg-black text-white">
                        {name}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-button-primary text-xs font-medium uppercase tracking-wider cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    {promptCatEditingId ? 'Update Category' : 'Add Category'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPromptCatFormOpen(false)}
                    className="px-5 py-2.5 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {promptFormOpen && (
              <form id="prompt-form" onSubmit={handleSavePrompt} onPaste={handlePromptImagePaste} className="mb-8 p-6 rounded-2xl bg-white/5 border border-[#D7C4A3]/30 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-serif text-xl font-light text-[#D7C4A3]">
                    {promptEditingId ? 'Edit Prompt' : 'Add Prompt'}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setPromptFormOpen(false)}
                    aria-label="Close form"
                    className="p-2 rounded-full glass-button cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
                  Title *
                  <input
                    required
                    value={promptForm.title}
                    onChange={(e) => setPromptForm({ ...promptForm, title: e.target.value })}
                    className="glass-input px-4 py-3 text-sm font-light text-white"
                  />
                </label>
                <div className="flex flex-col space-y-1.5 text-xs text-neutral-300">
                  Image
                  <div className="flex flex-wrap gap-2 items-center">
                    <button
                      type="button"
                      onClick={() => promptFileInputRef.current?.click()}
                      className="flex items-center gap-1.5 p-2 rounded-xl border border-white/15 text-[10px] uppercase tracking-wider text-neutral-300 hover:text-white hover:border-[#D7C4A3]/60 transition-all cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      Upload Image
                    </button>
                    <input
                      ref={promptFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePromptImageUpload}
                      className="hidden"
                    />
                    <span className="text-[10px] text-neutral-400 font-light">
                      or paste an image (Ctrl+V)
                    </span>
                    {promptForm.image !== '' && (
                      <img
                        src={assetUrl(promptForm.image)}
                        alt="Preview"
                        className="w-16 h-12 object-cover rounded-lg border border-[#D7C4A3]/40"
                      />
                    )}
                  </div>
                  {promptForm.image !== '' && !promptForm.image.startsWith('data:') && (
                    <input
                      value={promptForm.image}
                      onChange={(e) => setPromptForm({ ...promptForm, image: e.target.value })}
                      placeholder="or paste an image URL here"
                      className="glass-input px-4 py-3 text-sm font-light text-white"
                    />
                  )}
                </div>
                <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
                  Prompt Text (hidden from visitors — only copied to clipboard)
                  <textarea
                    required
                    rows={5}
                    value={promptForm.promptText}
                    onChange={(e) => setPromptForm({ ...promptForm, promptText: e.target.value })}
                    placeholder="Paste the prompt text here..."
                    className="glass-input px-4 py-3 text-sm font-light text-white resize-none"
                  />
                </label>

                {/* How to Use Steps */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-neutral-300 font-light">
                      How to Use (optional)
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setPromptForm((prev) => ({
                          ...prev,
                          howToUse: [
                            ...prev.howToUse,
                            { id: crypto.randomUUID(), order: prev.howToUse.length, text: '' },
                          ],
                        }))
                      }
                      className="text-xs text-[#D7C4A3] hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Step
                    </button>
                  </div>
                  {promptForm.howToUse.length > 0 && (
                    <div className="space-y-2">
                      {promptForm.howToUse
                        .slice()
                        .sort((a, b) => a.order - b.order)
                        .map((step, index) => (
                          <div
                            key={step.id}
                            className="flex items-start gap-2 p-3 rounded-xl bg-white/5 border border-white/10"
                          >
                            <span className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#D7C4A3]/20 border border-[#D7C4A3]/40 text-[#D7C4A3] text-[10px] flex items-center justify-center font-mono">
                              {index + 1}
                            </span>
                            <textarea
                              value={step.text}
                              onChange={(e) =>
                                setPromptForm((prev) => ({
                                  ...prev,
                                  howToUse: prev.howToUse.map((s) =>
                                    s.id === step.id ? { ...s, text: e.target.value } : s
                                  ),
                                }))
                              }
                              placeholder={`Step ${index + 1}...`}
                              rows={2}
                              className="flex-1 glass-input px-3 py-2 text-sm font-light text-white resize-none bg-transparent"
                            />
                            <div className="flex flex-col gap-1">
                              {index > 0 && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setPromptForm((prev) => {
                                      const steps = [...prev.howToUse];
                                      const idx = steps.findIndex((s) => s.id === step.id);
                                      if (idx > 0) {
                                        [steps[idx], steps[idx - 1]] = [
                                          { ...steps[idx], order: steps[idx - 1].order },
                                          { ...steps[idx - 1], order: steps[idx].order },
                                        ];
                                      }
                                      return { ...prev, howToUse: steps };
                                    })
                                  }
                                  className="p-1 rounded glass-button hover:bg-white/10 cursor-pointer"
                                  title="Move up"
                                >
                                  <ChevronUp className="w-3.5 h-3.5" />
                                </button>
                              )}
                              {index < promptForm.howToUse.length - 1 && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setPromptForm((prev) => {
                                      const steps = [...prev.howToUse];
                                      const idx = steps.findIndex((s) => s.id === step.id);
                                      if (idx < steps.length - 1) {
                                        [steps[idx], steps[idx + 1]] = [
                                          { ...steps[idx], order: steps[idx + 1].order },
                                          { ...steps[idx + 1], order: steps[idx].order },
                                        ];
                                      }
                                      return { ...prev, howToUse: steps };
                                    })
                                  }
                                  className="p-1 rounded glass-button hover:bg-white/10 cursor-pointer"
                                  title="Move down"
                                >
                                  <ChevronDown className="w-3.5 h-3.5" />
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() =>
                                  setPromptForm((prev) => ({
                                    ...prev,
                                    howToUse: prev.howToUse.filter((s) => s.id !== step.id),
                                  }))
                                }
                                className="p-1 rounded glass-button hover:bg-red-500/20 hover:text-red-400 cursor-pointer"
                                title="Delete step"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-button-primary text-xs font-medium uppercase tracking-wider cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    {promptEditingId ? 'Update Prompt' : 'Add Prompt'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPromptFormOpen(false)}
                    className="px-5 py-2.5 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {promptCats.length === 0 ? (
              <div className="p-10 text-center rounded-2xl bg-white/5 border border-white/10">
                <Layers className="w-8 h-8 text-[#D7C4A3] mx-auto mb-4" />
                <h3 className="font-serif text-xl font-light text-white mb-1">No prompt categories yet</h3>
                <p className="text-xs text-neutral-400 font-light">
                  Click "Add Category" to create your first prompt category, then add prompts inside it.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {promptCats.map((cat) => {
                  const isOpen = expandedCat === cat.id;
                  return (
                    <div key={cat.id} className="p-5 rounded-2xl bg-white/5 border border-white/10">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => setExpandedCat(isOpen ? null : cat.id)}
                          aria-expanded={isOpen}
                          className="flex items-center gap-3 min-w-0 flex-1 text-left cursor-pointer"
                        >
                          <div className="p-2.5 rounded-xl bg-white/10 border border-white/15 text-[#D7C4A3] shrink-0">
                            <Layers className="w-5 h-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-medium text-white truncate">{cat.title}</h3>
                            <p className="text-xs text-neutral-400 font-light">
                              {cat.prompts.length} prompt{cat.prompts.length === 1 ? '' : 's'} · click to {isOpen ? 'collapse' : 'expand'}
                            </p>
                          </div>
                          {isOpen ? (
                            <ChevronDown className="w-4 h-4 text-[#D7C4A3] shrink-0 transition-transform" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-neutral-400 shrink-0 transition-transform" />
                          )}
                        </button>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => openEditPromptCategory(cat)}
                            aria-label={`Edit ${cat.title}`}
                            className="p-2.5 rounded-full glass-button cursor-pointer"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePromptCategory(cat.id)}
                            aria-label={`Delete ${cat.title}`}
                            className="p-2.5 rounded-full glass-button cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </div>

                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 space-y-2">
                            {cat.prompts.map((prompt) => (
                              <div
                                key={prompt.id}
                                className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className="w-14 h-10 rounded-lg overflow-hidden border border-white/10 shrink-0">
                                    <img
                                      src={assetUrl(prompt.image)}
                                      alt={prompt.title}
                                      referrerPolicy="no-referrer"
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="min-w-0">
                                    <h4 className="text-sm font-light text-white truncate">{prompt.title}</h4>
                                    <p className="text-[10px] text-neutral-500 font-light truncate">
                                      {prompt.promptText.length} chars · hidden
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <button
                                    onClick={() => openEditPrompt(cat, prompt)}
                                    aria-label={`Edit ${prompt.title}`}
                                    className="p-2 rounded-lg glass-button cursor-pointer"
                                  >
                                    <Pencil className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeletePrompt(cat.id, prompt.id)}
                                    aria-label={`Delete ${prompt.title}`}
                                    className="p-2 rounded-lg glass-button cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                                  </button>
                                </div>
                              </div>
                            ))}
                            <button
                              onClick={() => openPromptForm(cat.id)}
                              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-neutral-300 border border-dashed border-white/20 hover:border-[#D7C4A3]/50 hover:text-[#D7C4A3] transition-colors"
                            >
                              <Plus size={14} /> Add Prompt
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs text-neutral-400 font-light">
                {promptCats.length} categor{promptCats.length === 1 ? 'y' : 'ies'} · Click "Save Prompts" to persist.
              </p>
            </div>
          </div>
        )}

        {tab === 'profile' && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <button
                onClick={() => openExpForm()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-button-primary text-xs font-medium uppercase tracking-wider cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Experience
              </button>
              <div className="flex items-center gap-2">
                {aboutSavedFlash && (
                  <span className="text-xs text-[#D7C4A3] font-light">Saved</span>
                )}
                <button
                  onClick={handleSaveAllAbout}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Profile
                </button>
                <button
                  onClick={handleResetAbout}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Profile
                </button>
              </div>
            </div>

            <GitHubSyncCard
              config={ghConfig}
              onConfigChange={setGhConfig}
              status={ghStatus}
              busy={ghBusy}
              onSaveConfig={handleSaveGhConfig}
              onPush={() => handlePushAboutToGitHub(true)}
              pushLabel="Push Profile to GitHub"
            />

            {/* Experience */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl font-light text-[#D7C4A3] flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Experience
                </h2>
                <button
                  onClick={() => openExpForm()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Experience
                </button>
              </div>

              {expFormOpen && (
                <form id="exp-form" onSubmit={handleSaveExp} className="mb-6 p-6 rounded-2xl bg-white/5 border border-[#D7C4A3]/30 space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif text-lg font-light text-[#D7C4A3]">
                      {expEditingIdx !== null ? 'Edit Experience' : 'Add Experience'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setExpFormOpen(false)}
                      aria-label="Close form"
                      className="p-2 rounded-full glass-button cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
                      Year *
                      <input
                        required
                        value={expForm.year}
                        onChange={(e) => setExpForm({ ...expForm, year: e.target.value })}
                        placeholder="2023 — Present"
                        className="glass-input px-4 py-3 text-sm font-light text-white"
                      />
                    </label>
                    <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
                      Role *
                      <input
                        required
                        value={expForm.role}
                        onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                        placeholder="Lead Developer"
                        className="glass-input px-4 py-3 text-sm font-light text-white"
                      />
                    </label>
                  </div>
                  <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
                    Company *
                    <input
                      required
                      value={expForm.company}
                      onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                      placeholder="Company name"
                      className="glass-input px-4 py-3 text-sm font-light text-white"
                    />
                  </label>
                  <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
                    Description
                    <textarea
                      rows={3}
                      value={expForm.description}
                      onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                      placeholder="What you did in this role..."
                      className="glass-input px-4 py-3 text-sm font-light text-white resize-none"
                    />
</label>
                <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-button-primary text-xs font-medium uppercase tracking-wider cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      {expEditingIdx !== null ? 'Update Experience' : 'Add Experience'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setExpFormOpen(false)}
                      className="px-5 py-2.5 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-3">
                {about.experiences.map((exp, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-sm font-medium text-white">{exp.role}</h3>
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#D7C4A3]/20 border border-[#D7C4A3]/40 text-[#D7C4A3] font-mono">
                          {exp.year}
                        </span>
                      </div>
                      <p className="text-xs text-[#D7C4A3] font-light mb-1">{exp.company}</p>
                      <p className="text-xs text-neutral-300 font-light leading-relaxed">{exp.description}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => openExpForm(i)}
                        aria-label="Edit experience"
                        className="p-2 rounded-lg glass-button cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteExp(i)}
                        aria-label="Delete experience"
                        className="p-2 rounded-lg glass-button cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      </button>
                    </div>
                  </div>
                ))}
                {about.experiences.length === 0 && (
                  <p className="text-xs text-neutral-400 font-light">No experience added yet.</p>
                )}
              </div>
            </div>

            {/* Certifications */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl font-light text-[#D7C4A3] flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Certifications
                </h2>
                <button
                  onClick={() => openCertForm()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Certification
                </button>
              </div>

              {certFormOpen && (
                <form id="cert-form" onSubmit={handleSaveCert} className="mb-6 p-6 rounded-2xl bg-white/5 border border-[#D7C4A3]/30 space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif text-lg font-light text-[#D7C4A3]">
                      {certEditingIdx !== null ? 'Edit Certification' : 'Add Certification'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setCertFormOpen(false)}
                      aria-label="Close form"
                      className="p-2 rounded-full glass-button cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
                      Name *
                      <input
                        required
                        value={certForm.name}
                        onChange={(e) => setCertForm({ ...certForm, name: e.target.value })}
                        placeholder="Certification name"
                        className="glass-input px-4 py-3 text-sm font-light text-white"
                      />
                    </label>
                    <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
                      Issuer *
                      <input
                        required
                        value={certForm.issuer}
                        onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                        placeholder="Issuing organization"
                        className="glass-input px-4 py-3 text-sm font-light text-white"
                      />
                    </label>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
                      Year
                      <input
                        value={certForm.year}
                        onChange={(e) => setCertForm({ ...certForm, year: e.target.value })}
                        placeholder="2024"
                        className="glass-input px-4 py-3 text-sm font-light text-white"
                      />
                    </label>
                    <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
                      Credential ID (optional)
                      <input
                        value={certForm.credentialId ?? ''}
                        onChange={(e) => setCertForm({ ...certForm, credentialId: e.target.value })}
                        placeholder="CERT-12345"
                        className="glass-input px-4 py-3 text-sm font-light text-white"
                      />
                    </label>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-button-primary text-xs font-medium uppercase tracking-wider cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      {certEditingIdx !== null ? 'Update Certification' : 'Add Certification'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCertFormOpen(false)}
                      className="px-5 py-2.5 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-3">
                {about.certifications.map((cert, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {cert.year && (
                          <span className="text-[10px] font-mono text-[#D7C4A3]">{cert.year}</span>
                        )}
                        {cert.credentialId && (
                          <span className="text-[10px] font-mono text-neutral-400">{cert.credentialId}</span>
                        )}
                      </div>
                      <h3 className="text-sm font-medium text-white">{cert.name}</h3>
                      <p className="text-xs text-neutral-300 font-light">{cert.issuer}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => openCertForm(i)}
                        aria-label="Edit certification"
                        className="p-2 rounded-lg glass-button cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCert(i)}
                        aria-label="Delete certification"
                        className="p-2 rounded-lg glass-button cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      </button>
                    </div>
                  </div>
                ))}
                {about.certifications.length === 0 && (
                  <p className="text-xs text-neutral-400 font-light">No certifications added yet.</p>
                )}
              </div>
            </div>

            {/* Languages */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl font-light text-[#D7C4A3] flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Languages
                </h2>
                <button
                  onClick={() => openLangForm()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Language
                </button>
              </div>

              {langFormOpen && (
                <form id="lang-form" onSubmit={handleSaveLang} className="mb-6 p-6 rounded-2xl bg-white/5 border border-[#D7C4A3]/30 space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif text-lg font-light text-[#D7C4A3]">
                      {langEditingIdx !== null ? 'Edit Language' : 'Add Language'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setLangFormOpen(false)}
                      aria-label="Close form"
                      className="p-2 rounded-full glass-button cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
                      Language *
                      <input
                        required
                        value={langForm.language}
                        onChange={(e) => setLangForm({ ...langForm, language: e.target.value })}
                        placeholder="English"
                        className="glass-input px-4 py-3 text-sm font-light text-white"
                      />
                    </label>
                    <label className="flex flex-col space-y-1.5 text-xs text-neutral-300">
                      Level *
                      <input
                        required
                        value={langForm.level}
                        onChange={(e) => setLangForm({ ...langForm, level: e.target.value })}
                        placeholder="Native"
                        className="glass-input px-4 py-3 text-sm font-light text-white"
                      />
                    </label>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-button-primary text-xs font-medium uppercase tracking-wider cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      {langEditingIdx !== null ? 'Update Language' : 'Add Language'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setLangFormOpen(false)}
                      className="px-5 py-2.5 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-3">
                {about.languages.map((lang, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-medium text-white">{lang.language}</h3>
                      <p className="text-xs text-[#D7C4A3] font-light">{lang.level}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => openLangForm(i)}
                        aria-label="Edit language"
                        className="p-2 rounded-lg glass-button cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteLang(i)}
                        aria-label="Delete language"
                        className="p-2 rounded-lg glass-button cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      </button>
                    </div>
                  </div>
                ))}
                {about.languages.length === 0 && (
                  <p className="text-xs text-neutral-400 font-light">No languages added yet.</p>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs text-neutral-400 font-light">
                Experience, certifications, and languages · Click "Save Profile" to persist.
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
};

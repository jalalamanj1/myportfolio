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
import { useLang } from '../contexts/LanguageContext';
import { t } from '../i18n';

const ADMIN_EMAIL = 'thebossadmin@jalalamanj.online';
const ADMIN_PASSWORD = 'Ja1a1Amanj#OG@1';
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
  const { lang } = useLang();
  const [isAuthed, setIsAuthed] = useState<boolean>(
    () => sessionStorage.getItem(AUTH_KEY) === '1'
  );
  const [email, setEmail] = useState('');
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
    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthed(true);
      setLoginError('');
      sessionStorage.setItem(AUTH_KEY, '1');
    } else {
      setLoginError(t('admin.wrongCredentials', lang));
    }
  };

  const handleLogout = () => {
    setIsAuthed(false);
    sessionStorage.removeItem(AUTH_KEY);
    setEmail('');
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
      setGhStatus(t('gh.saveFailedPrompts', lang));
    }
    if (ghConfig.token) {
      void handlePushPromptsToGitHub(false);
    }
  };

  const handlePushProductsToGitHub = async (showErrors = true, data?: Product[]) => {
    if (!ghConfig.token) {
      if (showErrors) setGhStatus(t('gh.tokenFirst', lang));
      return;
    }
    setGhBusy(true);
    setGhStatus(t('gh.pushApps', lang));
    try {
      await pushProductsToGitHub(ghConfig.token, ghConfig.repo, data ?? products);
      setGhStatus(t('gh.pushed', lang));
    } catch (err) {
      setGhStatus(err instanceof Error ? err.message : t('gh.failed', lang));
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
    setGhStatus(t('gh.pushServices', lang));
    try {
      await pushServicesToGitHub(ghConfig.token, ghConfig.repo, data ?? services);
      setGhStatus(t('gh.pushed', lang));
    } catch (err) {
      setGhStatus(err instanceof Error ? err.message : t('gh.failed', lang));
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
    setGhStatus(t('gh.pushPrompts', lang));
    try {
      await pushPromptsToGitHub(ghConfig.token, ghConfig.repo, data ?? promptCats);
      setGhStatus(t('gh.pushed', lang));
    } catch (err) {
      setGhStatus(err instanceof Error ? err.message : t('gh.failed', lang));
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
    setGhStatus(t('gh.pushAbout', lang));
    try {
      await pushAboutToGitHub(ghConfig.token, ghConfig.repo, data ?? about);
      setGhStatus(t('gh.pushed', lang));
    } catch (err) {
      setGhStatus(err instanceof Error ? err.message : t('gh.failed', lang));
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
    setGhStatus(t('gh.connectionSaved', lang));
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
          className="glass-panel p-8 sm:p-12 w-full max-w-md text-ink"
        >
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-accent-soft border border-accent/40 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-accent" />
            </div>
            <h1 className="font-serif text-3xl font-light tracking-wide">{t('admin.access', lang)}</h1>
            <p className="text-xs text-ink font-light mt-2">
              {t('admin.access.desc', lang)}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('admin.emailPlaceholder', lang)}
              autoFocus
              required
              className="glass-input w-full px-4 py-3.5 text-sm font-light text-ink placeholder-neutral-400"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('admin.password', lang)}
              required
              className="glass-input w-full px-4 py-3.5 text-sm font-light text-ink placeholder-neutral-400"
            />
            {loginError && (
              <p className="text-xs text-red-600 font-light">{loginError}</p>
            )}
            <button
              type="submit"
              className="w-full glass-button-primary py-3.5 rounded-xl text-xs font-medium uppercase tracking-[0.2em] cursor-pointer"
            >
              {t('admin.unlock', lang)}
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
        className="glass-panel p-6 sm:p-10 text-ink"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-light tracking-wide">
              {t('admin.control', lang)}
            </h1>
            <p className="text-xs text-ink font-light mt-1">
              {t('admin.control.desc', lang)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {savedFlash && (
              <span className="text-xs text-accent font-light">{t('admin.saved', lang)}</span>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              {t('admin.logout', lang)}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={() => setTab('apps')}
            className={`px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
              tab === 'apps'
                ? 'bg-accent text-white shadow-lg font-semibold'
                : 'glass-button text-ink hover:text-ink'
            }`}
          >
            {t('admin.tab.apps', lang)}
          </button>
          <button
            onClick={() => setTab('services')}
            className={`px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
              tab === 'services'
                ? 'bg-accent text-white shadow-lg font-semibold'
                : 'glass-button text-ink hover:text-ink'
            }`}
          >
            {t('admin.tab.services', lang)}
          </button>
          <button
            onClick={() => setTab('prompts')}
            className={`px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
              tab === 'prompts'
                ? 'bg-accent text-white shadow-lg font-semibold'
                : 'glass-button text-ink hover:text-ink'
            }`}
          >
            {t('admin.tab.prompts', lang)}
          </button>
          <button
            onClick={() => setTab('profile')}
            className={`px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
              tab === 'profile'
                ? 'bg-accent text-white shadow-lg font-semibold'
                : 'glass-button text-ink hover:text-ink'
            }`}
          >
            {t('admin.tab.profile', lang)}
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
            {t('admin.addApp', lang)}
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveAll}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              {t('admin.saveChanges', lang)}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {t('admin.resetDefaults', lang)}
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
          pushLabel={t('gh.pushAppsLabel', lang)}
        />

        {isFormOpen && (
          <form id="product-form" onSubmit={handleSaveForm} onPaste={handleImagePaste} className="mb-8 p-6 rounded-2xl bg-accent-soft border border-accent/30 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-serif text-xl font-light text-accent">
                {t(editingId ? 'admin.editApp' : 'admin.addApp', lang)}
              </h2>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                aria-label={t('admin.closeForm', lang)}
                className="p-2 rounded-full glass-button cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col space-y-1.5 text-xs text-ink">
                {t('admin.title', lang)} *
                <input
                  required
                  value={form.title}
                  onChange={(e) => handleFormField('title', e.target.value)}
                  className="glass-input px-4 py-3 text-sm font-light text-ink"
                />
              </label>
              <label className="flex flex-col space-y-1.5 text-xs text-ink">
                {t('admin.category', lang)} *
                <input
                  required
                  value={form.category}
                  onChange={(e) => handleFormField('category', e.target.value)}
                  className="glass-input px-4 py-3 text-sm font-light text-ink"
                />
              </label>
              <label className="flex flex-col space-y-1.5 text-xs text-ink">
                {t('admin.year', lang)}
                <input
                  value={form.year}
                  onChange={(e) => handleFormField('year', e.target.value)}
                  className="glass-input px-4 py-3 text-sm font-light text-ink"
                />
              </label>
              <label className="flex flex-col space-y-1.5 text-xs text-ink">
                {t('admin.client', lang)}
                <input
                  value={form.client}
                  onChange={(e) => handleFormField('client', e.target.value)}
                  className="glass-input px-4 py-3 text-sm font-light text-ink"
                />
              </label>
            </div>

            <label className="flex flex-col space-y-1.5 text-xs text-ink">
              {t('admin.shortDesc', lang)} *
              <input
                required
                value={form.shortDescription}
                onChange={(e) => handleFormField('shortDescription', e.target.value)}
                className="glass-input px-4 py-3 text-sm font-light text-ink"
              />
            </label>

            <label className="flex flex-col space-y-1.5 text-xs text-ink">
              {t('admin.fullDesc', lang)}
              <textarea
                rows={3}
                value={form.fullDescription}
                onChange={(e) => handleFormField('fullDescription', e.target.value)}
                    className="glass-input px-4 py-3 text-sm font-light text-ink resize-none"
                  />
                </label>

              <div className="flex flex-col space-y-1.5 text-xs text-ink">
                {t('admin.image', lang)}
                <div className="flex flex-wrap gap-2 items-center">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 p-2 rounded-xl border border-line text-[10px] uppercase tracking-wider text-ink hover:text-ink hover:border-accent/60 transition-all cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    {t('admin.uploadImage', lang)}
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
                        ? 'border-accent text-accent'
                        : 'border-line text-ink-muted hover:border-line'
                    }`}
                  >
                    {t('admin.customUrl', lang)}
                  </button>
                  <span className="text-[10px] text-ink-muted font-light">
                    {t('admin.pasteImage', lang)}
                  </span>
                </div>
                {form.image.startsWith('data:') ? (
                  <div className="flex items-center gap-3 mt-1">
                    <img
                      src={assetUrl(form.image)}
                      alt={t('admin.uploadedPreview', lang)}
                      className="w-16 h-12 object-cover rounded-lg border border-accent/40"
                    />
                    <span className="text-[10px] text-ink-muted font-light">
                      {t('admin.uploadedPreview', lang)}
                    </span>
                  </div>
                ) : (
                  form.image !== '' && (
                    <input
                      value={form.image}
                      onChange={(e) => handleFormField('image', e.target.value)}
                      placeholder={t('admin.pasteUrl', lang)}
                      className="glass-input px-4 py-3 text-sm font-light text-ink"
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
                    placeholder={t('admin.label', lang)}
                    className="glass-input px-3 py-2.5 text-sm font-light text-ink flex-1"
                  />
                  <input
                    value={row.value}
                    onChange={(e) => updateTagRow(i, 'value', e.target.value)}
                    placeholder={t('admin.value', lang)}
                    className="glass-input px-3 py-2.5 text-sm font-light text-ink flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => removeTagRow(i)}
                    aria-label={t('admin.removeTag', lang)}
                    className="p-2 rounded-xl text-ink-muted hover:text-red-600 hover:bg-accent-soft transition-colors shrink-0"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addTagRow}
                className="flex items-center gap-1.5 self-start px-3 py-2 rounded-xl text-xs text-ink border border-line hover:border-accent hover:text-accent transition-colors"
              >
                <Plus size={14} /> {t('admin.addTag', lang)}
              </button>
            </div>

            <label className="flex flex-col space-y-1.5 text-xs text-ink">
              {t('admin.downloadUrl', lang)}
              <input
                value={form.downloadUrl ?? ''}
                onChange={(e) => handleFormField('downloadUrl', e.target.value)}
                className="glass-input px-4 py-3 text-sm font-light text-ink"
              />
            </label>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-button-primary text-xs font-medium uppercase tracking-wider cursor-pointer"
              >
                <Save className="w-4 h-4" />
                {t(editingId ? 'admin.updateApp' : 'admin.addAppShort', lang)}
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
              className="p-4 rounded-2xl bg-accent-soft border border-line hover:border-accent/30 transition-all flex items-center gap-4"
            >
              <div className="w-20 h-14 rounded-xl overflow-hidden border border-line shrink-0">
                <img
                  src={assetUrl(product.image)}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-ink truncate">{product.title}</h3>
                <p className="text-xs text-ink-muted font-light truncate">
                  {product.category} · {product.year} · {product.client || t('admin.noClient', lang)}
                </p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => openEditForm(product)}
                  aria-label={t('admin.editX', lang, { name: product.title })}
                  className="p-2.5 rounded-full glass-button cursor-pointer"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  aria-label={t('admin.deleteX', lang, { name: product.title })}
                  className="p-2.5 rounded-full glass-button cursor-pointer"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-line flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-ink-muted font-light">
            {t('admin.appsNote', lang, { count: String(products.length) })}
          </p>
          <a
            href="/"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            {t('admin.viewSite', lang)}
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
                {t('admin.addCategory', lang)}
              </button>
              <div className="flex items-center gap-2">
                {servicesSavedFlash && (
                  <span className="text-xs text-accent font-light">{t('admin.saved', lang)}</span>
                )}
                <button
                  onClick={handleSaveAllServices}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  {t('admin.saveServices', lang)}
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
          pushLabel={t('gh.pushServicesLabel', lang)}
        />

            {catFormOpen && (
              <form id="service-category-form" onSubmit={handleSaveCategory} className="mb-8 p-6 rounded-2xl bg-accent-soft border border-accent/30 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-serif text-xl font-light text-accent">
                    {t(catEditingId ? 'admin.editCategory' : 'admin.addCategory', lang)}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setCatFormOpen(false)}
                    aria-label={t('admin.closeForm', lang)}
                    className="p-2 rounded-full glass-button cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <label className="flex flex-col space-y-1.5 text-xs text-ink">
                  {t('admin.title', lang)} *
                  <input
                    required
                    value={catForm.title}
                    onChange={(e) => setCatForm({ ...catForm, title: e.target.value })}
                    className="glass-input px-4 py-3 text-sm font-light text-ink"
                  />
                </label>
                <label className="flex flex-col space-y-1.5 text-xs text-ink">
                  {t('admin.subtitle', lang)}
                  <input
                    value={catForm.subtitle}
                    onChange={(e) => setCatForm({ ...catForm, subtitle: e.target.value })}
                    className="glass-input px-4 py-3 text-sm font-light text-ink"
                  />
                </label>
                <label className="flex flex-col space-y-1.5 text-xs text-ink">
                  {t('admin.description', lang)}
                  <textarea
                    rows={3}
                    value={catForm.description}
                    onChange={(e) => setCatForm({ ...catForm, description: e.target.value })}
                    className="glass-input px-4 py-3 text-sm font-light text-ink resize-none"
                  />
                </label>
                <label className="flex flex-col space-y-1.5 text-xs text-ink">
                  {t('admin.icon', lang)}
                  <select
                    value={catForm.iconName}
                    onChange={(e) => setCatForm({ ...catForm, iconName: e.target.value })}
                    className="glass-input px-4 py-3 text-sm font-light text-ink bg-paper"
                  >
                    {ICON_OPTIONS.map((name) => (
                      <option key={name} value={name} className="bg-paper text-ink">
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
                    {t(catEditingId ? 'admin.updateCategory' : 'admin.addCategory', lang)}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCatFormOpen(false)}
                    className="px-5 py-2.5 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
                  >
                    {t('admin.cancel', lang)}
                  </button>
                </div>
              </form>
            )}

            {svcFormOpen && (
              <form id="service-item-form" onSubmit={handleSaveService} className="mb-8 p-6 rounded-2xl bg-accent-soft border border-accent/30 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-serif text-xl font-light text-accent">
                    {t(svcEditingId ? 'admin.editService' : 'admin.addService', lang)}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setSvcFormOpen(false)}
                    aria-label={t('admin.closeForm', lang)}
                    className="p-2 rounded-full glass-button cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <label className="flex flex-col space-y-1.5 text-xs text-ink">
                  {t('admin.title', lang)} *
                  <input
                    required
                    value={svcForm.title}
                    onChange={(e) => setSvcForm({ ...svcForm, title: e.target.value })}
                    className="glass-input px-4 py-3 text-sm font-light text-ink"
                  />
                </label>
                <label className="flex flex-col space-y-1.5 text-xs text-ink">
                  {t('admin.description', lang)} *
                  <textarea
                    required
                    rows={3}
                    value={svcForm.description}
                    onChange={(e) => setSvcForm({ ...svcForm, description: e.target.value })}
                    className="glass-input px-4 py-3 text-sm font-light text-ink resize-none"
                  />
                </label>
                <label className="flex flex-col space-y-1.5 text-xs text-ink">
                  {t('admin.icon', lang)}
                  <select
                    value={svcForm.iconName}
                    onChange={(e) => setSvcForm({ ...svcForm, iconName: e.target.value })}
                    className="glass-input px-4 py-3 text-sm font-light text-ink bg-paper"
                  >
                    {ICON_OPTIONS.map((name) => (
                      <option key={name} value={name} className="bg-paper text-ink">
                        {name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col space-y-1.5 text-xs text-ink">
                  {t('admin.deliverables', lang)}
                  <textarea
                    rows={3}
                    value={(svcForm.deliverables ?? []).join('\n')}
                    onChange={(e) =>
                      setSvcForm({ ...svcForm, deliverables: e.target.value.split('\n') })
                    }
                    className="glass-input px-4 py-3 text-sm font-light text-ink resize-none"
                  />
                </label>
                <label className="flex flex-col space-y-1.5 text-xs text-ink">
                  {t('admin.buttonAction', lang)}
                  <select
                    value={svcForm.actionType ?? 'request'}
                    onChange={(e) =>
                      setSvcForm({
                        ...svcForm,
                        actionType: e.target.value as ServiceItem['actionType'],
                      })
                    }
                    className="glass-input px-4 py-3 text-sm font-light text-ink bg-paper"
                  >
                    <option value="request" className="bg-paper text-ink">{t('admin.actionRequest', lang)}</option>
                    <option value="link" className="bg-paper text-ink">{t('admin.actionLink', lang)}</option>
                    <option value="download" className="bg-paper text-ink">{t('admin.actionDownload', lang)}</option>
                  </select>
                </label>
                {(svcForm.actionType === 'link' || svcForm.actionType === 'download') && (
                  <label className="flex flex-col space-y-1.5 text-xs text-ink">
                    {t('admin.linkUrl', lang)} *
                    <input
                      required
                      value={svcForm.actionUrl ?? ''}
                      onChange={(e) => setSvcForm({ ...svcForm, actionUrl: e.target.value })}
                      placeholder={svcForm.actionType === 'download' ? 'https://example.com/file.zip' : 'https://example.com'}
                      className="glass-input px-4 py-3 text-sm font-light text-ink"
                    />
                  </label>
                )}
                <label className="flex flex-col space-y-1.5 text-xs text-ink">
                  {t('admin.buttonLabel', lang)}
                  <input
                    value={svcForm.actionLabel ?? ''}
                    onChange={(e) => setSvcForm({ ...svcForm, actionLabel: e.target.value })}
                    placeholder={t('admin.buttonLabelPlaceholder', lang)}
                    className="glass-input px-4 py-3 text-sm font-light text-ink"
                  />
                </label>
                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-button-primary text-xs font-medium uppercase tracking-wider cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    {t(svcEditingId ? 'admin.updateService' : 'admin.addService', lang)}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSvcFormOpen(false)}
                    className="px-5 py-2.5 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
                  >
                    {t('admin.cancel', lang)}
                  </button>
                </div>
              </form>
            )}

            {services.length === 0 ? (
              <div className="p-10 text-center rounded-2xl bg-accent-soft border border-line">
                <Layers className="w-8 h-8 text-accent mx-auto mb-4" />
                <h3 className="font-serif text-xl font-light text-ink mb-1">{t('admin.noCategories', lang)}</h3>
                <p className="text-xs text-ink-muted font-light">
                  {t('admin.noCategories.desc', lang)}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {services.map((cat) => (
                  <div key={cat.id} className="p-5 rounded-2xl bg-accent-soft border border-line">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2.5 rounded-xl bg-accent-soft border border-line text-accent shrink-0">
                          <Layers className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm font-medium text-ink truncate">{cat.title}</h3>
                          <p className="text-xs text-ink-muted font-light">
                            {t('admin.servicesCount', lang, { count: String(cat.services.length) })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => openEditCategory(cat)}
                          aria-label={t('admin.editX', lang, { name: cat.title })}
                          className="p-2.5 rounded-full glass-button cursor-pointer"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(cat.id)}
                          aria-label={t('admin.deleteX', lang, { name: cat.title })}
                          className="p-2.5 rounded-full glass-button cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      {cat.services.map((svc) => (
                        <div
                          key={svc.id}
                          className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-accent-soft border border-line"
                        >
                          <div className="min-w-0">
                            <h4 className="text-sm font-light text-ink truncate">{svc.title}</h4>
                            <p className="text-xs text-ink-muted font-light truncate">{svc.description}</p>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => openEditService(cat, svc)}
                              aria-label={t('admin.editX', lang, { name: svc.title })}
                              className="p-2 rounded-lg glass-button cursor-pointer"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteService(cat.id, svc.id)}
                              aria-label={t('admin.deleteX', lang, { name: svc.title })}
                              className="p-2 rounded-lg glass-button cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-red-600" />
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => openServiceForm(cat.id)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-ink border border-dashed border-line hover:border-accent hover:text-accent transition-colors"
                      >
                        <Plus size={14} /> {t('admin.addService', lang)}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-line">
              <p className="text-xs text-ink-muted font-light">
                {t('admin.servicesNote', lang, { count: String(services.length) })}
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
                {t('admin.addCategory', lang)}
              </button>
              <div className="flex items-center gap-2">
                {promptsSavedFlash && (
                  <span className="text-xs text-accent font-light">{t('admin.saved', lang)}</span>
                )}
                <button
                  onClick={handleSaveAllPrompts}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  {t('admin.savePrompts', lang)}
                </button>
                <button
                  onClick={handleDownloadPrompts}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  {t('admin.downloadPromptsJson', lang)}
                </button>
                <button
                  onClick={handleResetPrompts}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  {t('admin.resetPrompts', lang)}
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
          pushLabel={t('gh.pushPromptsLabel', lang)}
        />

            {promptCatFormOpen && (
              <form id="prompt-category-form" onSubmit={handleSavePromptCategory} className="mb-8 p-6 rounded-2xl bg-accent-soft border border-accent/30 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-serif text-xl font-light text-accent">
                    {t(promptCatEditingId ? 'admin.editCategory' : 'admin.addCategory', lang)}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setPromptCatFormOpen(false)}
                    aria-label={t('admin.closeForm', lang)}
                    className="p-2 rounded-full glass-button cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <label className="flex flex-col space-y-1.5 text-xs text-ink">
                  {t('admin.title', lang)} *
                  <input
                    required
                    value={promptCatForm.title}
                    onChange={(e) => setPromptCatForm({ ...promptCatForm, title: e.target.value })}
                    className="glass-input px-4 py-3 text-sm font-light text-ink"
                  />
                </label>
                <label className="flex flex-col space-y-1.5 text-xs text-ink">
                  {t('admin.titleAr', lang)}
                  <input
                    value={promptCatForm.titleAr ?? ''}
                    onChange={(e) => setPromptCatForm({ ...promptCatForm, titleAr: e.target.value })}
                    className="glass-input px-4 py-3 text-sm font-light text-ink"
                  />
                </label>
                <label className="flex flex-col space-y-1.5 text-xs text-ink">
                  {t('admin.icon', lang)}
                  <select
                    value={promptCatForm.iconName}
                    onChange={(e) => setPromptCatForm({ ...promptCatForm, iconName: e.target.value })}
                    className="glass-input px-4 py-3 text-sm font-light text-ink bg-paper"
                  >
                    {ICON_OPTIONS.map((name) => (
                      <option key={name} value={name} className="bg-paper text-ink">
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
                    {t(promptCatEditingId ? 'admin.updateCategory' : 'admin.addCategory', lang)}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPromptCatFormOpen(false)}
                    className="px-5 py-2.5 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
                  >
                    {t('admin.cancel', lang)}
                  </button>
                </div>
              </form>
            )}

            {promptFormOpen && (
              <form id="prompt-form" onSubmit={handleSavePrompt} onPaste={handlePromptImagePaste} className="mb-8 p-6 rounded-2xl bg-accent-soft border border-accent/30 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-serif text-xl font-light text-accent">
                    {t(promptEditingId ? 'admin.editPrompt' : 'admin.addPrompt', lang)}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setPromptFormOpen(false)}
                    aria-label={t('admin.closeForm', lang)}
                    className="p-2 rounded-full glass-button cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <label className="flex flex-col space-y-1.5 text-xs text-ink">
                  {t('admin.title', lang)} *
                  <input
                    required
                    value={promptForm.title}
                    onChange={(e) => setPromptForm({ ...promptForm, title: e.target.value })}
                    className="glass-input px-4 py-3 text-sm font-light text-ink"
                  />
                </label>
                <label className="flex flex-col space-y-1.5 text-xs text-ink">
                  {t('admin.titleAr', lang)}
                  <input
                    value={promptForm.titleAr ?? ''}
                    onChange={(e) => setPromptForm({ ...promptForm, titleAr: e.target.value })}
                    className="glass-input px-4 py-3 text-sm font-light text-ink"
                  />
                </label>
                <div className="flex flex-col space-y-1.5 text-xs text-ink">
                  {t('admin.image', lang)}
                  <div className="flex flex-wrap gap-2 items-center">
                    <button
                      type="button"
                      onClick={() => promptFileInputRef.current?.click()}
                      className="flex items-center gap-1.5 p-2 rounded-xl border border-line text-[10px] uppercase tracking-wider text-ink hover:text-ink hover:border-accent/60 transition-all cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      {t('admin.uploadImage', lang)}
                    </button>
                    <input
                      ref={promptFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePromptImageUpload}
                      className="hidden"
                    />
                    <span className="text-[10px] text-ink-muted font-light">
                      {t('admin.pasteImage', lang)}
                    </span>
                    {promptForm.image !== '' && (
                      <img
                        src={assetUrl(promptForm.image)}
                        alt={t('admin.preview', lang)}
                        className="w-16 h-12 object-cover rounded-lg border border-accent/40"
                      />
                    )}
                  </div>
                  {promptForm.image !== '' && !promptForm.image.startsWith('data:') && (
                    <input
                      value={promptForm.image}
                      onChange={(e) => setPromptForm({ ...promptForm, image: e.target.value })}
                      placeholder={t('admin.pasteUrl', lang)}
                      className="glass-input px-4 py-3 text-sm font-light text-ink"
                    />
                  )}
                </div>
                <label className="flex flex-col space-y-1.5 text-xs text-ink">
                  {t('admin.promptText', lang)}
                  <textarea
                    required
                    rows={5}
                    value={promptForm.promptText}
                    onChange={(e) => setPromptForm({ ...promptForm, promptText: e.target.value })}
                    placeholder={t('admin.promptTextPlaceholder', lang)}
                    className="glass-input px-4 py-3 text-sm font-light text-ink resize-none"
                  />
                </label>

                {/* How to Use Steps */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-ink font-light">
                      {t('admin.howToUse', lang)}
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
                      className="text-xs text-accent hover:text-ink transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      {t('admin.addStep', lang)}
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
                            className="flex items-start gap-2 p-3 rounded-xl bg-accent-soft border border-line"
                          >
                            <span className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-accent-soft border border-accent/40 text-accent text-[10px] flex items-center justify-center font-mono">
                              {index + 1}
                            </span>
                            <div className="flex flex-col gap-2 flex-1 min-w-0">
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
                                placeholder={t('admin.stepPlaceholder', lang, { n: String(index + 1) })}
                                rows={2}
                                className="glass-input px-3 py-2 text-sm font-light text-ink resize-none bg-transparent"
                              />
                              <textarea
                                value={step.textAr ?? ''}
                                onChange={(e) =>
                                  setPromptForm((prev) => ({
                                    ...prev,
                                    howToUse: prev.howToUse.map((s) =>
                                      s.id === step.id ? { ...s, textAr: e.target.value } : s
                                    ),
                                  }))
                                }
                                placeholder={t('admin.stepTextAr', lang)}
                                rows={2}
                                className="glass-input px-3 py-2 text-sm font-light text-ink resize-none bg-transparent"
                              />
                            </div>
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
                                  className="p-1 rounded glass-button hover:bg-accent-soft cursor-pointer"
                                  title={t('admin.moveUp', lang)}
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
                                  className="p-1 rounded glass-button hover:bg-accent-soft cursor-pointer"
                                  title={t('admin.moveDown', lang)}
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
                                className="p-1 rounded glass-button hover:bg-red-500/20 hover:text-red-600 cursor-pointer"
                                title={t('admin.deleteStep', lang)}
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
                    {t(promptEditingId ? 'admin.updatePrompt' : 'admin.addPrompt', lang)}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPromptFormOpen(false)}
                    className="px-5 py-2.5 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
                  >
                    {t('admin.cancel', lang)}
                  </button>
                </div>
              </form>
            )}

            {promptCats.length === 0 ? (
              <div className="p-10 text-center rounded-2xl bg-accent-soft border border-line">
                <Layers className="w-8 h-8 text-accent mx-auto mb-4" />
                <h3 className="font-serif text-xl font-light text-ink mb-1">{t('admin.noPromptCats', lang)}</h3>
                <p className="text-xs text-ink-muted font-light">
                  {t('admin.noPromptCats.desc', lang)}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {promptCats.map((cat) => {
                  const isOpen = expandedCat === cat.id;
                  return (
                    <div key={cat.id} className="p-5 rounded-2xl bg-accent-soft border border-line">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => setExpandedCat(isOpen ? null : cat.id)}
                          aria-expanded={isOpen}
                          className="flex items-center gap-3 min-w-0 flex-1 text-left cursor-pointer"
                        >
                          <div className="p-2.5 rounded-xl bg-accent-soft border border-line text-accent shrink-0">
                            <Layers className="w-5 h-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-medium text-ink truncate">{cat.title}</h3>
                            <p className="text-xs text-ink-muted font-light">
                              {t('admin.promptMeta', lang, {
                                count: String(cat.prompts.length),
                                action: t(isOpen ? 'admin.collapse' : 'admin.expand', lang),
                              })}
                            </p>
                          </div>
                          {isOpen ? (
                            <ChevronDown className="w-4 h-4 text-accent shrink-0 transition-transform" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-ink-muted shrink-0 transition-transform" />
                          )}
                        </button>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => openEditPromptCategory(cat)}
                            aria-label={t('admin.editX', lang, { name: cat.title })}
                            className="p-2.5 rounded-full glass-button cursor-pointer"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePromptCategory(cat.id)}
                            aria-label={t('admin.deleteX', lang, { name: cat.title })}
                            className="p-2.5 rounded-full glass-button cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
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
                                className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-accent-soft border border-line"
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className="w-14 h-10 rounded-lg overflow-hidden border border-line shrink-0">
                                    <img
                                      src={assetUrl(prompt.image)}
                                      alt={prompt.title}
                                      referrerPolicy="no-referrer"
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="min-w-0">
                                    <h4 className="text-sm font-light text-ink truncate">{prompt.title}</h4>
                                    <p className="text-[10px] text-ink-muted font-light truncate">
                                      {t('admin.hiddenChars', lang, { count: String(prompt.promptText.length) })}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <button
                                    onClick={() => openEditPrompt(cat, prompt)}
                                    aria-label={t('admin.editX', lang, { name: prompt.title })}
                                    className="p-2 rounded-lg glass-button cursor-pointer"
                                  >
                                    <Pencil className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeletePrompt(cat.id, prompt.id)}
                                    aria-label={t('admin.deleteX', lang, { name: prompt.title })}
                                    className="p-2 rounded-lg glass-button cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5 text-red-600" />
                                  </button>
                                </div>
                              </div>
                            ))}
                            <button
                              onClick={() => openPromptForm(cat.id)}
                              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-ink border border-dashed border-line hover:border-accent hover:text-accent transition-colors"
                            >
                              <Plus size={14} /> {t('admin.addPrompt', lang)}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-line">
              <p className="text-xs text-ink-muted font-light">
                {t('admin.promptsNote', lang, { count: String(promptCats.length) })}
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
                {t('admin.addExperience', lang)}
              </button>
              <div className="flex items-center gap-2">
                {aboutSavedFlash && (
                  <span className="text-xs text-accent font-light">{t('admin.saved', lang)}</span>
                )}
                <button
                  onClick={handleSaveAllAbout}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  {t('admin.saveProfile', lang)}
                </button>
                <button
                  onClick={handleResetAbout}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  {t('admin.resetProfile', lang)}
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
              pushLabel={t('gh.pushProfileLabel', lang)}
            />

            {/* Experience */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl font-light text-accent flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  {t('admin.experience', lang)}
                </h2>
                <button
                  onClick={() => openExpForm()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  {t('admin.addExperience', lang)}
                </button>
              </div>

              {expFormOpen && (
                <form id="exp-form" onSubmit={handleSaveExp} className="mb-6 p-6 rounded-2xl bg-accent-soft border border-accent/30 space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif text-lg font-light text-accent">
                      {t(expEditingIdx !== null ? 'admin.editExperience' : 'admin.addExperience', lang)}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setExpFormOpen(false)}
                      aria-label={t('admin.closeForm', lang)}
                      className="p-2 rounded-full glass-button cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex flex-col space-y-1.5 text-xs text-ink">
                      {t('admin.year', lang)} *
                      <input
                        required
                        value={expForm.year}
                        onChange={(e) => setExpForm({ ...expForm, year: e.target.value })}
                        placeholder={t('admin.yearPlaceholder', lang)}
                        className="glass-input px-4 py-3 text-sm font-light text-ink"
                      />
                    </label>
                    <label className="flex flex-col space-y-1.5 text-xs text-ink">
                      {t('admin.role', lang)} *
                      <input
                        required
                        value={expForm.role}
                        onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                        placeholder={t('admin.rolePlaceholder', lang)}
                        className="glass-input px-4 py-3 text-sm font-light text-ink"
                      />
                    </label>
                  </div>
                  <label className="flex flex-col space-y-1.5 text-xs text-ink">
                    {t('admin.company', lang)} *
                    <input
                      required
                      value={expForm.company}
                      onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                      placeholder={t('admin.companyPlaceholder', lang)}
                      className="glass-input px-4 py-3 text-sm font-light text-ink"
                    />
                  </label>
                  <label className="flex flex-col space-y-1.5 text-xs text-ink">
                    {t('admin.description', lang)}
                    <textarea
                      rows={3}
                      value={expForm.description}
                      onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                      placeholder={t('admin.expDescPlaceholder', lang)}
                      className="glass-input px-4 py-3 text-sm font-light text-ink resize-none"
                    />
                  </label>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-button-primary text-xs font-medium uppercase tracking-wider cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      {t(expEditingIdx !== null ? 'admin.updateExperience' : 'admin.addExperience', lang)}
                    </button>
                    <button
                      type="button"
                      onClick={() => setExpFormOpen(false)}
                      className="px-5 py-2.5 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
                    >
                      {t('admin.cancel', lang)}
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-3">
                {about.experiences.map((exp, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-accent-soft border border-line flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-sm font-medium text-ink">{exp.role}</h3>
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-accent-soft border border-accent/40 text-accent font-mono">
                          {exp.year}
                        </span>
                      </div>
                      <p className="text-xs text-accent font-light mb-1">{exp.company}</p>
                      <p className="text-xs text-ink font-light leading-relaxed">{exp.description}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => openExpForm(i)}
                        aria-label={t('admin.editExperience', lang)}
                        className="p-2 rounded-lg glass-button cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteExp(i)}
                        aria-label={t('admin.deleteExperience', lang)}
                        className="p-2 rounded-lg glass-button cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
                {about.experiences.length === 0 && (
                  <p className="text-xs text-ink-muted font-light">{t('admin.noExperience', lang)}</p>
                )}
              </div>
            </div>

            {/* Certifications */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl font-light text-accent flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  {t('admin.certifications', lang)}
                </h2>
                <button
                  onClick={() => openCertForm()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  {t('admin.addCertification', lang)}
                </button>
              </div>

              {certFormOpen && (
                <form id="cert-form" onSubmit={handleSaveCert} className="mb-6 p-6 rounded-2xl bg-accent-soft border border-accent/30 space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif text-lg font-light text-accent">
                      {t(certEditingIdx !== null ? 'admin.editCertification' : 'admin.addCertification', lang)}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setCertFormOpen(false)}
                      aria-label={t('admin.closeForm', lang)}
                      className="p-2 rounded-full glass-button cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex flex-col space-y-1.5 text-xs text-ink">
                      {t('admin.name', lang)} *
                      <input
                        required
                        value={certForm.name}
                        onChange={(e) => setCertForm({ ...certForm, name: e.target.value })}
                        placeholder={t('admin.certNamePlaceholder', lang)}
                        className="glass-input px-4 py-3 text-sm font-light text-ink"
                      />
                    </label>
                    <label className="flex flex-col space-y-1.5 text-xs text-ink">
                      {t('admin.issuer', lang)} *
                      <input
                        required
                        value={certForm.issuer}
                        onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                        placeholder={t('admin.issuerPlaceholder', lang)}
                        className="glass-input px-4 py-3 text-sm font-light text-ink"
                      />
                    </label>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex flex-col space-y-1.5 text-xs text-ink">
                      {t('admin.year', lang)}
                      <input
                        value={certForm.year}
                        onChange={(e) => setCertForm({ ...certForm, year: e.target.value })}
                        placeholder={t('admin.certYearPlaceholder', lang)}
                        className="glass-input px-4 py-3 text-sm font-light text-ink"
                      />
                    </label>
                    <label className="flex flex-col space-y-1.5 text-xs text-ink">
                      {t('admin.credentialId', lang)}
                      <input
                        value={certForm.credentialId ?? ''}
                        onChange={(e) => setCertForm({ ...certForm, credentialId: e.target.value })}
                        placeholder={t('admin.credentialIdPlaceholder', lang)}
                        className="glass-input px-4 py-3 text-sm font-light text-ink"
                      />
                    </label>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-button-primary text-xs font-medium uppercase tracking-wider cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      {t(certEditingIdx !== null ? 'admin.updateCertification' : 'admin.addCertification', lang)}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCertFormOpen(false)}
                      className="px-5 py-2.5 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
                    >
                      {t('admin.cancel', lang)}
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-3">
                {about.certifications.map((cert, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-accent-soft border border-line flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {cert.year && (
                          <span className="text-[10px] font-mono text-accent">{cert.year}</span>
                        )}
                        {cert.credentialId && (
                          <span className="text-[10px] font-mono text-ink-muted">{cert.credentialId}</span>
                        )}
                      </div>
                      <h3 className="text-sm font-medium text-ink">{cert.name}</h3>
                      <p className="text-xs text-ink font-light">{cert.issuer}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => openCertForm(i)}
                        aria-label={t('admin.editCertification', lang)}
                        className="p-2 rounded-lg glass-button cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCert(i)}
                        aria-label={t('admin.deleteCertification', lang)}
                        className="p-2 rounded-lg glass-button cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
                {about.certifications.length === 0 && (
                  <p className="text-xs text-ink-muted font-light">{t('admin.noCertifications', lang)}</p>
                )}
              </div>
            </div>

            {/* Languages */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl font-light text-accent flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  {t('admin.languages', lang)}
                </h2>
                <button
                  onClick={() => openLangForm()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  {t('admin.addLanguage', lang)}
                </button>
              </div>

              {langFormOpen && (
                <form id="lang-form" onSubmit={handleSaveLang} className="mb-6 p-6 rounded-2xl bg-accent-soft border border-accent/30 space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif text-lg font-light text-accent">
                      {t(langEditingIdx !== null ? 'admin.editLanguage' : 'admin.addLanguage', lang)}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setLangFormOpen(false)}
                      aria-label={t('admin.closeForm', lang)}
                      className="p-2 rounded-full glass-button cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex flex-col space-y-1.5 text-xs text-ink">
                      {t('admin.languageLabel', lang)} *
                      <input
                        required
                        value={langForm.language}
                        onChange={(e) => setLangForm({ ...langForm, language: e.target.value })}
                        placeholder={t('admin.languagePlaceholder', lang)}
                        className="glass-input px-4 py-3 text-sm font-light text-ink"
                      />
                    </label>
                    <label className="flex flex-col space-y-1.5 text-xs text-ink">
                      {t('admin.levelLabel', lang)} *
                      <input
                        required
                        value={langForm.level}
                        onChange={(e) => setLangForm({ ...langForm, level: e.target.value })}
                        placeholder={t('admin.levelPlaceholder', lang)}
                        className="glass-input px-4 py-3 text-sm font-light text-ink"
                      />
                    </label>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-button-primary text-xs font-medium uppercase tracking-wider cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      {t(langEditingIdx !== null ? 'admin.updateLanguage' : 'admin.addLanguage', lang)}
                    </button>
                    <button
                      type="button"
                      onClick={() => setLangFormOpen(false)}
                      className="px-5 py-2.5 rounded-full glass-button text-xs uppercase tracking-wider cursor-pointer"
                    >
                      {t('admin.cancel', lang)}
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-3">
                {about.languages.map((languageItem, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-accent-soft border border-line flex flex-wrap items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-medium text-ink">{languageItem.language}</h3>
                      <p className="text-xs text-accent font-light">{languageItem.level}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => openLangForm(i)}
                        aria-label={t('admin.editLanguage', lang)}
                        className="p-2 rounded-lg glass-button cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteLang(i)}
                        aria-label={t('admin.deleteLanguage', lang)}
                        className="p-2 rounded-lg glass-button cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
                {about.languages.length === 0 && (
                  <p className="text-xs text-ink-muted font-light">{t('admin.noLanguages', lang)}</p>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-line">
              <p className="text-xs text-ink-muted font-light">
                {t('admin.profileNote', lang)}
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
};

"use client";

import { useState } from "react";
import { useAdmin } from "@/data/AdminContext";

export default function CmsAdminPage() {
  const { cmsContent, addCmsItem, updateCmsItem } = useAdmin();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: "Homepage Content",
    description: "",
    content: "",
    status: "Published",
    updatedBy: "Admin",
  });
  const [formError, setFormError] = useState("");
  const [successToast, setSuccessToast] = useState("");

  const categories = [
    "Homepage Content",
    "Banners and Promotions",
    "About Us",
    "Contact Information",
    "FAQs",
    "Privacy Policy",
    "Terms and Conditions",
    "Success Stories and Testimonials",
  ];

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      category: "Homepage Content",
      description: "",
      content: "",
      status: "Published",
      updatedBy: "Admin",
    });
    setFormError("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description || "",
      content: item.content,
      status: item.status,
      updatedBy: item.updatedBy || "Admin",
    });
    setFormError("");
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      setFormError("Title and Main Content are required.");
      return;
    }

    if (editingItem) {
      updateCmsItem(editingItem.id, {
        title: formData.title.trim(),
        category: formData.category,
        description: formData.description.trim(),
        content: formData.content.trim(),
        status: formData.status,
        updatedBy: "Aura SuperAdmin",
      });
      setSuccessToast(`Content item "${formData.title}" updated successfully!`);
    } else {
      const newItem = {
        id: `CMS-00${cmsContent.length + 1}`,
        title: formData.title.trim(),
        category: formData.category,
        description: formData.description.trim(),
        content: formData.content.trim(),
        status: formData.status,
        lastUpdated: new Date().toISOString().replace("T", " ").slice(0, 16),
        updatedBy: "Aura SuperAdmin",
      };
      addCmsItem(newItem);
      setSuccessToast(`New content "${newItem.title}" added to ${newItem.category}!`);
    }

    setIsModalOpen(false);
    setTimeout(() => setSuccessToast(""), 3500);
  };

  const totalCount = cmsContent.length;
  const publishedCount = cmsContent.filter((c) => c.status === "Published").length;
  const draftCount = cmsContent.filter((c) => c.status === "Draft").length;
  const lastUpdatedRecord = cmsContent[0]?.lastUpdated || "2026-10-20";

  const filtered = cmsContent.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCat = categoryFilter === "all" || c.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;

    return matchesSearch && matchesCat && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {successToast && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center gap-2 shadow-sm animate-fadeIn">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span>{successToast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-xs">
        <div>
          <h1 className="font-headline text-2xl font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">article</span>
            Content Management System (CMS)
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Maintain public website editorial copy, banners, policies, FAQs, and testimonials.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-primary hover:bg-primary-light text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all shrink-0"
        >
          <span className="material-symbols-outlined text-base">post_add</span>
          <span>Add Content</span>
        </button>
      </div>

      {/* 4 Overview Count Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 shadow-xs">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-outline">Total Content Items</p>
          <h3 className="font-headline text-2xl font-bold text-primary mt-1">{totalCount}</h3>
          <p className="text-[11px] text-outline mt-0.5">Across 8 categories</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 shadow-xs">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-outline">Published Live</p>
          <h3 className="font-headline text-2xl font-bold text-emerald-700 mt-1">{publishedCount}</h3>
          <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Live on website</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 shadow-xs">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-outline">Draft Items</p>
          <h3 className="font-headline text-2xl font-bold text-amber-700 mt-1">{draftCount}</h3>
          <p className="text-[11px] text-amber-600 font-semibold mt-0.5">In staging review</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 shadow-xs">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-outline">Last Updated</p>
          <h3 className="font-headline text-base sm:text-lg font-bold text-on-surface mt-1 truncate">{lastUpdatedRecord}</h3>
          <p className="text-[11px] text-outline mt-0.5">Sync timestamp</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-outline-variant/30 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-sm">search</span>
          <input
            type="text"
            placeholder="Search content by title, body, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface-container-low pl-9 pr-4 py-2 rounded-xl text-xs border border-outline-variant/30 focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-surface-container-low px-3 py-2 rounded-xl text-xs border border-outline-variant/30 focus:outline-none font-medium max-w-[220px]"
          >
            <option value="all">All Content Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-surface-container-low px-3 py-2 rounded-xl text-xs border border-outline-variant/30 focus:outline-none font-medium"
          >
            <option value="all">All Publication Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Content Management Table */}
      <div className="bg-white rounded-3xl border border-outline-variant/30 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50 text-outline text-[11px] font-bold uppercase tracking-wider border-b border-outline-variant/20">
                <th className="py-3.5 px-6">ID</th>
                <th className="py-3.5 px-6">Content Title & Pitch</th>
                <th className="py-3.5 px-6">Section Category</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Last Updated</th>
                <th className="py-3.5 px-6">Updated By</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 text-xs">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="py-4 px-6 font-mono text-[11px] text-outline font-bold">
                    {item.id}
                  </td>
                  <td className="py-4 px-6 max-w-sm">
                    <p className="font-bold text-on-surface truncate">{item.title}</p>
                    <p className="text-[11px] text-outline truncate">{item.description || item.content.slice(0, 60)}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-block whitespace-nowrap px-3 py-1 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === "Published"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-on-surface-variant whitespace-nowrap">
                    {item.lastUpdated}
                  </td>
                  <td className="py-4 px-6 text-on-surface-variant font-medium whitespace-nowrap">
                    {item.updatedBy || "Aura Admin"}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="px-3 py-1 bg-surface-container hover:bg-primary hover:text-white text-primary text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">edit</span>
                      <span>Edit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Content Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-outline-variant/30 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-2xl">
                  {editingItem ? "edit_note" : "post_add"}
                </span>
                <h3 className="font-bold text-base">
                  {editingItem ? `Edit Content: ${editingItem.id}` : "Create New Content"}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold">
                {formError}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-on-surface mb-1">Content Headline / Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Where Meaningful Connections Meet Modern Intelligence"
                  className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-outline-variant/30 text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-on-surface mb-1">Content Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-outline-variant/30 text-xs focus:outline-none font-medium"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1">Publication State</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-outline-variant/30 text-xs focus:outline-none font-medium"
                  >
                    <option value="Published">Published (Live)</option>
                    <option value="Draft">Draft (Staging)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1">Short Description / Sub-pitch</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief summary or metadata description..."
                  className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-outline-variant/30 text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1">Main Editorial Content / Body *</label>
                <textarea
                  rows={5}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Enter content body text..."
                  className="w-full bg-surface-container-low p-3 rounded-xl border border-outline-variant/30 text-xs focus:outline-none focus:border-primary leading-relaxed"
                />
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, status: "Draft" });
                  }}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${
                    formData.status === "Draft" ? "bg-amber-100 text-amber-800 border-amber-300" : "border-outline-variant/30 text-outline"
                  }`}
                >
                  Mark as Draft
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-on-surface-variant hover:bg-surface-container rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded-xl shadow-sm"
                  >
                    {editingItem ? "Save & Publish Changes" : "Create Content Item"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useAdmin } from "@/data/AdminContext";

export default function EmployeesAdminPage() {
  const { employees, addEmployee, toggleEmployeeStatus } = useAdmin();

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [inspectingEmployee, setInspectingEmployee] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Verification Officer",
    status: "Active",
    permissionsSummary: "KYC credentials, passport review & profile approvals",
  });
  const [formError, setFormError] = useState("");
  const [successToast, setSuccessToast] = useState("");

  const rolePermissionsMap = {
    "Super Admin": "Full administrative access & audit log authority",
    "Admin": "Member management, subscription management & operational reporting",
    "Verification Officer": "KYC credentials, passport review & profile approvals",
    "Membership Manager": "Tier subscriptions, VIP concierge billing & upgrades",
    "Content Manager": "Homepage banners, CMS policy pages & success stories",
    "Support Staff": "Member tickets, chat monitoring & concierge liaison",
  };

  const handleRoleChange = (role) => {
    setFormData({
      ...formData,
      role,
      permissionsSummary: rolePermissionsMap[role] || "Standard operational permissions",
    });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setFormError("Full name and corporate email address are required.");
      return;
    }

    const newEmp = {
      id: `EMP-00${employees.length + 1}`,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || "+44 20 7946 0000",
      role: formData.role,
      permissionsSummary: formData.permissionsSummary,
      dateAdded: new Date().toISOString().slice(0, 10),
      status: formData.status,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3y5qLdsohC6r_XeHXn_V9hAjXg0WCz4oab26h--A25rmHCZjlGU9gqZvHEz9Uh6u00DmztJH8H-aKl_LKa7PQvl4Tuq8zRFMYMaX5V0MqU-nDUm0Gd-HpmEnggBSI9dLlKYpSVeWZZKrAN0W0r2k7dtEwAa8tXKPrzd4wN3TMAhBaGrwwKjpxlu9hRsVkq85xeg5AYh_mZzp_pAqQP8F83YHM5tc7bfFnetGdK3NiwMYP3ea_G9n-rIhZ0hEEo64nG5weTBsU_Lw",
    };

    addEmployee(newEmp);
    setIsAddModalOpen(false);
    setFormError("");
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "Verification Officer",
      status: "Active",
      permissionsSummary: "KYC credentials, passport review & profile approvals",
    });
    setSuccessToast(`Employee record for ${newEmp.name} created successfully!`);
    setTimeout(() => setSuccessToast(""), 3500);
  };

  const totalCount = employees.length;
  const activeCount = employees.filter((e) => e.status === "Active").length;
  const invitedCount = employees.filter((e) => e.status === "Invited").length;

  const filtered = employees.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || e.role === roleFilter;
    const matchesStatus = statusFilter === "all" || e.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
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
            <span className="material-symbols-outlined text-primary">badge</span>
            Employees & Administrators Management
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Manage corporate staff accounts, roles, access levels, and security authorization matrix.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-primary hover:bg-primary-light text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
        >
          <span className="material-symbols-outlined text-base">person_add</span>
          <span>Add Employee</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 shadow-xs">
          <p className="text-xs font-bold text-outline uppercase tracking-wider">Total Staff Members</p>
          <h3 className="font-headline text-2xl font-bold text-primary mt-1">{totalCount}</h3>
          <p className="text-[11px] text-outline mt-0.5">Assigned to Aura administration</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 shadow-xs">
          <p className="text-xs font-bold text-outline uppercase tracking-wider">Active Employees</p>
          <h3 className="font-headline text-2xl font-bold text-emerald-700 mt-1">{activeCount}</h3>
          <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Authorized for portal access</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/30 shadow-xs">
          <p className="text-xs font-bold text-outline uppercase tracking-wider">Pending Invitations</p>
          <h3 className="font-headline text-2xl font-bold text-amber-700 mt-1">{invitedCount}</h3>
          <p className="text-[11px] text-amber-600 font-semibold mt-0.5">Activation link sent</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-outline-variant/30 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-sm">search</span>
          <input
            type="text"
            placeholder="Search by ID, name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface-container-low pl-9 pr-4 py-2 rounded-xl text-xs border border-outline-variant/30 focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-surface-container-low px-3 py-2 rounded-xl text-xs border border-outline-variant/30 focus:outline-none font-medium"
          >
            <option value="all">All Employee Roles</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Admin">Admin</option>
            <option value="Verification Officer">Verification Officer</option>
            <option value="Membership Manager">Membership Manager</option>
            <option value="Content Manager">Content Manager</option>
            <option value="Support Staff">Support Staff</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-surface-container-low px-3 py-2 rounded-xl text-xs border border-outline-variant/30 focus:outline-none font-medium"
          >
            <option value="all">All Account Statuses</option>
            <option value="Active">Active</option>
            <option value="Invited">Invited</option>
            <option value="Deactivated">Deactivated</option>
          </select>
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-3xl border border-outline-variant/30 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50 text-outline text-[11px] font-bold uppercase tracking-wider border-b border-outline-variant/20">
                <th className="py-3.5 px-6">Employee ID</th>
                <th className="py-3.5 px-6">Employee Name</th>
                <th className="py-3.5 px-6">Role</th>
                <th className="py-3.5 px-6">Assigned Permissions</th>
                <th className="py-3.5 px-6">Date Added</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 text-xs">
              {filtered.map((emp) => (
                <tr key={emp.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="py-4 px-6 font-mono text-[11px] text-outline font-bold">
                    {emp.id}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={emp.avatar}
                        alt={emp.name}
                        className="w-10 h-10 rounded-full object-cover border border-outline-variant/30 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-on-surface truncate">{emp.name}</p>
                        <p className="text-[11px] text-outline truncate">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-block whitespace-nowrap px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                      {emp.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-on-surface-variant max-w-xs truncate">
                    {emp.permissionsSummary}
                  </td>
                  <td className="py-4 px-6 text-on-surface-variant whitespace-nowrap">
                    {emp.dateAdded}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        emp.status === "Active"
                          ? "bg-emerald-100 text-emerald-800"
                          : emp.status === "Invited"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setInspectingEmployee(emp)}
                        className="px-2.5 py-1 rounded-lg text-primary bg-primary/10 hover:bg-primary hover:text-white transition-colors font-bold text-xs"
                      >
                        Inspect
                      </button>
                      <button
                        onClick={() => toggleEmployeeStatus(emp.id)}
                        className={`px-2 py-1 rounded-lg text-xs font-semibold border ${
                          emp.status === "Active"
                            ? "border-rose-300 text-rose-600 hover:bg-rose-50"
                            : "border-emerald-300 text-emerald-600 hover:bg-emerald-50"
                        }`}
                      >
                        {emp.status === "Active" ? "Deactivate" : "Reactivate"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee Modal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-outline-variant/30 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-2xl">person_add</span>
                <h3 className="font-bold text-base">Add New Employee</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
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

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-on-surface mb-1">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Charlotte Montgomery"
                  className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-outline-variant/30 text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-on-surface mb-1">Corporate Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@auramatrimony.com"
                    className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-outline-variant/30 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block font-bold text-on-surface mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+44 20 7946 0000"
                    className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-outline-variant/30 text-xs focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-on-surface mb-1">Assigned Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => handleRoleChange(e.target.value)}
                    className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-outline-variant/30 text-xs focus:outline-none font-medium"
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Admin">Admin</option>
                    <option value="Verification Officer">Verification Officer</option>
                    <option value="Membership Manager">Membership Manager</option>
                    <option value="Content Manager">Content Manager</option>
                    <option value="Support Staff">Support Staff</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-on-surface mb-1">Initial Account Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-outline-variant/30 text-xs focus:outline-none font-medium"
                  >
                    <option value="Active">Active (Ready)</option>
                    <option value="Invited">Send Email Invite</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1">Permissions Scope</label>
                <input
                  type="text"
                  value={formData.permissionsSummary}
                  onChange={(e) => setFormData({ ...formData, permissionsSummary: e.target.value })}
                  className="w-full bg-surface-container-low px-3 py-2 rounded-xl border border-outline-variant/30 text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-on-surface-variant hover:bg-surface-container rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded-xl shadow-sm"
                >
                  Create Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inspect Employee Modal */}
      {inspectingEmployee && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setInspectingEmployee(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-outline-variant/30 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <div className="flex items-center gap-3">
                <img
                  src={inspectingEmployee.avatar}
                  alt={inspectingEmployee.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <h3 className="font-bold text-base text-primary">{inspectingEmployee.name}</h3>
                  <p className="text-[11px] text-outline font-mono">{inspectingEmployee.id}</p>
                </div>
              </div>
              <button
                onClick={() => setInspectingEmployee(null)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-surface-container-low rounded-xl">
                <p className="text-[10px] uppercase font-bold text-outline">Designated Role</p>
                <p className="font-bold text-primary text-sm mt-0.5">{inspectingEmployee.role}</p>
              </div>
              <div className="p-3 bg-surface-container-low rounded-xl">
                <p className="text-[10px] uppercase font-bold text-outline">Email Address</p>
                <p className="font-bold text-on-surface mt-0.5">{inspectingEmployee.email}</p>
              </div>
              <div className="p-3 bg-surface-container-low rounded-xl">
                <p className="text-[10px] uppercase font-bold text-outline">Contact Phone</p>
                <p className="font-bold text-on-surface mt-0.5">{inspectingEmployee.phone}</p>
              </div>
              <div className="p-3 bg-surface-container-low rounded-xl">
                <p className="text-[10px] uppercase font-bold text-outline">Permissions Scope</p>
                <p className="text-on-surface-variant mt-0.5">{inspectingEmployee.permissionsSummary}</p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-outline-variant/20">
              <button
                onClick={() => setInspectingEmployee(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-container"
              >
                Close
              </button>
              <button
                onClick={() => {
                  toggleEmployeeStatus(inspectingEmployee.id);
                  setInspectingEmployee((prev) => ({
                    ...prev,
                    status: prev.status === "Active" ? "Deactivated" : "Active",
                  }));
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold text-white transition-colors ${
                  inspectingEmployee.status === "Active" ? "bg-rose-600 hover:bg-rose-700" : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                {inspectingEmployee.status === "Active" ? "Deactivate Account" : "Reactivate Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

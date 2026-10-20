"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  INITIAL_MEMBERS,
  INITIAL_VERIFICATIONS,
  MEMBERSHIP_PLANS,
  INITIAL_EMPLOYEES,
  INITIAL_CMS_CONTENT,
} from "./adminData";

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [members, setMembers] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("aura_admin_members");
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* fallback */ }
      }
    }
    return INITIAL_MEMBERS;
  });

  const [verifications, setVerifications] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("aura_admin_verifications");
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* fallback */ }
      }
    }
    return INITIAL_VERIFICATIONS;
  });

  const [plans, setPlans] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("aura_admin_plans");
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* fallback */ }
      }
    }
    return MEMBERSHIP_PLANS;
  });

  const [employees, setEmployees] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("aura_admin_employees");
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* fallback */ }
      }
    }
    return INITIAL_EMPLOYEES;
  });

  const [cmsContent, setCmsContent] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("aura_admin_cms");
      if (saved) {
        try { return JSON.parse(saved); } catch (e) { /* fallback */ }
      }
    }
    return INITIAL_CMS_CONTENT;
  });

  // Persist demo state during navigation
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("aura_admin_members", JSON.stringify(members));
      localStorage.setItem("aura_admin_verifications", JSON.stringify(verifications));
      localStorage.setItem("aura_admin_plans", JSON.stringify(plans));
      localStorage.setItem("aura_admin_employees", JSON.stringify(employees));
      localStorage.setItem("aura_admin_cms", JSON.stringify(cmsContent));
    }
  }, [members, verifications, plans, employees, cmsContent]);

  // Synchronized verification approval: updates verification record AND member record consistently
  const approveVerification = (verificationId, memberId) => {
    setVerifications((prev) =>
      prev.map((v) =>
        v.id === verificationId
          ? { ...v, status: "Approved", rejectionReason: "" }
          : v
      )
    );
    setMembers((prev) =>
      prev.map((m) =>
        m.id === memberId
          ? { ...m, verificationStatus: "Verified", status: "Active", rejectionReason: "" }
          : m
      )
    );
  };

  // Synchronized verification rejection: records mandatory reason and sets status consistently
  const rejectVerification = (verificationId, memberId, reason) => {
    setVerifications((prev) =>
      prev.map((v) =>
        v.id === verificationId
          ? { ...v, status: "Rejected", rejectionReason: reason }
          : v
      )
    );
    setMembers((prev) =>
      prev.map((m) =>
        m.id === memberId
          ? { ...m, verificationStatus: "Flagged", status: "Suspended", rejectionReason: reason }
          : m
      )
    );
  };

  // Member status toggle
  const toggleMemberStatus = (memberId) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === memberId) {
          const next = m.status === "Active" ? "Suspended" : "Active";
          return { ...m, status: next };
        }
        return m;
      })
    );
  };

  // Plan editing
  const updateMembershipPlan = (planId, updatedFields) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === planId ? { ...p, ...updatedFields } : p))
    );
  };

  // Employee actions
  const addEmployee = (newEmployee) => {
    setEmployees((prev) => [newEmployee, ...prev]);
  };

  const toggleEmployeeStatus = (empId) => {
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id === empId) {
          const next = emp.status === "Active" ? "Deactivated" : "Active";
          return { ...emp, status: next };
        }
        return emp;
      })
    );
  };

  // CMS actions
  const addCmsItem = (newItem) => {
    setCmsContent((prev) => [newItem, ...prev]);
  };

  const updateCmsItem = (itemId, updatedFields) => {
    setCmsContent((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, ...updatedFields, lastUpdated: new Date().toISOString().replace("T", " ").slice(0, 16) } : item))
    );
  };

  return (
    <AdminContext.Provider
      value={{
        members,
        verifications,
        plans,
        employees,
        cmsContent,
        approveVerification,
        rejectVerification,
        toggleMemberStatus,
        updateMembershipPlan,
        addEmployee,
        toggleEmployeeStatus,
        addCmsItem,
        updateCmsItem,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}

"use client";

import { useState } from "react";
import { INITIAL_PAYMENTS } from "@/data/adminData";

export default function PaymentsAdminPage() {
  const [payments] = useState(INITIAL_PAYMENTS);
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = payments.filter(
    (p) => statusFilter === "all" || p.status === statusFilter
  );

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-outline-variant/30 shadow-xs">
        <div>
          <h1 className="font-headline text-2xl font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">payments</span>
            Payments & Subscription Billing
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Track membership transactions, automated renewals, invoice settlements, and processing states.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-surface-container-low px-3 py-2 rounded-xl text-xs border border-outline-variant/30 focus:outline-none font-medium"
          >
            <option value="all">All Payment Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Processing">Processing</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-3xl border border-outline-variant/30 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center">
          <div>
            <h3 className="font-headline text-base font-bold text-primary">Recent Transaction Invoices</h3>
            <p className="text-xs text-on-surface-variant">Live gateway feed (Stripe / Amex / Wire)</p>
          </div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-200">
            $148,250 MTD
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50 text-outline text-[11px] font-bold uppercase tracking-wider border-b border-outline-variant/20">
                <th className="py-3.5 px-6">Transaction ID</th>
                <th className="py-3.5 px-6">Member</th>
                <th className="py-3.5 px-6">Tier Description</th>
                <th className="py-3.5 px-6">Amount</th>
                <th className="py-3.5 px-6">Method</th>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 text-xs">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-outline text-[11px]">
                    {item.id}
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-bold text-on-surface">{item.member}</p>
                    <p className="text-[11px] text-outline">{item.email}</p>
                  </td>
                  <td className="py-4 px-6 text-on-surface-variant font-medium">
                    {item.plan}
                  </td>
                  <td className="py-4 px-6 font-bold text-primary">
                    {item.amount}
                  </td>
                  <td className="py-4 px-6 text-on-surface-variant">
                    {item.method}
                  </td>
                  <td className="py-4 px-6 text-on-surface-variant">
                    {item.date}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === "Completed"
                          ? "bg-emerald-100 text-emerald-800"
                          : item.status === "Processing"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


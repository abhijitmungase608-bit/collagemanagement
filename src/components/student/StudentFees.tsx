import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../Modal';
import { CreditCard, CheckCircle2, Clock, Lock } from 'lucide-react';
import type { FeeItem } from '../../types';

export const StudentFees: React.FC = () => {
  const { currentUser, students, fees, payFeeItem } = useApp();
  const [selectedFee, setSelectedFee] = useState<FeeItem | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const activeStudent =
    students.find((s) => s.id === currentUser?.id || s.rollNo === currentUser?.referenceId) ||
    students[0];

  const myFees = fees.filter((f) => f.studentId === activeStudent.id);

  const totalPaid = myFees.filter((f) => f.status === 'paid').reduce((sum, f) => sum + f.amount, 0);
  const totalPending = myFees.filter((f) => f.status !== 'paid').reduce((sum, f) => sum + f.amount, 0);

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFee) return;
    payFeeItem(selectedFee.id, paymentMethod);
    setSelectedFee(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-emerald-400" /> My Fee Portal
        </h2>
        <p className="text-xs text-slate-400">View semester tuition dues, paid receipts, and clear fee balances</p>
      </div>

      {/* Dues summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Fees Paid</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="text-3xl font-black text-emerald-400 font-mono">
            ${totalPaid.toLocaleString()}
          </h3>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Pending Balance</span>
            <Clock className="w-5 h-5 text-amber-400" />
          </div>
          <h3 className="text-3xl font-black text-amber-400 font-mono">
            ${totalPending.toLocaleString()}
          </h3>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-slate-800 font-bold text-white text-sm">
          Fee Invoices & Receipts
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/60 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Fee Title</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Due Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Txn ID / Date</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {myFees.map((fee) => (
                <tr key={fee.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">{fee.title}</td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-400">${fee.amount}</td>
                  <td className="py-3 px-4 font-mono text-slate-400">{fee.dueDate}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        fee.status === 'paid'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : fee.status === 'pending'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {fee.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                    {fee.status === 'paid' ? `${fee.transactionId || 'TXN-8812'} (${fee.paidDate})` : '-'}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {fee.status !== 'paid' ? (
                      <button
                        onClick={() => setSelectedFee(fee)}
                        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold text-xs shadow-md transition-all"
                      >
                        Pay Online
                      </button>
                    ) : (
                      <span className="text-[11px] text-emerald-400 font-semibold flex items-center justify-end gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Paid
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Online Payment Modal Simulation */}
      {selectedFee && (
        <Modal isOpen={!!selectedFee} onClose={() => setSelectedFee(null)} title="Secure Online Fee Checkout">
          <form onSubmit={handlePayNow} className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <p className="text-slate-400 text-[11px]">Invoice Title</p>
              <h4 className="text-base font-bold text-white">{selectedFee.title}</h4>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="text-slate-400">Total Payable:</span>
                <span className="text-xl font-extrabold text-emerald-400 font-mono">${selectedFee.amount}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-slate-300 font-semibold">Select Payment Gateway</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Credit Card">Credit Card (Visa / Mastercard)</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Net Banking">Net Banking</option>
                <option value="UPI / Wallet">UPI / Digital Wallet</option>
              </select>
            </div>

            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] flex items-center gap-2">
              <Lock className="w-4 h-4 shrink-0 text-indigo-400" />
              <span>256-Bit SSL Encrypted Instant Payment Processing</span>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedFee(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-600/30"
              >
                Pay ${selectedFee.amount} Now
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

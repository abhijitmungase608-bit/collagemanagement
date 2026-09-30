import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../Modal';
import { CreditCard, Plus, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export const AdminFees: React.FC = () => {
  const { fees, students, recordNewFee, payFeeItem } = useApp();
  const [filterStatus, setFilterStatus] = useState('all');
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    studentId: students[0]?.id || '',
    title: 'Semester Fee 2026',
    amount: 2500,
    dueDate: '2026-10-31',
  });

  const filteredFees = fees.filter((f) => {
    if (filterStatus === 'all') return true;
    return f.status === filterStatus;
  });

  const totalCollected = fees.filter((f) => f.status === 'paid').reduce((sum, f) => sum + f.amount, 0);
  const totalPending = fees.filter((f) => f.status === 'pending').reduce((sum, f) => sum + f.amount, 0);
  const totalOverdue = fees.filter((f) => f.status === 'overdue').reduce((sum, f) => sum + f.amount, 0);

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const studentObj = students.find((s) => s.id === formData.studentId);
    if (!studentObj) return;

    recordNewFee({
      studentId: studentObj.id,
      studentName: studentObj.name,
      rollNo: studentObj.rollNo,
      title: formData.title,
      amount: formData.amount,
      dueDate: formData.dueDate,
    });
    setIsInvoiceModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-emerald-400" /> Fee & Revenue Management
          </h2>
          <p className="text-xs text-slate-400">Track tuition payments, pending dues, and issue fee invoices</p>
        </div>

        <button
          onClick={() => setIsInvoiceModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/25 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Issue Fee Invoice
        </button>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Fees Collected</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <h3 className="text-2xl font-black text-emerald-400 font-mono">
            ${totalCollected.toLocaleString()}
          </h3>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Pending Fees</span>
            <Clock className="w-5 h-5 text-amber-400" />
          </div>
          <h3 className="text-2xl font-black text-amber-400 font-mono">
            ${totalPending.toLocaleString()}
          </h3>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Overdue Amount</span>
            <AlertTriangle className="w-5 h-5 text-rose-400" />
          </div>
          <h3 className="text-2xl font-black text-rose-400 font-mono">
            ${totalOverdue.toLocaleString()}
          </h3>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        {['all', 'paid', 'pending', 'overdue'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
              filterStatus === status
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {status} ({status === 'all' ? fees.length : fees.filter((f) => f.status === status).length})
          </button>
        ))}
      </div>

      {/* Invoices Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/60 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4">Roll No</th>
                <th className="py-3.5 px-4">Fee Title</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Due Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredFees.map((fee) => (
                <tr key={fee.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">{fee.studentName}</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">{fee.rollNo}</td>
                  <td className="py-3 px-4">{fee.title}</td>
                  <td className="py-3 px-4 font-mono font-bold text-white">${fee.amount}</td>
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
                  <td className="py-3 px-4 text-right">
                    {fee.status !== 'paid' && (
                      <button
                        onClick={() => payFeeItem(fee.id, 'Admin Cash Collection')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition-colors"
                      >
                        Record Paid
                      </button>
                    )}
                    {fee.status === 'paid' && (
                      <span className="text-[11px] text-emerald-400 font-mono">
                        Paid ({fee.paymentMethod || 'Online'})
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal */}
      <Modal isOpen={isInvoiceModalOpen} onClose={() => setIsInvoiceModalOpen(false)} title="Issue Fee Invoice">
        <form onSubmit={handleCreateInvoice} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Select Student</label>
            <select
              value={formData.studentId}
              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.rollNo})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Fee Description / Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Amount ($)</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Due Date</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsInvoiceModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
            >
              Issue Invoice
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

function ConfirmModal({
  open,
  title = "Confirm Action",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-[#101118] border border-white/10 rounded-xl p-8 shadow-2xl">
        <p className="text-[#c8a96a] uppercase tracking-[0.3em] text-[10px] mb-4">
          Warrior Dad CMS
        </p>

        <h2 className="uppercase text-2xl font-black">{title}</h2>

        <p className="mt-5 text-slate-400 italic font-serif leading-7">
          {message}
        </p>

        <div className="mt-8 flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 border border-white/10 text-slate-400 py-4 uppercase tracking-[0.18em] text-[11px]"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500/20 border border-red-500/30 text-red-300 py-4 uppercase tracking-[0.18em] text-[11px] font-bold"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
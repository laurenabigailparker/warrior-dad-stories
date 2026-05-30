function StatusMessage({ message, type = "success" }) {
  if (!message) return null;

  return (
    <div
      className={`rounded-lg px-5 py-4 border text-sm font-medium ${
        type === "success"
          ? "bg-green-500/10 border-green-500/20 text-green-300"
          : "bg-red-500/10 border-red-500/20 text-red-300"
      }`}
    >
      {message}
    </div>
  );
}

export default StatusMessage;
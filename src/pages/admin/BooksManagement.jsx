import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import StatusMessage from "../../components/admin/StatusMessage";
import ConfirmModal from "../../components/admin/ConfirmModal";

function BooksManagement() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const showMessage = (type, text) => {
    setMessageType(type);
    setMessage(text);
    setTimeout(() => setMessage(""), 4000);
  };


  useEffect(() => {
  const loadInitialBooks = async () => {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      showMessage("error", "Failed to load books.");
      return;
    }

    setBooks(data || []);
  };

  loadInitialBooks();
}, []);

  const filteredBooks = books.filter((book) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      book.title?.toLowerCase().includes(searchValue) ||
      book.slug?.toLowerCase().includes(searchValue) ||
      book.subtitle?.toLowerCase().includes(searchValue);

    const matchesStatus =
      statusFilter === "all" ? true : book.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const publishedBooks = books.filter((book) => book.status === "Published").length;
  const comingSoonBooks = books.filter((book) => book.status === "Coming Soon").length;

  const handleDelete = async () => {
    if (!deleteTarget) return;

    const { error } = await supabase
      .from("books")
      .delete()
      .eq("id", deleteTarget.id);

    if (error) {
      console.error(error);
      showMessage("error", "Failed to delete book.");
      return;
    }

    setBooks(books.filter((book) => book.id !== deleteTarget.id));
    setDeleteTarget(null);
    showMessage("success", "Book deleted.");
  };

  const handleFeatureBook = async (book) => {
  const { error: clearError } = await supabase
    .from("books")
    .update({ featured: false })
    .neq("id", book.id);

  if (clearError) {
    console.error(clearError);
    showMessage("error", "Failed to update featured book.");
    return;
  }

  const { error: featureError } = await supabase
    .from("books")
    .update({ featured: true })
    .eq("id", book.id);

  if (featureError) {
    console.error(featureError);
    showMessage("error", "Failed to feature book.");
    return;
  }

  setBooks((prev) =>
    prev.map((item) => ({
      ...item,
      featured: item.id === book.id,
    }))
  );

  showMessage("success", `"${book.title}" is now the featured book.`);
};

  return (
    <main className="min-h-screen bg-[#080a0f] text-white p-8">
      <div className="max-w-7xl mx-auto bg-[#101118] min-h-[850px]">
        <AdminSubTop title="Books Management" back="/admin/dashboard" />

        <section className="p-8">
          <StatusMessage message={message} type={messageType} />

          <div className="grid md:grid-cols-3 gap-6 mt-6 mb-10">
            <Stat label="Total Books" value={books.length} />
            <Stat label="Published" value={publishedBooks} />
            <Stat label="Coming Soon" value={comingSoonBooks} />
          </div>

          <div className="flex flex-col lg:flex-row gap-4 justify-between mb-10">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                placeholder="Search books..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-96 max-w-full bg-[#202632] px-5 py-4 border border-white/5 outline-none focus:border-[#c8a96a]"
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#202632] px-5 py-4 border border-white/5 outline-none focus:border-[#c8a96a]"
              >
                <option value="all">All Books</option>
                <option value="Published">Published</option>
                <option value="Coming Soon">Coming Soon</option>
                <option value="In Progress">In Progress</option>
              </select>
            </div>

            <Link
              to="/admin/books/new"
              className="bg-[#c8a96a] text-black px-8 py-4 uppercase tracking-[0.2em] text-[11px] font-bold text-center"
            >
              + New Book
            </Link>
          </div>

          <div className="hidden lg:grid grid-cols-[1.3fr_0.8fr_0.7fr_0.7fr_0.5fr] text-slate-400 uppercase tracking-[0.25em] text-[10px] px-5 py-4">
            <span>Title</span>
            <span>Cover</span>
            <span>Status</span>
            <span>Featured</span>
            <span>Actions</span>
          </div>

          <div className="bg-[#202632] rounded-lg overflow-hidden">
            {filteredBooks.length === 0 ? (
              <p className="p-8 text-slate-500 italic font-serif">
                No books found.
              </p>
            ) : (
              filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="grid lg:grid-cols-[1.3fr_0.8fr_0.7fr_0.7fr_0.5fr] gap-4 px-5 py-7 border-b border-white/5 last:border-b-0"
                >
                  <div>
                    <h3 className="uppercase font-black">{book.title}</h3>
                    <p className="mt-2 text-slate-600 text-xs">/{book.slug}</p>
                    <p className="mt-3 text-slate-500 italic font-serif text-sm">
                      {book.subtitle}
                    </p>
                  </div>

                  <div className="text-slate-400 text-sm">
                    {book.cover_image ? (
                      <img
                        src={book.cover_image}
                        alt={book.title}
                        className="h-24 w-16 object-cover rounded border border-white/10"
                      />
                    ) : (
                      "No cover"
                    )}
                  </div>

                  <span className="bg-[#34302b] text-[#c8a96a] px-3 py-2 text-[10px] uppercase h-fit w-fit">
                    {book.status || "In Progress"}
                  </span>

                  <div>
  {book.featured ? (
    <span className="bg-[#c8a96a] text-black px-3 py-2 text-[10px] uppercase font-bold">
      Featured
    </span>
  ) : (
    <button
      onClick={() => handleFeatureBook(book)}
      className="border border-[#c8a96a] text-[#c8a96a] px-3 py-2 text-[10px] uppercase tracking-[0.15em] hover:bg-[#c8a96a] hover:text-black transition"
    >
      Feature
    </button>
  )}
</div>

                  <div className="flex gap-5 text-slate-400">
                    <Link to={`/admin/books/edit/${book.id}`}>✎</Link>
                    <button onClick={() => setDeleteTarget(book)}>🗑</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Delete Book?"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmText="Delete Book"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </main>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-[#202632] rounded-lg p-7">
      <p className="uppercase tracking-[0.25em] text-[10px] text-slate-500">
        {label}
      </p>
      <h3 className="mt-4 text-4xl text-[#c8a96a] font-black">{value}</h3>
    </div>
  );
}

function AdminSubTop({ title, back }) {
  return (
    <header className="h-20 bg-[#202632] px-8 grid grid-cols-3 items-center">
      <Link
        to={back}
        className="uppercase tracking-[0.2em] text-[11px] text-slate-400"
      >
        ← Back To Dashboard
      </Link>

      <h1 className="uppercase tracking-[0.25em] font-black text-center">
        {title}
      </h1>

      <div />
    </header>
  );
}

export default BooksManagement;
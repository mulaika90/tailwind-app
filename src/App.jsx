import React, { useState } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [post, setPost] = useState([]);
  const [editId, setEditId] = useState(null); // Track karne ke liye ke kaunsi post edit ho rahi hai

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) return;

    if (editId !== null) {
      // Agar edit mode hai toh post ko update karo
      setPost(
        post.map((p) => (p.id === editId ? { ...p, title, desc } : p))
      );
      setEditId(null); // Edit mode reset kar do
    } else {
      // Nayi post add karo
      const newPost = {
        id: Date.now(), // Unique ID for each post
        title: title,
        desc: desc,
      };
      setPost([...post, newPost]);
    }

    setTitle("");
    setDesc("");
  }

  // Delete post function
  function handleDelete(id) {
    
    setPost(post.filter((p) => p.id !== id));
    if (editId === id) {
      setEditId(null);
      setTitle("");
      setDesc("");
    }
  }

  // Edit post function (form me data load karne ke liye)
  function handleEdit(elem) {
    setTitle(elem.title);
    setDesc(elem.desc);
    setEditId(elem.id);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-4 sm:p-8 text-slate-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
             Community Feed
          </h1>
          <p className="text-slate-400 text-sm mt-1">Create, edit, and share your thoughts</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT — POST FORM */}
          <div className="lg:col-span-4 lg:sticky lg:top-8">
            <div className="bg-slate-800/85 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-slate-700/60">
              <h2 className="text-xl font-bold text-slate-100 mb-4">
                {editId !== null ? "Edit Post" : "Create Post"}
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Post title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                />

                <textarea
                  placeholder="Write something..."
                  rows="5"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 resize-none transition"
                />

                <button
                  type="submit"
                  className={`py-3 rounded-xl font-semibold shadow-lg transition duration-200 cursor-pointer text-white ${
                    editId !== null
                      ? "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30"
                      : "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30"
                  }`}
                >
                  {editId !== null ? "Update Post" : "Publish Post"}
                </button>

              </form>
            </div>
          </div>

          {/* RIGHT — POSTS LIST */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-100">
                Recent Posts
              </h2>
              <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full font-medium">
                {post.length} {post.length === 1 ? "Post" : "Posts"}
              </span>
            </div>

            {post.length === 0 ? (
              <div className="bg-slate-800/40 border border-dashed border-slate-700 rounded-2xl p-12 text-center">
                <p className="text-slate-400 font-medium">
                  No posts yet. Fill out the form to create your first post!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {post.map((elem) => (
                  <div
                    key={elem.id}
                    className="bg-slate-800/85 backdrop-blur-md rounded-2xl shadow-xl p-5 border border-slate-700/60 flex flex-col justify-between hover:border-slate-600 transition-all duration-300"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2 break-words">
                        {elem.title}
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed break-words whitespace-pre-wrap mb-4">
                        {elem.desc}
                      </p>
                    </div>

                    {/* Edit & Delete Buttons */}
                    <div className="flex items-center gap-2 pt-3 border-t border-slate-700/50">
                      <button
                        onClick={() => handleEdit(elem)}
                        className="flex-1 bg-slate-700/60 hover:bg-slate-700 text-slate-200 text-xs py-2 rounded-lg font-medium transition cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(elem.id)}
                        className="flex-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs py-2 rounded-lg font-medium transition cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;
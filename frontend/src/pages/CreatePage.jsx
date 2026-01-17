import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom"
import api from "../lib/axios";



const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required")
      return;
    }
    setLoading(true);

    try {
      await api.post("/notes", {
        title,
        content,
      });

      api.get("/notes")
      toast.success("Noted create successfully")
      Navigate("/")

    } catch (error) {
      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast 💀", {
          duration: 4000,
          icon: "💀",
        });

      } else {
        toast.error("Failed to create note ");
      }

    } finally {
      setLoading(false)
    }

  };


  return (
    <div className="min-h-screen flex flex-col items-center pt-10">

      {/* Back to Notes */}
      <Link to="/" className="flex items-center gap-2 text-sm mb-10">
        <ArrowLeft className="size-4" />
        Back to Notes
      </Link>

      <div className="w-full max-w-xl px-4">

        {/* THIS WAS MISSING */}
        <h2 className="text-2xl font-semibold mb-6">
          Create New Note
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Title</span>
            </label>

            <input
              type="text"
              placeholder="Note Title"
              className="input input-bordered w-full rounded-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}

            />
          </div>


          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Content</span>
            </label>
            <textarea
              placeholder="Write your note here..."
              className="textarea textarea-bordered h-32"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>


          <div className="card-actions justify-end">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Creating..." : "Create Note"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default CreatePage;

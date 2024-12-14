import React, { useEffect, useState } from "react";
import { useAuth } from "../components/Auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../service/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../service/firebase2";

const Projects = () => {
  const { user } = useAuth();
  const [project, setProject] = useState([]);
  const [newProject, setNewProject] = useState({
    file: null,
    h1: "",
    text: "",
    link: "",
  });
  const [editProject, setEditProject] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "project"), (snapshot) => {
      const projectData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProject(projectData);
    });

    return () => unsubscribe();
  }, []);

  const handleFileUpload = async (file) => {
    if (!file) return "";
    const fileRef = ref(storage, `project/${file.name}`);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  };

  const handleAddProject = async () => {
    if (editProject) {
      alert("massss smn sek ngedit...");
      return;
    }
    if (!newProject.h1 || !newProject.text) return;

    setLoading(true);
    const fileURL = await handleFileUpload(newProject.file);

    await addDoc(collection(db, "project"), {
      text: newProject.text,
      h1: newProject.h1,
      link: newProject.link,
      fileURL,
    });

    setNewProject({ h1: "", text: "", link: "", file: null && "" });
    setLoading(false);
  };

  const handleUpdateProject = async () => {
    if (
      !editProject ||
      !editProject.text ||
      !editProject.h1 ||
      !editProject.link
    ) {
      alert("maaf semua harus diisi");
      return;
    }

    setLoading(true);
    const fileURL = editProject.file
      ? await handleFileUpload(editProject.file)
      : editProject.fileURL;

    await updateDoc(doc(db, "project", editProject.id), {
      text: editProject.text,
      h1: editProject.h1,
      link: editProject.link,
      fileURL,
    });

    setEditProject(null);
    setLoading(false);
  };

  const handleDeleteProject = async (id) => {
    alert("apakah yakin ingin di hapus?");
    await deleteDoc(doc(db, "project", id));
  };

  return (
    <section
      id="projects"
      className="p-8 rounded-2xl "
    >
      <h2 className="text-3xl font-bold text-center mb-6">My Projects</h2>
      {/* project tambah */}
      {user && user.role === "admin" && (
        <>
          {/* Add New Skill */}
          <div className="mb-4 text-black">
            <input
              type="text"
              placeholder="Title Project"
              value={newProject.h1}
              onChange={(e) =>
                setNewProject({ ...newProject, h1: e.target.value })
              }
              className="border rounded px-2 py-1 mr-2"
            />
            <input
              type="text"
              placeholder="New Project"
              value={newProject.text}
              onChange={(e) =>
                setNewProject({ ...newProject, text: e.target.value })
              }
              className="border rounded px-2 py-1 mr-2"
            />
            <input
              type="text"
              placeholder="link Project"
              value={newProject.link}
              onChange={(e) =>
                setNewProject({ ...newProject, link: e.target.value })
              }
              className="border rounded px-2 py-1 mr-2"
            />
            <input
              type="file"
              onChange={(e) =>
                setNewProject({ ...newProject, file: e.target.files[0] })
              }
              className="border rounded px-2 py-1 mr-2 dark:text-white"
            />
            <button
              onClick={handleAddProject}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              {loading ? "Adding..." : "Add Skill"}
            </button>
          </div>
        </>
      )}

      {/* List project */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {project.map((projects) => (
          <div
            key={projects.id} // Tambahkan key di elemen terluar
            className={`p-4 rounded-3xl shadow hover:shadow-lg flex flex-col justify-between ${editProject && editProject.id === projects.id ? "bg-yellow-100/90 dark:bg-yellow-700/90" : "bg-gray-100/90 dark:bg-gray-700/90 "}`}
          >
            <span>
              {projects.fileURL && (
                <img
                  src={projects.fileURL}
                  alt={projects.h1}
                  className="w-full object-cover rounded-3xl"
                />
              )}
              <h3 className="text-xl font-bold mt-4">{projects.h1}</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {projects.text}
              </p>
              <a
                href={projects.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                View Project
              </a>
            </span>
            <span className="flex mt-3">
              {user && user.role === "admin" && (
                <>
                  <button
                    onClick={() => setEditProject(projects)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-lg mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(projects.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </>
              )}
            </span>
          </div>
        ))}
      </div>

      {/* Edit Input Section */}
      {editProject && (
        <div className="mt-4">
          {/* File Input */}
          <input
            type="file"
            onChange={(e) =>
              setEditProject({ ...editProject, file: e.target.files[0] })
            }
            className="border rounded-lg px-2 py-1 mr-2 dark:text-white"
          />
          {/* Title Input */}
          <input
            type="text"
            value={editProject.h1}
            onChange={(e) =>
              setEditProject({ ...editProject, h1: e.target.value })
            }
            className="border rounded-lg px-2 py-1 mr-2"
          />
          {/* Text Input */}
          <input
            type="text"
            value={editProject.text}
            onChange={(e) =>
              setEditProject({ ...editProject, text: e.target.value })
            }
            className="border rounded-lg px-2 py-1 mr-2"
          />
          {/* Link Input */}
          <input
            type="text"
            value={editProject.link}
            onChange={(e) =>
              setEditProject({ ...editProject, link: e.target.value })
            }
            className="border rounded-lg px-2 py-1 mr-2"
          />
          {/* Update Button */}
          <button
            onClick={handleUpdateProject}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            {loading ? "Updating..." : "Update Project"}
          </button>
          {/* Cancel Button */}
          <button
            onClick={() => setEditProject(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-2"
          >
            Cancel
          </button>
        </div>
      )}
    </section>
  );
};

export default Projects;

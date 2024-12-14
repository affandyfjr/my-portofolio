import React, { useState, useEffect } from "react";
import { storage } from "../service/firebase";
import { db } from "../service/firebase2";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../components/Auth"; // Menggunakan context

const SkillComponent = () => {
  const { user } = useAuth(); // Mengambil user dari context
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ h1: "", text: "", file: null });
  const [editSkill, setEditSkill] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "skills"), (snapshot) => {
      const skillsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSkills(skillsData);
    });

    return () => unsubscribe();
  }, []);

  const handleFileUpload = async (file) => {
    if (!file) return "";
    const fileRef = ref(storage, `skills/${file.name}`);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  };

  const handleAddSkill = async () => {
    if (editSkill) {
      alert("maaf anda masih mengedit cooo..");
      return;
    }
    if (!newSkill.text || !newSkill.h1) return;

    setLoading(true);
    const fileURL = await handleFileUpload(newSkill.file);

    await addDoc(collection(db, "skills"), {
      text: newSkill.text,
      h1: newSkill.h1,
      fileURL,
    });

    setNewSkill({ h1: "", text: "", file: null });
    setLoading(false);
  };

  const handleUpdateSkill = async () => {
    if (!editSkill || !editSkill.text || !editSkill.h1) {
      alert("maaf, semua harus di isi..");
      return;
    }

    setLoading(true);
    const fileURL = editSkill.file
      ? await handleFileUpload(editSkill.file)
      : editSkill.fileURL;

    await updateDoc(doc(db, "skills", editSkill.id), {
      text: editSkill.text,
      h1: editSkill.h1,
      fileURL,
    });

    setEditSkill(null);
    setLoading(false);
  };

  const handleDeleteSkill = async (id) => {
    alert("Apakah yakin ingin di hapus?");
    await deleteDoc(doc(db, "skills", id));
  };

  return (
    <div className="p-4" id="skills">
      <h2 className="skills text-3xl font-bold mb-4">Skills</h2>
      {user && user.role === "admin" && (
        <>
          {/* Add New Skill */}
          <div className="mb-4 text-black">
            <input
              type="text"
              placeholder="Title Skill"
              value={newSkill.h1}
              onChange={(e) => setNewSkill({ ...newSkill, h1: e.target.value })}
              className="border rounded px-2 py-1 mr-2"
            />
            <input
              type="text"
              placeholder="New Skill"
              value={newSkill.text}
              onChange={(e) =>
                setNewSkill({ ...newSkill, text: e.target.value })
              }
              className="border rounded px-2 py-1 mr-2"
            />
            <input
              type="file"
              onChange={(e) =>
                setNewSkill({ ...newSkill, file: e.target.files[0] })
              }
              className="border rounded px-2 py-1 mr-2 dark:text-white"
            />
            <button
              onClick={handleAddSkill}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              {loading ? "Adding..." : "Add Skill"}
            </button>
          </div>
        </>
      )}
      {/* Skill List */}
      <ul className="md:grid grid-cols-2 gap-4">
        {skills.map((skill) => (
          <li
            key={skill.id}
            className={` rounded-lg p-4 flex flex-col justify-between mb-2 ${editSkill && editSkill.id === skill.id ? "bg-yellow-100/90 dark:bg-yellow-700/90" : "bg-gray-50/90 dark:bg-gray-800/90"}`}
          >
            <div className="flex items-center mb-3">
              {skill.fileURL && (
                <img
                  src={skill.fileURL}
                  alt={skill.h1}
                  className="mr-4 w-16 h-16 object-contain rounded-lg"
                />
              )}
              <span>
                <h1 className="font-bold mb-3">{skill.h1}</h1>
                <p className="font-semibold">{skill.text}</p>
              </span>
            </div>
            <div>
              {user &&
                user.role === "admin" && ( // Menampilkan tombol hanya jika admin
                  <>
                    <button
                      onClick={() => setEditSkill(skill)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-lg mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </li>
        ))}
      </ul>
      {/* Edit Skill */}
      {editSkill && (
        <div className="mt-4 text-black">
          <input
            type="text"
            value={editSkill.h1}
            onChange={(e) => setEditSkill({ ...editSkill, h1: e.target.value })}
            className="border rounded px-2 py-1 mr-2"
          />
          <input
            type="text"
            value={editSkill.text}
            onChange={(e) =>
              setEditSkill({ ...editSkill, text: e.target.value })
            }
            className="border rounded px-2 py-1 mr-2"
          />
          <input
            type="file"
            onChange={(e) =>
              setEditSkill({ ...editSkill, file: e.target.files[0] })
            }
            className="border rounded px-2 py-1 mr-2 dark:text-white"
          />
          <button
            onClick={handleUpdateSkill}
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
          >
            {loading ? "Updating..." : "Update Skill"}
          </button>
          <button
            onClick={() => setEditSkill(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-2"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillComponent;

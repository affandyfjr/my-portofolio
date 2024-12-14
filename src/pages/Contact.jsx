import React, { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "../service/firebase2";
import emailjs from "emailjs-com";
import { useAuth } from "../components/Auth"

const Contact = () => {
  const { user } = useAuth()
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messages, setMessages] = useState([]);
  const [replyForm, setReplyForm] = useState({ toEmail: "", subject: "", message: "" });
  const [isReplying, setIsReplying] = useState(false);

  useEffect(() => {
    if (user && user.role === "admin") {
      const unsubscribe = onSnapshot(collection(db, "contacts"), (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(fetchedMessages);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Semua field harus diisi!");
      return;
    }

    try {
      setIsSubmitting(true);
      await addDoc(collection(db, "contacts"), form);
      alert("Pesan Anda berhasil dikirim!");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Gagal mengirim pesan:", error);
      alert("Gagal mengirim pesan, coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyForm.toEmail || !replyForm.subject || !replyForm.message) {
      alert("Semua field harus diisi!");
      return;
    }

    try {
      setIsReplying(true);
      await emailjs.send(
        "service_6s8ll0f", // Ganti dengan Service ID Anda
        "template_6njx4t7", // Ganti dengan Template ID Anda
        {
          to_email: replyForm.toEmail,
          subject: replyForm.subject,
          message: replyForm.message,
        },
        "CCiQh_PqHO9zC5QVf" // Ganti dengan User ID Anda
      );
      alert("Balasan berhasil dikirim!");
      setReplyForm({ toEmail: "", subject: "", message: "" });
    } catch (error) {
      console.error("Gagal mengirim balasan:", error);
      alert("Gagal mengirim balasan, coba lagi.");
    } finally {
      setIsReplying(false);
    }
  };

  return (
    <section id="contact" className="p-8 bg-gray-100/90 dark:bg-gray-700/90 rounded-2xl">
      <h2 className="text-4xl font-bold mb-6">Contact Me</h2>
    
      {/* Form Kirim Pesan */}
      <div className="flex flex-col md:flex-row">
        <span className="mr-5 bg-cover rounded-lg bg-[url('public/assets/WIN_20241204_09_39_58_Pro.webp')] w-[50%] h-80"></span>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full p-2 border rounded-lg"
          />
          <textarea
            placeholder="Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            className="w-full p-2 border rounded-lg"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </form>
      </div>

      {/* Pesan Admin */}
      {user && user.role === "admin" && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Messages</h3>
          {messages.map((msg) => (
            <div key={msg.id} className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <p>
                <strong>Name:</strong> {msg.name}
              </p>
              <p>
                <strong>Email:</strong> {msg.email}
              </p>
              <p>
                <strong>Message:</strong> {msg.message}
              </p>
              <button
                onClick={() =>
                  setReplyForm({ toEmail: msg.email, subject: "", message: "" })
                }
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Reply
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Form Balas Pesan */}
      {replyForm.toEmail && (
        <form onSubmit={handleReply} className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-bold mb-2">Reply to {replyForm.toEmail}</h3>
          <input
            type="text"
            placeholder="Subject"
            value={replyForm.subject}
            onChange={(e) =>
              setReplyForm({ ...replyForm, subject: e.target.value })
            }
            required
            className="w-full p-2 border rounded-lg mb-2"
          />
          <textarea
            placeholder="Message"
            value={replyForm.message}
            onChange={(e) =>
              setReplyForm({ ...replyForm, message: e.target.value })
            }
            required
            className="w-full p-2 border rounded-lg mb-2"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {isReplying ? "Sending Reply..." : "Send Reply"}
          </button>
          <button
            type="button"
            onClick={() => setReplyForm({ toEmail: "", subject: "", message: "" })}
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </form>
      )}
    </section>
  );
};

export default Contact;

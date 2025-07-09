"use client";
import React, { useState } from "react";
import { useToast } from "../ToastContext";
import SectionHeader from "../common/SectionHeader";
import axios from "axios";
import SectionIntro from "../common/SectionIntro";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<null | "success" | "error" | "loading">(
    null
  );
  const { showToast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await axios.post("/api/contact", form);
      if (res.status === 200) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        showToast("success", "Message sent successfully!");
      } else {
        setStatus("error");
        showToast("error", "Failed to send message. Please try again.");
      }
    } catch {
      setStatus("error");
      showToast("error", "Failed to send message. Please try again.");
    }
  };

  return (
    <section id="contact">
      <SectionHeader>Contact</SectionHeader>
      <SectionIntro>
        Want to connect? Whether you&apos;re looking to hire, have questions
        about develpment, or just want to chat over coffee - I&apos;m happy to
        hear from you.
      </SectionIntro>
      <div className="space-y-8">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="input input-bordered bg-base-300 text-base-content w-full"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="input input-bordered bg-base-300 text-base-content w-full"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              className="textarea textarea-bordered bg-base-300 text-base-content w-full"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;

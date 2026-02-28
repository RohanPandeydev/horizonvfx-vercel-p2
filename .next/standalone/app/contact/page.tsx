"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import { useState, useEffect } from "react";
import { useToast } from "@/lib/toast-context";

interface FormField {
  id: string;
  label: string;
  placeholder: string;
  type: "text" | "email" | "textarea";
}

interface ContactContent {
  hero: {
    title: string;
    subtitle: string;
  };
  contactInfo: {
    heading: string;
    description: string;
    email: string;
    phoneNumbers: string[];
    location: string;
  };
  form: {
    heading: string;
    fields: FormField[];
  };
}

const DEFAULT_CONTENT: ContactContent = {
  hero: {
    title: "Get In Touch",
    subtitle: "Let's create something amazing together",
  },
  contactInfo: {
    heading: "Contact Information",
    description:
      "We'd love to hear from you. Fill out the form or reach out directly through any of these channels.",
    email: "info@horizonvfx.in",
    phoneNumbers: ["+91 974 871 2372", "+91 876 702 5601"],
    location: "Mumbai, India",
  },
  form: {
    heading: "Send us a message",
    fields: [
      { id: "name", label: "Your Name", placeholder: "John Doe", type: "text" },
      { id: "email", label: "Email Address", placeholder: "john@example.com", type: "email" },
      { id: "subject", label: "Subject", placeholder: "Project Inquiry", type: "text" },
      { id: "message", label: "Message", placeholder: "Tell us about your project...", type: "textarea" },
    ],
  },
};

export default function ContactPage() {
  const { showSuccess, showError } = useToast();
  const [content, setContent] = useState<ContactContent>(DEFAULT_CONTENT);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Load content from CMS
  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch("/api/pages/contact");
        const result = await response.json();

        if (result.success && result.data) {
          const cmsData = result.data.content || result.data;
          setContent({
            ...DEFAULT_CONTENT,
            ...cmsData,
            hero: { ...DEFAULT_CONTENT.hero, ...cmsData.hero },
            contactInfo: { ...DEFAULT_CONTENT.contactInfo, ...cmsData.contactInfo },
            form: { ...DEFAULT_CONTENT.form, ...cmsData.form },
          });
        }
      } catch (error) {
        console.error("Error loading content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        showSuccess(result.message || "Thank you for your message! We will get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(result.error || "Failed to send message");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to send message";
      showError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* Page Header */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative pt-32 pb-16 px-4 md:px-6"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              background:
                "linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #3b82f6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {content.hero.title}
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {content.hero.subtitle}
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Content */}
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-4 text-white">
                  {content.contactInfo.heading}
                </h2>
                <p className="text-gray-400">{content.contactInfo.description}</p>
              </div>

              <div className="space-y-6">
                <motion.div
                  className="flex items-start gap-4 p-6 rounded-xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-white/10"
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Email
                    </h3>
                    <a
                      href={`mailto:${content.contactInfo.email}`}
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      {content.contactInfo.email}
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4 p-6 rounded-xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-white/10"
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Phone
                    </h3>
                    <div className="space-y-1">
                      {content.contactInfo.phoneNumbers.map((phone, index) => (
                        <a
                          key={index}
                          href={`tel:${phone.replace(/\s/g, "")}`}
                          className="block text-gray-400 hover:text-green-400 transition-colors"
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4 p-6 rounded-xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-white/10"
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Location
                    </h3>
                    <p className="text-gray-400">{content.contactInfo.location}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="p-10 md:p-12 rounded-2xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-white/10"
            >
              <h2 className="text-2xl font-bold mb-6 text-white">
                {content.form.heading}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {content.form.fields.map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      {field.label}
                    </label>
                    {field.type === "textarea" ? (
                      <textarea
                        id={field.id}
                        rows={6}
                        value={formData[field.id as keyof typeof formData]}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                        placeholder={field.placeholder}
                      />
                    ) : (
                      <input
                        type={field.type}
                        id={field.id}
                        value={formData[field.id as keyof typeof formData]}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder={field.placeholder}
                      />
                    )}
                  </div>
                ))}

                <MagneticButton>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                    <Send size={20} />
                  </motion.button>
                </MagneticButton>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

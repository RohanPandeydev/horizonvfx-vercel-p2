"use client";
import { motion } from "framer-motion";
import About from "@/components/About";
import DynamicIcon from "@/components/DynamicIcon";
import { getIconColor } from "@/lib/icon-utils";
import { useState, useEffect } from "react";

interface ExcellenceCard {
  id?: number;
  title: string;
  description: string;
  icon: string;
  gradient: string;
}

interface AboutContent {
  hero: {
    title: string;
    subtitle: string;
  };
  story: {
    heading: string;
    paragraphs: string[];
    image: string;
    yearsBadge?: string;
    yearsLabel?: string;
    badge?: {
      value: string;
      label: string;
    };
  };
  excellence: {
    heading: string;
    description: string;
    featureCards?: ExcellenceCard[];
    cards?: ExcellenceCard[];
  };
  stats?: {
    statsCards?: Array<{
      id: number;
      value: string;
      label: string;
      icon: string;
    }>;
  };
  features?: {
    whyChooseUsCards?: ExcellenceCard[];
  };
  journey?: {
    missionCard?: {
      title: string;
      description: string;
      icon: string;
    };
    visionCard?: {
      title: string;
      description: string;
      icon: string;
    };
    valuesCard?: {
      title: string;
      description: string;
      icon: string;
    };
  };
}

const DEFAULT_CONTENT: AboutContent = {
  hero: {
    title: "About HorizonVFX",
    subtitle: "Where the magic of imagination meets the precision of expertise",
  },
  story: {
    heading: "Our Story",
    paragraphs: [
      "Welcome to HorizonVFX, where the magic of imagination meets the precision of expertise. Born from the collective brilliance of a group of freelance artists with over two decades of industry mastery, we have embarked on a journey to redefine the very fabric of visual storytelling through cutting-edge visual effects.",
      "Our tale begins with a passion for transforming dreams into reality. With each stroke of creativity and pixel perfected, our team of seasoned artists has sculpted a narrative that goes beyond the ordinary. We are not just a VFX company; we are architects of awe, crafting cinematic experiences that linger in the hearts and minds of audiences.",
    ],
    image: "https://horizonvfx.in/images/about-us1.jpg",
    badge: {
      value: "20+",
      label: "Years",
    },
  },
  excellence: {
    heading: "Excellence in Every Frame",
    description:
      "At the heart of our success lies a commitment to excellence that extends from the inception to the completion of each project",
    cards: [
      {
        title: "Comprehensive Services",
        description:
          "We seamlessly navigate the entire spectrum of visual effects, offering comprehensive pre to post-production services.",
        icon: "🎬",
        gradient: "from-blue-500 to-cyan-500",
      },
      {
        title: "Vast Talent Pool",
        description:
          "With over 500 artists in our bank, each a virtuoso in their own right, we possess the capacity to undertake any project with unparalleled finesse.",
        icon: "👨‍🎨",
        gradient: "from-green-500 to-emerald-500",
      },
      {
        title: "Innovation First",
        description:
          "Our diverse pool of creative minds, coupled with a commitment to staying at the forefront of industry trends, ensures innovation in every frame.",
        icon: "💡",
        gradient: "from-purple-500 to-pink-500",
      },
      {
        title: "Collaborative Excellence",
        description:
          "We extend our expertise by offering clients access to our curated roster of artists, adding an extra layer of precision and creative flair.",
        icon: "🤝",
        gradient: "from-orange-500 to-red-500",
      },
    ],
  },
};

export default function AboutPage() {
  const [content, setContent] = useState<AboutContent>(DEFAULT_CONTENT);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await fetch("/api/pages/about");
      const result = await response.json();

      if (result.success && result.data) {
        console.log("result", result);
        setContent(result.data.content);
      }
    } catch (error) {
      console.error("Error loading content:", error);
      // Keep default content on error
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  console.log("content", content);

  return (
    <div className="min-h-screen">
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative pt-32 pb-20 px-4 md:px-6 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden"
      >
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              background:
                "linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #a855f7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {content.hero.title}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {content.hero.subtitle}
          </motion.p>
        </div>
      </motion.section>
      {/* Our Story Section */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                {content.story.heading}
              </h2>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                {content.story.paragraphs?.map((paragraph, index) => (
                  <p key={index}>
                    {paragraph
                      .split(/(HorizonVFX|architects of awe)/)
                      .map((part, i) => {
                        if (part === "HorizonVFX") {
                          return (
                            <span
                              key={i}
                              className="text-transparent bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text font-semibold"
                            >
                              {part}
                            </span>
                          );
                        }
                        if (part === "architects of awe") {
                          return (
                            <span
                              key={i}
                              className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold"
                            >
                              {part}
                            </span>
                          );
                        }
                        return part;
                      })}
                  </p>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10">
                {content.story.image && (
                  <img
                    src={content.story.image}
                    alt="HorizonVFX Team"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {(content.story.badge ||
                (content.story.yearsBadge && content.story.yearsLabel)) && (
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">
                      {content.story.badge?.value || content.story.yearsBadge}
                    </div>
                    <div className="text-xs text-white/80">
                      {content.story.badge?.label || content.story.yearsLabel}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
      {/* Our Excellence Section */}
      <section className="py-20 px-4 md:px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {content.excellence.heading}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {content.excellence.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {content.excellence.featureCards?.map((item, i) => (
              <motion.div
                key={item.id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-white/10 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${item.gradient} opacity-10`}
                />
                <div className="relative z-10">
                  {item.icon && (
                    <div className="mb-4">
                      <DynamicIcon
                        name={item.icon}
                        size={48}
                        className={getIconColor(item.icon)}
                      />
                    </div>
                  )}
                  <h3
                    className={`text-2xl font-bold mb-3 bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            )) ||
              content.excellence.cards?.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative p-8 rounded-2xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-white/10 overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${item.gradient} opacity-10`}
                  />
                  <div className="relative z-10">
                    {item.icon && (
                      <div className="mb-4">
                        <DynamicIcon
                          name={item.icon}
                          size={48}
                          className={getIconColor(item.icon)}
                        />
                      </div>
                    )}
                    <h3
                      className={`text-2xl font-bold mb-3 bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* 3D About Component */}
      <About
        stats={content.stats?.statsCards}
        features={content.features?.whyChooseUsCards}
        missionCard={content.journey?.missionCard}
        visionCard={content.journey?.visionCard}
        valuesCard={content.journey?.valuesCard}
      />
    </div>
  );
}

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// All image paths point at /public/images-horizon/* so they resolve from the
// app itself — no S3 / external host required. Admin can edit later.

const aboutContent = {
  hero: {
    title: 'About HorizonVFX',
    subtitle: 'Where the magic of imagination meets the precision of expertise',
  },
  story: {
    heading: 'Our Story',
    paragraphs: [
      'Welcome to HorizonVFX, where the magic of imagination meets the precision of expertise. Born from the collective brilliance of a group of freelance artists with over two decades of industry mastery, we have embarked on a journey to redefine the very fabric of visual storytelling through cutting-edge visual effects.',
      'Our tale begins with a passion for transforming dreams into reality. With each stroke of creativity and pixel perfected, our team of seasoned artists has sculpted a narrative that goes beyond the ordinary. We are not just a VFX company; we are architects of awe, crafting cinematic experiences that linger in the hearts and minds of audiences.',
    ],
    image: '/images-horizon/about-us1.jpg',
    yearsBadge: '20+',
    yearsLabel: 'Years',
  },
  excellence: {
    heading: 'Excellence in Every Frame',
    description: 'At the heart of our success lies a commitment to excellence that extends from the inception to the completion of each project',
    featureCards: [
      { id: 1, title: 'Comprehensive Services', description: 'We seamlessly navigate the entire spectrum of visual effects, offering comprehensive pre to post-production services.', icon: '🎬', gradient: 'from-blue-500 to-cyan-500' },
      { id: 2, title: 'Vast Talent Pool', description: 'With over 500 artists in our bank, each a virtuoso in their own right, we possess the capacity to undertake any project with unparalleled finesse.', icon: '👨‍🎨', gradient: 'from-green-500 to-emerald-500' },
      { id: 3, title: 'Innovation First', description: 'Our diverse pool of creative minds, coupled with a commitment to staying at the forefront of industry trends, ensures innovation in every frame.', icon: '💡', gradient: 'from-purple-500 to-pink-500' },
      { id: 4, title: 'Collaborative Excellence', description: 'We extend our expertise by offering clients access to our curated roster of artists, adding an extra layer of precision and creative flair.', icon: '🤝', gradient: 'from-orange-500 to-red-500' },
    ],
  },
  stats: {
    statsCards: [
      { id: 1, value: '500+', label: 'Projects Delivered', icon: '🎬' },
      { id: 2, value: '50+', label: 'Happy Clients', icon: '🏆' },
      { id: 3, value: '100+', label: 'Team Members', icon: '👥' },
      { id: 4, value: '10+', label: 'Years Experience', icon: '⭐' },
    ],
  },
};

const teamContent = {
  hero: { title: 'The Creative Minds', subtitle: 'Meet the talented artists who bring extraordinary visions to life' },
  leadership: {
    heading: 'Leadership',
    members: [
      { id: 1, name: 'Bhuvnesh Kumar Varshney', role: 'Creative Animation Supervisor', image: '/images-horizon/tm1.jpg', gradient: 'from-blue-500 to-cyan-500', bio: '15+ years of experience in animation and creative direction' },
      { id: 2, name: 'Dibakar Chakraborty', role: 'Founder & VFX Supervisor', image: '/images-horizon/tm2.jpg', gradient: 'from-purple-500 to-pink-500', bio: 'Visionary leader with 20+ years in VFX industry' },
    ],
  },
  teamMembers: {
    heading: 'Our Team',
    members: [
      { id: 3, name: 'Rahul Sharma', role: '3D Artist', image: '/images-horizon/tm3.jpg', gradient: 'from-green-500 to-emerald-500', bio: 'Specialized in 3D modeling and realistic texturing' },
      { id: 4, name: 'Priya Singh', role: 'Compositor', image: '/images-horizon/tm4.jpg', gradient: 'from-orange-500 to-red-500', bio: 'Expert in compositing and color grading' },
      { id: 5, name: 'Amit Patel', role: 'Motion Graphics Artist', image: '/images-horizon/tm5.jpg', gradient: 'from-cyan-500 to-blue-500', bio: 'Creative motion designer with passion for typography' },
    ],
  },
  cta: { heading: 'Join Our Creative Team', description: 'Be part of our journey to create extraordinary visual experiences', buttonText: 'View Open Positions' },
};

const showcaseContent = {
  hero: { title: 'Our Showcase', subtitle: 'Explore our portfolio of visual effects and animation projects that push the boundaries of creativity' },
  services: [
    { icon: '🎬', name: 'Film & OTT', count: '100+' },
    { icon: '🎮', name: 'Gaming', count: '50+' },
    { icon: '📺', name: 'Commercial', count: '200+' },
    { icon: '🖥️', name: 'Unreal Engine', count: '30+' },
  ],
  techStack: [
    { name: 'After Effects', icon: '🎨', color: 'from-purple-500 to-blue-500' },
    { name: 'Nuke', icon: '💣', color: 'from-blue-500 to-cyan-500' },
    { name: 'Maya', icon: '🔷', color: 'from-cyan-500 to-teal-500' },
    { name: 'Unreal Engine', icon: '🎮', color: 'from-red-500 to-orange-500' },
    { name: 'Houdini', icon: '🌀', color: 'from-orange-500 to-yellow-500' },
    { name: 'Blender', icon: '🔶', color: 'from-yellow-500 to-green-500' },
    { name: 'Cinema 4D', icon: '📦', color: 'from-green-500 to-emerald-500' },
    { name: 'Substance', icon: '🎭', color: 'from-pink-500 to-rose-500' },
  ],
  stats: [
    { icon: '🎬', name: 'Projects', count: '500+' },
    { icon: '🏆', name: 'Awards', count: '25+' },
    { icon: '🌍', name: 'Countries', count: '15+' },
    { icon: '⭐', name: 'Years', count: '20+' },
  ],
  industries: [
    { title: 'Film and OTT', image: '/images-horizon/flm.png' },
    { title: 'Game', image: '/images-horizon/game.jpg' },
    { title: 'Commercial', image: '/images-horizon/Commercial.jpg' },
    { title: 'Unreal', image: '/images-horizon/unreal.jpg' },
  ],
};

const homeContent = {
  hero: {
    tagline: 'Visual Effects • Animation • Post Production',
    videoUrl: '/images-horizon/Video1.mp4',
  },
  clients: [
    { url: '/images-horizon/c-logo1.jpg' },
    { url: '/images-horizon/c-logo2.jpg' },
    { url: '/images-horizon/c-logo3.jpg' },
    { url: '/images-horizon/c-logo4.jpg' },
  ],
};

async function upsertPage(slug: string, title: string, content: unknown) {
  const existing = await prisma.pageContent.findUnique({ where: { slug } });
  if (existing) {
    await prisma.pageContent.update({
      where: { slug },
      data: { title, content: JSON.stringify(content), published: true },
    });
    console.log(`Updated PageContent[slug=${slug}].`);
    return;
  }
  await prisma.pageContent.create({
    data: { slug, title, content: JSON.stringify(content), published: true },
  });
  console.log(`Created PageContent[slug=${slug}].`);
}

async function main() {
  await upsertPage('about', 'About Page', aboutContent);
  await upsertPage('team', 'Team Page', teamContent);
  await upsertPage('showcase', 'Showcase Page', showcaseContent);
  await upsertPage('home', 'Home Page', homeContent);
  console.log('Done.');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());

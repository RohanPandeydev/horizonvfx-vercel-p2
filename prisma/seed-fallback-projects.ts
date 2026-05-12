import { PrismaClient } from '@prisma/client';
import { decrypt } from '../lib/crypto';

const prisma = new PrismaClient();

const ADMIN_EMAIL = 'mydrive8888@gmail.com';

const projects = [
  { title: 'Pushpa 2: The Rule', category: 'Film & OTT', thumb: '/images-horizon/Pushpa_2-big.png', gradient: 'from-orange-500 to-red-600', description: 'High-end VFX work for blockbuster sequel', technologies: ['Nuke', 'Maya', 'Houdini'] },
  { title: 'Kushumbo', category: 'Film & OTT', thumb: '/images-horizon/Kushumbo-big.png', gradient: 'from-purple-500 to-pink-500', description: 'Visual effects for feature film', technologies: ['Nuke', 'After Effects'] },
  { title: 'AKAL', category: 'Film & OTT', thumb: '/images-horizon/AKAL-big.png', gradient: 'from-blue-500 to-cyan-500', description: 'Period drama VFX', technologies: ['Maya', 'Nuke'] },
  { title: 'Kill', category: 'Film & OTT', thumb: '/images-horizon/Kill-big.png', gradient: 'from-red-600 to-orange-500', description: 'Action thriller VFX', technologies: ['Houdini', 'Nuke'] },
  { title: 'Shambaji Maharaj', category: 'Film & OTT', thumb: '/images-horizon/Shambaji-Maharaj-big.png', gradient: 'from-amber-500 to-yellow-600', description: 'Historical epic visual effects', technologies: ['Maya', 'Nuke', 'Houdini'] },
  { title: 'Tara Rani', category: 'Film & OTT', thumb: '/images-horizon/TARA-RANI-big.png', gradient: 'from-rose-500 to-pink-600', description: 'Period production VFX', technologies: ['Nuke', 'Maya'] },
];

const reels = [
  { title: 'Animation Reel 01', category: 'Animation', thumb: '/images-horizon/animation1-big.jpg', gradient: 'from-blue-500 to-purple-500', description: '3D character animation showcase', technologies: ['Maya', 'Blender'] },
  { title: 'Animation Reel 02', category: 'Animation', thumb: '/images-horizon/animation2-big.jpg', gradient: 'from-teal-500 to-emerald-500', description: 'Stylized animation work', technologies: ['Blender', 'After Effects'] },
  { title: 'Animation Reel 03', category: 'Animation', thumb: '/images-horizon/animation3-big.png', gradient: 'from-fuchsia-500 to-purple-600', description: 'Character rigging and animation', technologies: ['Maya', 'Houdini'] },
  { title: 'Animation Reel 04', category: 'Animation', thumb: '/images-horizon/animation4-big.png', gradient: 'from-indigo-500 to-blue-600', description: 'Motion graphics reel', technologies: ['After Effects', 'Cinema 4D'] },
  { title: 'Animation Reel 05', category: 'Animation', thumb: '/images-horizon/animation5-big.jpg', gradient: 'from-pink-500 to-rose-500', description: 'Concept animation work', technologies: ['Blender'] },
  { title: 'After Effects Showcase', category: 'Motion Graphics', thumb: '/images-horizon/after-effect-big.jpg', gradient: 'from-cyan-500 to-blue-500', description: 'Motion graphics and compositing', technologies: ['After Effects', 'Premiere'] },
  { title: 'Special Effects Reel', category: 'VFX', thumb: '/images-horizon/sp-effect1-big.jpg', gradient: 'from-emerald-500 to-teal-600', description: 'CG effects and simulations', technologies: ['Houdini', 'Nuke'] },
];

async function main() {
  // Find admin user
  const users = await prisma.user.findMany();
  const admin = users.find(u => {
    try { return decrypt(u.email) === ADMIN_EMAIL; } catch { return false; }
  });
  if (!admin) throw new Error(`Admin user ${ADMIN_EMAIL} not found`);

  // Skip if already seeded
  const existing = await prisma.videoProject.count();
  if (existing > 0) {
    console.log(`Skipping: ${existing} VideoProject rows already exist.`);
    return;
  }

  let created = 0;

  for (const p of projects) {
    await prisma.videoProject.create({
      data: {
        title: p.title,
        type: 'project',
        isReel: false,
        thumbnailUrl: p.thumb,
        thumbnailS3Key: p.thumb,
        category: p.category,
        isFeatured: true,
        isPublic: true,
        description: p.description,
        gradient: p.gradient,
        technologies: JSON.stringify(p.technologies),
        uploadedBy: admin.id,
      },
    });
    created++;
  }

  for (const r of reels) {
    await prisma.videoProject.create({
      data: {
        title: r.title,
        type: 'reel',
        isReel: true,
        thumbnailUrl: r.thumb,
        thumbnailS3Key: r.thumb,
        category: r.category,
        isFeatured: true,
        isPublic: true,
        description: r.description,
        gradient: r.gradient,
        technologies: JSON.stringify(r.technologies),
        uploadedBy: admin.id,
      },
    });
    created++;
  }

  console.log(`Seeded ${created} VideoProject rows (${projects.length} projects + ${reels.length} reels).`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());

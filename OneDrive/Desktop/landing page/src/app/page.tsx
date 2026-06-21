import dbConnect from '@/lib/dbConnect';
import Project from '@/models/Project';
import Testimonial from '@/models/Testimonial';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Capabilities from '@/sections/Capabilities';
import Workflow from '@/sections/Workflow';
import Showcase from '@/sections/Showcase';
import Testimonials from '@/sections/Testimonials';
import Contact from '@/sections/Contact';
import Container from '@/components/ui/Container';
import Navbar from '@/components/ui/Navbar';
import ClientWrapper from '@/components/ui/ClientWrapper';

// Force dynamic rendering to run queries at request-time, bypassing compile-time connection locks
export const dynamic = 'force-dynamic';

/**
 * Public Landing Page - High-performance dark-first layout showcasing
 * our premium responsive Hero, Positioning, Capabilities, Workflow, Showcase, Testimonials, and Contact.
 */
export default async function Home() {
  let serializedProjects: any[] = [];
  let serializedTestimonials: any[] = [];

  try {
    await dbConnect();
    // Load all published projects, sorted by catalog order and date
    const projects = await Project.find({ published: true })
      .sort({ order: 1, createdAt: -1 });

    // Securely serialize Mongoose items to pure JSON to prevent Next.js client-boundary warnings
    serializedProjects = projects.map((proj) => ({
      id: proj._id.toString(),
      title: proj.title,
      slug: proj.slug,
      shortDescription: proj.shortDescription,
      thumbnail: proj.thumbnail,
      techStack: proj.techStack,
      category: proj.category,
      liveUrl: proj.liveUrl || null,
      githubUrl: proj.githubUrl || null,
      featured: proj.featured || false,
      order: proj.order || 0
    }));

    // Load active testimonials from database
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    serializedTestimonials = testimonials.map((test) => ({
      id: test._id.toString(),
      clientName: test.clientName,
      company: test.company,
      role: test.role,
      feedback: test.feedback,
      avatar: test.avatar || null,
      rating: test.rating || 5,
      featured: test.featured || false
    }));
  } catch (error) {
    console.warn('⚠️ Landing page database fetch failed during pre-render. Falling back to empty showcase/testimonial states.');
  }

  return (
    <ClientWrapper>
      <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-violet-500/30 overflow-x-hidden">
        {/* Premium Floating Navigation Header */}
        <Navbar />

        {/* Premium Hero Section */}
        <Hero />

        {/* About/Positioning Section */}
        <About />

        {/* Capabilities Section */}
        <Capabilities />

        {/* Workflow Process Section */}
        <Workflow />

        {/* Dynamic Curated Showcase Section */}
        <main id="showcase" className="flex-1 w-full relative z-10 border-t border-zinc-900/60 bg-zinc-950">
          {/* Soft background subtle dot grid decoration */}
          <div className="absolute inset-0 -z-10 pointer-events-none opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

          <Showcase projects={serializedProjects} />
        </main>

        {/* Testimonials Showcase Section */}
        <Testimonials testimonials={serializedTestimonials} />

        {/* Premium Contact Section */}
        <Contact />

        {/* Modern Premium Footer */}
        <footer className="border-t border-zinc-900/60 bg-zinc-950 py-12">
          <Container size="lg" className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-500 font-mono">
            <p>© {new Date().getFullYear()} Developer Showcase. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="/admin/projects" className="hover:text-zinc-300 transition-colors">
                Admin Console
              </a>
              <span className="text-zinc-800">|</span>
              <span className="text-zinc-600">Built with Next.js & Tailwind</span>
            </div>
          </Container>
        </footer>
      </div>
    </ClientWrapper>
  );
}

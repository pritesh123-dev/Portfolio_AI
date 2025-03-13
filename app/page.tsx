"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { ArrowDown, Award, Code, ExternalLink, Sparkles, Star, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import ProjectCard from "@/components/project-card"
import ThreeBackground from "@/components/three-background"
import ContactForm from "@/components/contact-form"
import ExperienceTimeline from "@/components/experience-timeline"
import ProjectModal from "@/components/project-modal"
import CustomCursor from "@/components/custom-cursor"
import ScrollIndicator from "@/components/scroll-indicator"
import ScrollToTop from "@/components/scroll-to-top"
import SplashScreen from "@/components/splash-screen"
import SkillsChart from "@/components/skills-chart"
import { SplineScene } from "@/components/hero/splite";
import { Card } from "@/components/hero/card"
import { Spotlight } from "@/components/hero/spotlight"

export default function Home() {
  const controls = useAnimation()
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const experienceRef = useRef(null)
  const projectsRef = useRef(null)
  const contactRef = useRef(null)
  const testimonialsRef = useRef(null)

  const [selectedProject, setSelectedProject] = useState(null)

  const heroInView = useInView(heroRef, { once: false })
  const aboutInView = useInView(aboutRef, { once: false })
  const experienceInView = useInView(experienceRef, { once: false })
  const projectsInView = useInView(projectsRef, { once: false })
  const testimonialsInView = useInView(testimonialsRef, { once: false })

  useEffect(() => {
    // Function to enable scrolling
    const enableScrolling = () => {
      document.body.style.overflow = ""
      document.body.style.height = ""
      document.documentElement.style.overflow = ""
      document.documentElement.style.height = ""
    }

    // Ensure scrolling is enabled when component mounts
    enableScrolling()

    // Also ensure scrolling is enabled when component unmounts
    return () => {
      enableScrolling()
    }
  }, [])

  useEffect(() => {
    if (heroInView) {
      controls.start("visible")
    }
  }, [controls, heroInView])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const projects = [
    {
      title: "E-commerce Platform",
      description:
        "A full-stack e-commerce platform with payment integration, user authentication, and product management.",
      longDescription:
        "This comprehensive e-commerce solution provides businesses with everything they need to sell products online. Built with scalability in mind, it features a responsive design, secure payment processing, user authentication, product management, order tracking, and analytics dashboard.",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "/placeholder.svg?height=300&width=500",
      github: "#",
      demo: "#",
      date: "January 2023",
      client: "RetailTech Inc.",
      features: [
        "Responsive design optimized for all devices",
        "Secure payment processing with Stripe",
        "User authentication and account management",
        "Product catalog with search and filtering",
        "Order management and tracking",
        "Admin dashboard with analytics",
      ],
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates and team workspaces.",
      longDescription:
        "This task management application helps teams collaborate effectively by providing a centralized platform for task assignment, progress tracking, and communication. With real-time updates and intuitive interfaces, it streamlines workflow and improves productivity.",
      tags: ["TypeScript", "Next.js", "Prisma", "Socket.io"],
      image: "/placeholder.svg?height=300&width=500",
      github: "#",
      demo: "#",
      date: "June 2022",
      client: "ProductivityPro",
      features: [
        "Real-time collaboration with Socket.io",
        "Team workspaces and project organization",
        "Task assignment and deadline tracking",
        "Comment threads and file attachments",
        "Progress visualization with charts",
        "Email notifications and reminders",
      ],
    },
    {
      title: "AI Content Generator",
      description: "An AI-powered application that generates marketing content based on user prompts.",
      longDescription:
        "This innovative tool leverages artificial intelligence to help marketers create compelling content quickly. By analyzing user prompts and industry trends, it generates high-quality marketing copy, social media posts, and email campaigns that resonate with target audiences.",
      tags: ["React", "Python", "TensorFlow", "OpenAI"],
      image: "/placeholder.svg?height=300&width=500",
      github: "#",
      demo: "#",
      date: "October 2022",
      client: "MarketingAI Solutions",
      features: [
        "AI-powered content generation",
        "Multiple content formats (blog posts, social media, emails)",
        "Tone and style customization",
        "SEO optimization suggestions",
        "Content performance analytics",
        "Template library and saving options",
      ],
    },
  ]

  const experiences = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      period: "2021 - Present",
      description:
        "Led the frontend development team in building responsive web applications. Implemented modern UI/UX practices and improved performance by 40%.",
      skills: ["React", "TypeScript", "Next.js", "GraphQL"],
    },
    {
      title: "Full Stack Developer",
      company: "Digital Solutions Ltd.",
      period: "2018 - 2021",
      description:
        "Developed and maintained full-stack applications for enterprise clients. Collaborated with design and product teams to deliver high-quality software solutions.",
      skills: ["JavaScript", "Node.js", "Express", "MongoDB"],
    },
    {
      title: "Junior Web Developer",
      company: "Creative Web Agency",
      period: "2016 - 2018",
      description:
        "Created responsive websites and web applications for various clients. Worked closely with designers to implement pixel-perfect interfaces.",
      skills: ["HTML", "CSS", "JavaScript", "jQuery"],
    },
  ]

  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "GraphQL",
    "MongoDB",
    "PostgreSQL",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "Git",
    "Docker",
    "AWS",
  ]

  const skillsData = [
    { name: "JavaScript", percentage: 95, color: "#954ce9" },
    { name: "React", percentage: 90, color: "#d946ef" },
    { name: "TypeScript", percentage: 85, color: "#67e8f9" },
    { name: "Node.js", percentage: 80, color: "#954ce9" },
    { name: "Next.js", percentage: 85, color: "#d946ef" },
    { name: "GraphQL", percentage: 75, color: "#67e8f9" },
  ]

  return (
    <div className="min-h-screen bg-background custom-scrollbar">
      {/* Add the splash screen with your name */}
      <SplashScreen name="Pritesh" />

      <ThreeBackground />
      {/* <CustomCursor /> */}
      <ScrollIndicator />
      <Navbar />


      {/* Hero Section */}
      <Card className="w-full relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20 text-white"
        // fill="white"
      />
      <section
        id="home"
        ref={heroRef}
        className="min-h-screen flex flex-col justify-center items-center px-4 py-20 relative overflow-hidden"
      >
        <motion.div
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="container max-w-4xl mx-auto text-center z-10"
        >
          <motion.div variants={fadeIn} className="mb-6">
            {/* <span className="inline-block px-4 py-2 text-sm font-medium rounded-full bg-primary/10 text-primary mb-4 backdrop-blur-sm border border-primary/20">
              <Sparkles className="inline-block mr-2 h-4 w-4" /> Hello, I'm a Developer
            </span> */}
          </motion.div>
          <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-gradient">
            Crafting digital experiences with code
          </motion.h1>
          <motion.p variants={fadeIn} className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            I build modern, responsive web applications with a focus on user experience, performance, and clean code.
          </motion.p>
          <motion.div variants={fadeIn} className="flex flex-wrap gap-4 justify-center">
          <motion.button
                className="px-6 py-3 text-lg font-semibold rounded-full glow-effect bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              View My Work
            </motion.button>
            <motion.button
              className="px-6 py-3 text-lg font-semibold rounded-full glass-effect bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Contact Me
            </motion.button>
          </motion.div>
          <motion.div
            variants={fadeIn}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          >
            {/* <Button
              variant="ghost"
              size="icon"
              className="rounded-full glass-effect"
            >
              <ArrowDown className="h-6 w-6" />
            </Button> */}
          </motion.div>
        </motion.div>
      </section>
        {/* Right content */}
        <div className="flex-1 relative" id="anime">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
    </Card>
      

      {/* About Section */}
      <section ref={aboutRef} className="py-20 px-4 bg-muted/30 backdrop-blur-sm relative clip-path-slant" id="about">
         <motion.div
          initial="hidden"
          animate={aboutInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="container max-w-4xl mx-auto"
        >
          <motion.h2
            variants={fadeIn}
            className="text-3xl md:text-5xl font-bold mb-12 text-center text-gradient-static"
          >
            About Me
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeIn}
              className="relative"
              whileHover={{ rotate: 2, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted animate-pulse-glow">
                <img src="/placeholder.svg?height=400&width=400" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <motion.div
                className="absolute -bottom-6 -right-6 bg-gradient-to-r from-primary to-secondary text-primary-foreground p-4 rounded-lg shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 10 }}
              >
                <p className="font-bold">5+ Years Experience</p>
              </motion.div>
            </motion.div>
            <motion.div variants={fadeIn} className="space-y-6">
              <p className="text-lg">
                I'm a passionate web developer with over 5 years of experience building modern web applications. I
                specialize in frontend development with React and TypeScript, but I'm also comfortable working with
                backend technologies.
              </p>
              <p className="text-lg">
                My approach to development focuses on creating clean, maintainable code that delivers exceptional user
                experiences. I'm constantly learning and exploring new technologies to stay at the forefront of web
                development.
              </p>
              <div className="pt-4">
                <h3 className="text-xl font-semibold mb-4">My Skills</h3>
                <SkillsChart skills={skillsData} />
              </div>
            </motion.div>
          </div>

          {/* Stats Cards */}
          <motion.div variants={fadeIn} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            <motion.div className="glass-card rounded-xl p-6 text-center" whileHover={{ y: -5 }}>
              <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold">50+</h3>
              <p className="text-muted-foreground">Projects</p>
            </motion.div>

            <motion.div className="glass-card rounded-xl p-6 text-center" whileHover={{ y: -5 }}>
              <div className="bg-secondary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-3xl font-bold">30+</h3>
              <p className="text-muted-foreground">Clients</p>
            </motion.div>

            <motion.div className="glass-card rounded-xl p-6 text-center" whileHover={{ y: -5 }}>
              <div className="bg-accent/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-3xl font-bold">5+</h3>
              <p className="text-muted-foreground">Years</p>
            </motion.div>

            <motion.div className="glass-card rounded-xl p-6 text-center" whileHover={{ y: -5 }}>
              <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold">15+</h3>
              <p className="text-muted-foreground">Awards</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section id="experience" ref={experienceRef} className="py-20 px-4 relative">
        <motion.div
          initial="hidden"
          animate={experienceInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="container max-w-4xl mx-auto"
        >
          <motion.h2
            variants={fadeIn}
            className="text-3xl md:text-5xl font-bold mb-12 text-center text-gradient-static"
          >
            Work Experience
          </motion.h2>
          <ExperienceTimeline experiences={experiences} />
        </motion.div>
      </section>



      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="py-20 px-4 relative clip-path-wave">
        <motion.div
          initial="hidden"
          animate={projectsInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="container max-w-4xl mx-auto"
        >
          <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-bold mb-4 text-center text-gradient-static">
            Featured Projects
          </motion.h2>
          <motion.p variants={fadeIn} className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and expertise.
          </motion.p>
          <motion.div variants={staggerContainer} className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            variants={fadeIn}
            className="mt-12 text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" className="rounded-full glass-effect">
              View All Projects <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-20 px-4 relative">
        <div className="container max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 rounded-3xl p-8 md:p-12 shadow-lg backdrop-blur-md border border-white/10"
            whileHover={{
              y: -5,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gradient-static">Let's Work Together</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              I'm currently available for freelance work and open to new opportunities. If you have a project in mind or
              just want to chat, feel free to reach out!
            </p>
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10 backdrop-blur-sm">
        <div className="container max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground">© {new Date().getFullYear()} Your Name. All rights reserved.</p>
        </div>
      </footer>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} project={selectedProject} />
      )}

      <ScrollToTop />
    </div>
  )
}






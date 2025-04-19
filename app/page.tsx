"use client"

import { useEffect, useRef, useState } from "react"
import Image from 'next/image'
import { motion, useInView, useAnimation } from "framer-motion"
import { ArrowDown, ExternalLink, Sparkles, Facebook, Twitter, Linkedin, Instagram, Mail, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import ProjectCard from "@/components/project-card"
import ContactForm from "@/components/contact-form"
import ExperienceTimeline from "@/components/experience-timeline"
import ProjectModal from "@/components/project-modal"
// import CustomCursor from "@/components/custom-cursor"
import ScrollIndicator from "@/components/scroll-indicator"
import ScrollToTop from "@/components/scroll-to-top"
import SplashScreen from "@/components/splash-screen"
import SkillsChart from "@/components/skills-chart"
import { SplineScene } from "@/components/hero/splite";
import { Card } from "@/components/hero/card"
import { Spotlight } from "@/components/hero/spotlight"
import TechStack from "@/components/tech-stack";
import profilePic from "@/components/assests/pritesh_image.jpeg"

export default function Home() {
  const controls = useAnimation()
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const experienceRef = useRef(null)
  const projectsRef = useRef(null)
  const contactRef = useRef(null)
  const techStackRef = useRef(null)

  const [selectedProject, setSelectedProject] = useState(null)

  const heroInView = useInView(heroRef, { once: false })
  const aboutInView = useInView(aboutRef, { once: false })
  const experienceInView = useInView(experienceRef, { once: false })
  const projectsInView = useInView(projectsRef, { once: false })
  const techStackInView = useInView(techStackRef, { once: false })

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
      title: "Job Portal",
      description:
        "Built a full-stack job board with Next.js where recruiters post jobs and applicants apply directly, deployed on AWS.",
      tags: ["Next", "Tailwind", "AI", "AWS", "Firebase", "Rest API"],
      image: "https://i.imgur.com/2GBSjNB.png?height=300&width=500",
      demo: "https://bugbear.in/",
    },
    {
      title: "E-commerce Platform",
      description:
        "A full-stack e-commerce platform with order tracking, add to cart, local stroage and product management.",
      tags: ["React", "Redux Toolkit", "Javascript", "HTML", "CSS", "SQL"],
      image: "https://662e52856a9762c826b37d76--taupe-sfogliatella-54b394.netlify.app/images/shoplane.png?height=300&width=500",
      demo: "https://pritesh123-dev.github.io/js-final-project/checkout.html",
    },
    {
      title: "Streaming Platforms/Services",
      description:
        "This website recommends movies, tv shows to the users based on genre, popularity and rating, Used Redux as a state manag ement library, redux-thunk as middle ware along with Material UI Icons.",
      tags: ["React", "Redux-Trunk", "ENV", "Rest APIs"],
      image: "https://662e52856a9762c826b37d76--taupe-sfogliatella-54b394.netlify.app/images/moviesite.png?height=300&width=500",
      demo: "https://662e4453606617ba5cf8517a--vocal-paletas-0ad71b.netlify.app/",
    },
    {
      title: "Company Website",
      description:
        "I leveraged cutting-edge technology to develop startup company website. It boasts a multitude of advanced features and exhibits a responsive design.",
      tags: ["React", "Redux", "Router", "Rest APIs", "SQL", "Vertual-DOM"],
      image: "https://662e52856a9762c826b37d76--taupe-sfogliatella-54b394.netlify.app/images/Aekute.png?height=300&width=500",
      demo: "https://pritesh123-dev.github.io/Aekute/",
    },
    {
      title: "Pharmacy Website",
      description:
        "The Kafene website serves as a pharmacy dashboard, enabling employees to efficiently manage products, orders, and users. The login credentials require the username and password to be the same.",
      tags: ["React", "Redux", "Firebase", "Rest APIs", "SQL", "Authentication"],
      image: "https://662e52856a9762c826b37d76--taupe-sfogliatella-54b394.netlify.app/images/kafene2.png?height=300&width=500",
      demo: "https://genuine-belekoy-e99dde.netlify.app/",
    },
    // {
    //   title: "Task Management App",
    //   description: "A collaborative task management application with real-time updates and team workspaces.",
    //   longDescription:
    //     "This task management application helps teams collaborate effectively by providing a centralized platform for task assignment, progress tracking, and communication. With real-time updates and intuitive interfaces, it streamlines workflow and improves productivity.",
    //   tags: ["TypeScript", "Next.js", "Prisma", "Socket.io"],
    //   image: "/placeholder.svg?height=300&width=500",
    //   github: "#",
    //   demo: "#",
    //   date: "June 2022",
    //   client: "ProductivityPro",
    //   features: [
    //     "Real-time collaboration with Socket.io",
    //     "Team workspaces and project organization",
    //     "Task assignment and deadline tracking",
    //     "Comment threads and file attachments",
    //     "Progress visualization with charts",
    //     "Email notifications and reminders",
    //   ],
    // },
    // {
    //   title: "AI Content Generator",
    //   description: "An AI-powered application that generates marketing content based on user prompts.",
    //   longDescription:
    //     "This innovative tool leverages artificial intelligence to help marketers create compelling content quickly. By analyzing user prompts and industry trends, it generates high-quality marketing copy, social media posts, and email campaigns that resonate with target audiences.",
    //   tags: ["React", "Python", "TensorFlow", "OpenAI"],
    //   image: "/placeholder.svg?height=300&width=500",
    //   github: "#",
    //   demo: "#",
    //   date: "October 2022",
    //   client: "MarketingAI Solutions",
    //   features: [
    //     "AI-powered content generation",
    //     "Multiple content formats (blog posts, social media, emails)",
    //     "Tone and style customization",
    //     "SEO optimization suggestions",
    //     "Content performance analytics",
    //     "Template library and saving options",
    //   ],
    // },
  ]

  const experiences = [
    {
      title: "Software Engineer",
      company: "I-Exceed Technology & Solutions",
      period: "2024 - Present",
      description:
        "Led the frontend development team in building responsive web applications. Implemented modern UI/UX practices and improved performance by 40%. Developed and maintained full-stack applications for enterprise clients. Collaborated with design and product teams to deliver high-quality software solutions.",
      skills: ["React", "TypeScript", "Next.js", "React Native", "SQL", "Java", "Spring Boot", "Tailwind CSS"],
    },
    {
      title: "Senior System Associate",
      company: "Infosys PVT LTD",
      period: "2022 - 2024",
      description:
        "Created responsive websites and web applications for various clients. Worked closely with designers to implement pixel-perfect interfaces.",
      skills: ["HTML", "CSS", "JavaScript", "jQuery","React", "TypeScript"],
    }
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
    { name: "React", percentage: 80, color: "#d946ef" },
    { name: "TypeScript", percentage: 75, color: "#67e8f9" },
    { name: "JavaScript", percentage: 85, color: "#954ce9" },
    { name: "Next.js", percentage: 80, color: "#d946ef" },
    { name: "React Native", percentage: 70, color: "#954ce9" },
    { name: "Java", percentage: 65, color: "#67e8f9" },
  ]

  return (
    <div className="min-h-screen bg-background custom-scrollbar">
      {/* Add the splash screen with your name */}
      <SplashScreen name="Pritesh" />
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
              <motion.a
                href="#experience"
                className="px-6 py-3 text-lg font-semibold rounded-full glow-effect bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                View My Work
              </motion.a>
              <motion.a
                href="#contact"
                className="px-6 py-3 text-lg font-semibold rounded-full glass-effect bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Contact Me
              </motion.a>
            </motion.div>
            <motion.div
              variants={fadeIn}
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            >
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
      <section ref={aboutRef} className="py-20 px-4 bg-muted/30 backdrop-blur-sm relative clip-path-slant" id="about" style={{ paddingBottom: "120px" }}>
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
                <Image
                    src={profilePic}
                    alt="Picture of the author"
                    // className="w-full h-full object-cover"
                    // width={500} automatically provided
                    // height={500} automatically provided
                    // blurDataURL="data:..." automatically provided
                    // placeholder="blur" // Optional blur-up while loading
                      />
              </div>
              <motion.div
                className="absolute -bottom-6 -right-6 bg-gradient-to-r from-primary to-secondary text-primary-foreground p-4 rounded-lg shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 10 }}
              >
                <p className="font-bold">3+ Years Experience</p>
              </motion.div>
            </motion.div>
            <motion.div variants={fadeIn} className="space-y-6">
              <p className="text-lg">
                I'm a passionate web developer with over 3 years of experience building modern web applications. I
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
          {/* Tech Stack Section */}
          <section id="tech-stack" ref={techStackRef} className="py-20 px-4 relative">
            <div className="container max-w-6xl mx-auto">
              <TechStack />
            </div>
          </section>
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
          <ExperienceTimeline experiences={experiences} allSkills={skills} />
        </motion.div>
      </section>



      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="py-20 px-4 relative">
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gradient-static">Let's Connect</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm open to new opportunities in frontend development. Feel free to connect with me!
            </p>

            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <motion.a
                href="https://www.facebook.com/pritesh.sahoo.90"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-[#1877F2]/10 hover:bg-[#1877F2]/20 transition-colors border border-[#1877F2]/20 group"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook className="w-8 h-8 text-[#1877F2] group-hover:animate-pulse" />
                <span className="sr-only">Facebook</span>
              </motion.a>

              <motion.a
                href="https://x.com/Pritesh19381772"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 transition-colors border border-[#1DA1F2]/20 group"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter className="w-8 h-8 text-[#1DA1F2] group-hover:animate-pulse" />
                <span className="sr-only">Twitter</span>
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/pritesh-kumar-sahoo-590a66230/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 transition-colors border border-[#0A66C2]/20 group"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-8 h-8 text-[#0A66C2] group-hover:animate-pulse" />
                <span className="sr-only">LinkedIn</span>
              </motion.a>

              <motion.a
                href="https://www.instagram.com/__pritesh_/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-[#E4405F]/10 hover:bg-[#E4405F]/20 transition-colors border border-[#E4405F]/20 group"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram className="w-8 h-8 text-[#E4405F] group-hover:animate-pulse" />
                <span className="sr-only">Instagram</span>
              </motion.a>

              <motion.a
                href="mailto:priteshkumarsahoo16@gmail.com"
                className="p-4 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors border border-primary/20 group"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-8 h-8 text-primary group-hover:animate-pulse" />
                <span className="sr-only">Email</span>
              </motion.a>

              <motion.a
                href="https://github.com/pritesh123-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-[#333]/10 hover:bg-[#333]/20 transition-colors border border-[#333]/20 group dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/20"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-8 h-8 text-[#333] dark:text-white group-hover:animate-pulse" />
                <span className="sr-only">GitHub</span>
              </motion.a>
            </div>

            <motion.div
              className="mt-12 text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p>
                Or send me an email directly at{" "}
                <a href="mailto:priteshkumarsahoo16@gmail.com" className="text-primary hover:underline">
                priteshkumarsahoo16@gmail.com
                </a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10 backdrop-blur-sm">
        <div className="container max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground">© {new Date().getFullYear()} Pritesh Kumar Sahoo. All rights reserved.</p>
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






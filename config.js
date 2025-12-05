import { FaDiscord, FaGithub, FaMapPin } from "react-icons/fa";
import { HiCode, HiCube, HiDatabase, HiMail, HiBriefcase } from "react-icons/hi";

export const config = {
    developer: {
        name: "Ashon",
    },
    social: {
        github: "ashonbaiju",
        discord: "#"
    },
    NAV_ITEMS: [
        { href: '/projects', label: 'Projects' },
        { href: '/contact', label: 'Contact' }
    ],
    recentTracks: true, // Enable/disable Spotify recent tracks
    projects: [
  {
    id: 1,
    title: "My Resume – Minimal Portfolio",
    description:
      "A clean one-page resume website built to showcase my skills, education, and projects with a responsive layout.",
    image: "https://github.com/ashonbaiju/my-resume/blob/main/assets/images/kiridam.jpg?raw=true",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    github: "https://github.com/ashonbaiju/my-resume",
    demo: "#", // update later if you host it
  },
  {
    id: 2,
    title: "Personal Portfolio – v4 (Camcall / Dev Portfolio)",
    description:
      "A modern developer portfolio built on top of Huzaif Ahmed's template, customized with my own tech stack, animations, and branding.",
    image: "https://play-lh.googleusercontent.com/7CEb0nQ0LrDv1DqqS5vVyMJ0po5spOiIyjjKoN-Kq5LABNzrtvAznj6y5QIBzRwAyGbI",
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/ashonbaiju", // or your fork
    demo: "#", // your deployed link (Vercel / Netlify)
  },
  {
    id: 3,
    title: "OldSyllabus ",
    description:
      "A concept webh a clean, mobile-first UI.",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAAAAABXZoBIAAAAzUlEQVR4AczRIRCDIBQGYOuyzbxgNdLsxWaiW4kWOz2Y7cVkMxMsZpKVRiTA3b/b7bY9mPa99t93/LyD7A+mlO2ltYKzc2lm472Wxa/kg0Vw1nlgSrlccIzPRjYZqFuMK+bq3b5himzAmn8COwKnaFxFUgdFksASFVlT0xt5hKOX33AgeQuoa2TYrrGhJzVYhJIuOGOM8HADWSAYahzmTuJOewqbFFlsdf4i4aCSX9l9UFJ0YtSwa5bOoLRxwRm9dtnJMN7LnleP0TydAgB5cmlbClPjvgAAAABJRU5ErkJggg==",
    technologies: ["React", "Tailwind CSS", "Firebase"],
    github: "#", // add when repo is ready
    demo: "#",
  },
  {
    id: 4,
    title: "AdFlow – Ad Reward Concept App",
    description:
      "A concept model where users watch ads 24/7 and earn a share of the ad revenue, with a simple UI focused on user earnings.",
    image: "/projects/adflow.webp",
    technologies: ["Flutter", "Firebase", "Figma"],
    github: "#",
    demo: "#",
  },
  {
    id: 5,
    title: "Resume Builder Web App",
    description:
      "A resume builder that supports ATS-friendly templates for tech and non-tech users, with options to download as PDF and DOCX.",
    image: "/projects/resume-builder.webp",
    technologies: ["React", "Tailwind CSS", "Node.js"],
    github: "#",
    demo: "#",
  },
  {
    id: 6,
    title: "Image Hex Converter",
    description:
      "A developer tool that converts images to hexadecimal format for use in low-level graphics, embedded systems, or styling experiments.",
    image: "/projects/image-hex-converter.webp",
    technologies: ["Python", "Pillow", "CLI"],
    github: "https://github.com/ashonbaiju/Image-Hex-Converter", // if repo exists / when you create it
    demo: "#",
  },
  {
    id: 7,
    title: "Voice FX – Termux Voice Changer",
    description:
      "A Termux-based experiment that processes microphone input and applies real-time voice effects, aiming to change the voice (e.g., to a female tone).",
    image: "/projects/voice-fx.webp",
    technologies: ["Termux", "Python", "FFmpeg"],
    github: "#",
    demo: "#",
  },
  {
    id: 8,
    title: "Branding & Graphics – Julebi, OldSyllabus & VVS.EDU",
    description:
      "Logo design, posters, and marketing creatives for brands like Julebi, OldSyllabus, and VVS.EDU, including social media assets and ad graphics.",
    image: "/projects/branding-collection.webp",
    technologies: ["Adobe Photoshop", "Illustrator", "Figma", "Canva"],
    github: "#",
    demo: "#",
  },
    ],


    skills: [
        {
            title: "Frontend",
            icon: <HiCode />,
            description: "Modern web interfaces",
            bgClass: "bg-blue-500/10",
            iconClass: "text-blue-500",
            skills: [
                { name: "Next.js 15", level: "Advanced", hot: true },
                { name: "React", level: "Advanced" },
                { name: "TailwindCSS", level: "Expert" },
                { name: "JavaScript", level: "Advanced" },
                { name: "Framer Motion", level: "Intermediate" }
            ]
        },
        {
            title: "Backend",
            icon: <HiDatabase />,
            description: "Server & Database",
            bgClass: "bg-emerald-500/10",
            iconClass: "text-emerald-500",
            skills: [
                { name: "Node.js", level: "Advanced", hot: true },
                { name: "MongoDB", level: "Advanced" },
                { name: "Express.js", level: "Advanced", hot: true }
            ]
        },
        {
            title: "Programs & Tools",
            icon: <HiCube />,
            description: "Development & Productivity Tools",
            bgClass: "bg-orange-500/10",
            iconClass: "text-orange-500",
            skills: [
                { name: "VS Code", level: "Expert", hot: true },
                { name: "Postman", level: "Advanced" },
                { name: "Photoshop", level: "Intermediate" },
                { name: "Git", level: "Advanced" }
            ]
        }
    ],
    experiences: [
        {
            position: "Frontend Developer",
            company: "SelectSkillSet",
            period: "2024 - Present",
            location: "Remote",
            description: "Developing modern, responsive frontend applications with focus on user experience and performance. Working with cutting-edge technologies to build scalable web solutions.",
            responsibilities: [
                "Building responsive and interactive user interfaces using React and Next.js",
                "Implementing modern UI/UX designs with TailwindCSS and Framer Motion",
                "Optimizing application performance and ensuring cross-browser compatibility",
                "Collaborating with design and backend teams to deliver high-quality features"
            ],
            technologies: ["React", "Next.js", "TailwindCSS", "JavaScript", "Framer Motion", "TypeScript"]
        },
        {
            position: "Full Stack Developer",
            company: "Tekisky",
            period: "2023 - 2024",
            location: "Remote",
            description: "Developed and maintained full-stack web applications, working on both frontend and backend systems. Collaborated with cross-functional teams to deliver robust software solutions.",
            responsibilities: [
                "Developed and maintained full-stack web applications using React, Node.js, and MongoDB",
                "Implemented RESTful APIs and integrated third-party services",
                "Built responsive user interfaces and optimized application performance",
                "Worked on database design and backend architecture"
            ],
            technologies: ["React", "Node.js", "MongoDB", "Express", "JavaScript", "MERN Stack"]
        }
    ],
    contactInfo: [
     
        {
            icon: <FaGithub className="w-5 h-5" />,
            label: "GitHub",
            value: "@ashonbaiju",
            link: `https://github.com/ashonbaiju`
        },
        {
            icon: <HiMail className="w-5 h-5" />,
            label: "Email",
            value: "ashonbaiju123@gmail.com",
            link: "mailto:ashonbaiju123@gmail.com"
        },
        {
            icon: <FaMapPin className="w-5 h-5" />,
            label: "Location",
            value: "India",
            link: null
        }
    ]
}
import { FaDiscord, FaGithub, FaMapPin, FaInstagram, FaLinkedin } from "react-icons/fa";
import { HiCode, HiCube, HiDatabase, HiMail, HiBriefcase } from "react-icons/hi";

export const config = {
    developer: {
        name: "Ashon",
    },
    social: {
        github: "ashonbaiju",
        discord: "#",
        instagram: "https://www.instagram.com/ashon_baiju/",
        linkedin: "https://www.linkedin.com/in/ashon-baiju-995640301/"
    },
    NAV_ITEMS: [
        { href: '/projects', label: 'Projects' },
        { href: '/contact', label: 'Contact' }
    ],
    recentTracks: true, // Enable/disable Spotify recent tracks
    projects: [
      {
        id: 1,
        title: "My Resume",
        description: "A clean, minimal, and fully modern resumé and portfolio template created to showcase skills and experience.",
        image: "https://github.com/ashonbaiju/my-resume/blob/main/assets/images/kiridam.jpg?raw=true",
        technologies: ["HTML", "CSS", "JavaScript"],
        github: "https://github.com/ashonbaiju/my-resume",
        demo: "https://github.com/ashonbaiju/my-resume",
      },
      {
        id: 2,
        title: "Ashon Baiju Portfolio",
        description: "My personal developer portfolio built with Next.js, Tailwind CSS, Framer Motion, and customized modern animations.",
        image: "https://play-lh.googleusercontent.com/7CEb0nQ0LrDv1DqqS5vVyMJ0po5spOiIyjjKoN-Kq5LABNzrtvAznj6y5QIBzRwAyGbI",
        technologies: ["Next.js", "React", "Tailwind CSS"],
        github: "https://github.com/ashonbaiju/ashon-baiju",
        demo: "https://github.com/ashonbaiju/ashon-baiju",
      },
      {
        id: 3,
        title: "Ziya Designs",
        description: "Creative branding, logo design, and visual styling repository containing various premium design assets.",
        image: "/projects/project-1.webp",
        technologies: ["Design", "Branding", "UI/UX"],
        github: "https://github.com/ashonbaiju/ziyadesigns1",
        demo: "https://github.com/ashonbaiju/ziyadesigns1",
      },
      {
        id: 4,
        title: "Camcall Platform",
        description: "Modern web platform enabling high-quality business consultation and communication services with seamless UX.",
        image: "/projects/project-2.webp",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
        github: "https://github.com/ashonbaiju/camcall",
        demo: "https://camcall.in/",
      },
      {
        id: 5,
        title: "Image Hex Converter",
        description: "A developer tool that converts images to hexadecimal format for use in low-level graphics or styling experiments.",
        image: "/projects/project-3.webp",
        technologies: ["Python", "OpenCV", "CLI"],
        github: "https://github.com/ashonbaiju/image-hex-converter",
        demo: "https://github.com/ashonbaiju/image-hex-converter",
      },
      {
        id: 6,
        title: "Julebi Seller App",
        description: "A multi-seller marketplace experience focused on sellers managing products, orders and offers in a clean interface.",
        image: "/projects/project-4.webp",
        technologies: ["Flutter", "REST API", "Firebase"],
        github: "#",
        demo: "https://play.google.com/store/apps/details?id=com.seller.julebi&hl=en",
      },
      {
        id: 7,
        title: "OldSyllabus Platform",
        description: "A local services platform where people can list and discover skills, tuition and services with a focus on simplicity and clarity.",
        image: "/projects/project-5.webp",
        technologies: ["React Native", "Firebase", "UI/UX"],
        github: "#",
        demo: "https://play.google.com/store/apps/details?id=com.oldsyllabusprovider.vr&hl=en",
      }
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
        },
        {
            icon: <FaLinkedin className="w-5 h-5" />,
            label: "LinkedIn",
            value: "Ashon Baiju",
            link: "https://www.linkedin.com/in/ashon-baiju-995640301/"
        },
        {
            icon: <FaInstagram className="w-5 h-5" />,
            label: "Instagram",
            value: "@ashon_baiju",
            link: "https://www.instagram.com/ashon_baiju/"
        }
    ]
}
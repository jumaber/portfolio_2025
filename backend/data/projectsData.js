export const projects = {
  lensConfig: {
    slug: "lens-config",
    title: "Redesigning the Lens Configuration Page",
    subtitle: "Mister Spex",
    location: "Berlin, Germany",
    period: "2022/2023",
    link: "https://www.misterspex.de",
    description:
      "Mister Spex is one of Europe’s leading online opticians. As a digital-first company, delivering a smooth and cohesive online shopping experience is essential.\n\nHowever, the Lens Configuration Page—where customers select and customize their lenses—was outdated. It was weighed down by technical legacy, limiting UX improvements and hindering marketing flexibility. Visually, it no longer aligned with the updated design system used across the rest of the site. In addition, the mobile and desktop versions were built on separate codebases, making updates inefficient and preventing a truly responsive, unified experience.\n\nI was responsible for the complete redesign of this critical page. It represents the most complex step in the shopping journey—both from UX and development perspectives—and the most decisive moment in the purchase process. My goal was to modernize the UI, unify the experience across devices and touchpoints, and lay the groundwork for improved performance, scalability, and future experimentation.",
    introImage: "/src/assets/GOP.png",
    hero: "/src/assets/hero-gop.png",
    challenges: [
      "How can we deliver maximum UX impact with minimal development effort?",
      "How can we create a unified, scalable solution that works across all customer journeys?",
      "How can we simplify the 6-step lens configuration into a smooth, intuitive flow that improves conversion?",
    ],
    process: [
      {
        phase: "Discover",
        highlights: [
          "Held alignment sessions with C-level stakeholders, Product Owner, and Design Manager to define business goals and expectations.",
          "Collaborated with the Developer Team to understand technical constraints and legacy challenges.",
          "Conducted interviews with internal teams—operations, customer service, marketing, and data science—to surface diverse needs and customer insights.",
          "Analyzed competitors at both local and international levels to benchmark UX patterns and uncover differentiation opportunities.",
          "Audited the existing Lens Configuration Page through a design inventory and heuristic evaluation, reviewing past research, A/B tests, and usability findings.",
          "Ran remote usability tests to uncover real user pain points in the current experience.",
        ],
      },
      {
        phase: "Define",
        highlights: [
          "Although the initial direction for the UX and UI was set by management and design leadership without developer input, I worked to bridge this gap by aligning the design vision with technical feasibility and team understanding.",
          "Mapped out the full user journey—including edge cases—and connected each step to behavioral and funnel data to pinpoint drop-off points and success moments.",
          "Synthesized research findings to identify key UX challenges and define primary and secondary user needs across the 6-step lens configuration flow.",
          "Collaborated with developers to explain the rationale behind design decisions, advocate for user-focused adjustments, and co-define feasible solutions as the project evolved.",
          "Aligned with stakeholders on a clear problem statement and success criteria to guide design and development efforts.",
        ],
      },
      {
        phase: "Develop",
        highlights: [
          "Defined a clear MVP in collaboration with developers and our Product Owner, including a technical spike to evaluate the most feasible UX solution for navigating the 6-step flow.",
          "Designed and prototyped several variations of the 6-step flow to support different customer journeys, validating and refining them through team collaboration and testing.",
          "Entered an iterative build–test–refine cycle, shifting from hand-offs to close collaboration and shared decision-making with both devs and the PO.",
          "Co-prioritized work based on UX impact, technical constraints, and business goals, adjusting designs as needed.",
          "Released and tested solutions incrementally, using usability feedback, internal QA, and analytics (despite some data limitations) to guide improvements.",
          "Established a strong team rhythm where designers, developers, and the PO jointly defined what to build next.",
          "Stepped in to modify React components and reduce dev load when last-minute design changes created delivery pressure.",
        ],
      },
      {
        phase: "Deliver",
        highlights: [
          "Led the analysis of rollout options and aligned with stakeholders on releasing a single, complete MVP as the most effective strategy.",
          "Delivered a fully functional 6-step configuration flow with integrated marketing promotions, prioritizing a complete customer experience.",
          "Scoped out internal tools (e.g. store-facing version) and country-specific variations for future iterations to keep the MVP focused.",
          "Tested post-launch iterations to validate UX improvements, refine content, and adjust interactions based on user behavior and performance data.",
          "Contributed new components to the Design System based on the Lens Configuration Page needs, ensuring reusability across the UI and consistency throughout the experience.",
        ],
      },
    ],
    outcomes: [
      "Increased conversion rate on the Lens Configuration step by 2% after launch, contributing to overall revenue growth.",
      "Reduced drop-off between steps 3–6 by 11%, significantly improving flow completion rates.",
      "Delivered a new Lens Configuration Page that halved dev effort for future changes and reduced maintenance costs by unifying mobile and desktop into a single responsive codebase.",
      "Set up ongoing user testing in English and German with UserTesting.com and Dovetail, enabling 3 research cycles per month to guide A/B tests and UX decisions.",
    ],
    learnings: [
      "Never let egos get in the way of the project’s goals. User experience, development efficiency, and business outcomes should always come first.",
      "Collaborate closely with developers—and with your Product Owner—especially in long and complex projects. Shared planning and decision-making are key to success.",
      "Stay flexible. The best UX on paper isn’t always the right solution in practice. Sometimes the best outcome is the one that’s feasible, fast to build, and still delivers value.",
      "Customer Service is your ally. They’re on the front line with users, and their insights are invaluable for understanding real pain points and expectations.",
      "A smooth process isn’t enough. Mutual respect, realistic expectations, and cross-team alignment are what truly make a project succeed.",
    ],
    wireframes: [
      "/src/assets/image-1.png",
      "/src/assets/image-2.png",
      "/src/assets/image-8.png",
      "/src/assets/image-9.png",
      "/src/assets/image-3.png",
      "/src/assets/image-4.png",
    ],
  },
  loginRedesign: {
    slug: "login-redesign",
    title: "Streamlining Log in & Sign Up with Auth0",
    subtitle: "Mister Spex",
    location: "Berlin, Germany",
    period: "2022/2023",
    link: "https://www.misterspex.de",
    description:
      "We set out to redesign the Log in and Sign-up flow for Mister Spex to improve usability, reduce support tickets, and limit development overhead by using a third-party provider (Auth0).\n\nI led the UX exploration of all user scenarios—from simple sign-ins to session timeouts mid-flow—aiming to create a clean, consistent, and efficient authentication experience.",
    introImage: "/src/assets/login-hero.png",
    hero: "/src/assets/login-hero-full.png",
    challenges: [
      "How can we modernize the login & sign-up experience without creating ongoing development overhead?",
      "How can we design a flexible authentication flow that adapts to all user scenarios?",
      "How can we ensure a seamless user journey even when design trade-offs are made?",
    ],
    process: [
      {
        phase: "Discover",
        highlights: [
          "Benchmarked third-party login providers.",
          "Audited current flows for inconsistencies and points of friction.",
          "Conducted interviews with developers, Auth0 representatives, and internal stakeholders to understand technical constraints, integration complexity, and business expectations.",
          "Explored user pain points around session timeouts and mid-flow logins.",
        ],
      },
      {
        phase: "Define",
        highlights: [
          "Mapped every entry and exit point across the product where users might encounter authentication.",
          "Identified critical flows (e.g., mid-configuration login) requiring extra care.",
          "Prioritized reducing user frustration and drop-off without adding developer workload.",
        ],
      },
      {
        phase: "Develop",
        highlights: [
          "Designed multiple variants of the login/sign-up screens tailored to different use cases.",
          "Created visual UI aligned with the new design system.",
          "Explored custom Auth0 templates to deliver flexibility without overcomplicating integration.",
          "Prototyped all regular cases and edge-case flows.",
        ],
      },
      {
        phase: "Deliver",
        highlights: [
          "Delivered design specs and flow documentation.",
          "Collaborated with devs on feasibility.",
          "Project direction changed: the decision was made (without involving the design team) to stick with the default Auth0 implementation and our own UI.",
          "As a result, most of the custom UX work was not implemented—but the solution went live quickly and with minimal dev cost.",
        ],
      },
    ],
    outcomes: [
      "20% increase in sign-ups after implementation.",
      "Reduced drop-off in login-related journeys (e.g., mid-configuration flow).",
      "Lowered support inquiries by simplifying flows and using reliable, third-party authentication.",
      "Minimized engineering effort by using Auth0’s default templates with minimal overrides.",
    ],
    learnings: [
      "Start technical alignment early when using external tools like Auth0—it’s critical to know what’s feasible.",
      "Don’t over-design flows you can’t implement: align priorities with product and engineering continuously.",
      "Even if not all design work is used, the process helps clarify user needs and business trade-offs.",
    ],
    wireframes: [
      "/src/assets/login-wire-1.png",
      "/src/assets/login-wire-2.png",
      "/src/assets/login-wire-3.png",
      "/src/assets/login-wire-4.png",
      "/src/assets/login-wire-5.png",
    ],
  },
  emailTemplates: {
    slug: "email-templates",
    title: "Redesigning the Email Templates with Emarsys",
    subtitle: "Mister Spex",
    location: "Berlin, Germany",
    period: "2022",
    link: "https://www.misterspex.de",
    description:
      "Redesign the company’s marketing emails to match the visual language of the MSX product, improve consistency and accessibility, and build a flexible, documented component system for future scalability.",
    introImage: "/src/assets/email-hero.png",
    hero: "/src/assets/email-hero-full.png",
    challenges: [
      "How can we modernize the look and feel of our marketing emails without increasing complexity for the marketing team?",
      "How can we create flexible, reusable components that support a wide range of campaign needs?",
      "How can we ensure emails render consistently across the most commonly used — and most limited — email clients?",
    ],
    process: [
      {
        phase: "Discover",
        highlights: [
          "Aligned closely with the marketing campaign manager to understand real needs.",
          "Reached out to the Emarsys team to understand how their builder worked and what limitations existed.",
        ],
      },
      {
        phase: "Define",
        highlights: [
          "Grouped all marketing emails into functional categories (newsletters, promotions, seasonal campaigns, etc.).",
          "Identified and defined all necessary content components (e.g. banners, product blocks, headers, CTAs).",
          "Scoped technical constraints and timelines in collaboration with Emarsys.",
          "Defined accessibility and brand requirements, including support for dark mode and responsive design.",
        ],
      },
      {
        phase: "Develop",
        highlights: [
          "Researched which email clients our users were using most (e.g., Outlook, Gmail, Apple Mail).",
          "Investigated client-specific quirks (e.g., limited CSS support in Outlook) to inform design decisions.",
          "Audited current emails for tone, visual consistency, and accessibility gaps.",
        ],
      },
      {
        phase: "Deliver",
        highlights: [
          "Delivered final designs and documentation to the marketing team and Emarsys.",
          "Handed over a fully documented component library for scalable use.",
          "Ensured marketing could build new emails independently while staying on brand and accessible.",
          "Laid the groundwork for future redesigns of non-marketing emails using the same system.",
        ],
      },
    ],
    outcomes: [
      "Faster & easy to use components on Emarsys for Marketing Managers.",
      "A modern, component-based email design system used across marketing campaigns.",
      "First-time rollout of dark mode support in emails at MSX.",
      "Improved accessibility through better contrast and simplified layouts.",
      "The email inventory initiative kicked off the redesign of transactional and system emails.",
    ],
    learnings: [
      "Email client behavior matters: how users see emails depends on their email client — it’s essential to design for the lowest common denominator.",
      "Documentation is powerful: giving non-design teams the right tools can multiply design impact.",
      "Starting small (with marketing) can open the door for bigger, systemic improvements across the organization.",
      "Collaborating cross-functionally is essential when design decisions touch external platforms like Emarsys.",
    ],
    wireframes: [
      "/src/assets/email-wire-1.png",
      "/src/assets/email-wire-2.png",
      "/src/assets/email-wire-3.png",
      "/src/assets/email-wire-4.png",
      "/src/assets/email-wire-5.png",
      "/src/assets/email-wire-6.png",
    ],
  },
  linsenpate: {
    slug: "linsenpate",
    title: "Redesigning linsenpate.de",
    subtitle: "Linsenpate",
    location: "Berlin, Germany",
    period: "2021",
    link: "https://www.linsenpate.de",
    description:
      "Linsenpate is a German e-commerce website for contact lenses and related products. It stands out for its name and the story behind the Patenfamilie, which gives the brand charm and creates curiosity. They keep low prices, fast deliveries and safe shopping. From 2021, they also offer a contemporary UI and a user-friendly UX.\n\nMy goal was to redesign linsenpate.de while keeping its brand identity, using the structure from its sister site lensit.no, adapting it to the German market, aligning the checkout with Shopify, and merging German with Italian to retain the brand’s bilingual narrative.",
    introImage: "/src/assets/linsenpate-hero.png",
    hero: "/src/assets/linsenpate-hero-full.png",
    challenges: [
      "How can we preserve the quirky brand story while redesigning for better UX?",
      "How can we reuse structure from another market (Lensit) while adapting it for German users?",
      "How can we align designs with Shopify’s technical constraints?",
    ],
    process: [
      {
        phase: "Discover",
        highlights: [
          "Explored the existing linsenpate.de site and IA reference lensit.no.",
          "Received access to Lensit's design materials to learn existing design patterns.",
        ],
      },
      {
        phase: "Define",
        highlights: [
          "Applied mobile-first principles to create four high-fidelity designs for mobile and desktop.",
          "Sent daily progress updates via email to the Product Owner, raising questions proactively.",
          "Held daily 30-minute standups to resolve blockers and gather key market insights.",
        ],
      },
      {
        phase: "Develop",
        highlights: [
          "Adapted UI to German cultural expectations based on research insights.",
          "Incorporated feedback from the marketing department into the final screens.",
          "Introduced Italian words playfully within German text to enhance the bilingual brand story.",
        ],
      },
      {
        phase: "Deliver",
        highlights: [
          "Created a set of marketing newsletters using the new UI and existing templates.",
          "Delivered a structured design system and components page for future use by the team.",
        ],
      },
    ],
    outcomes: [
      "Delivered a redesigned UI that respected the brand’s bilingual charm and improved UX.",
      "Accelerated communication and decision-making through daily async + sync check-ins.",
      "Set the foundation for future scalability with a design system and reusable components.",
    ],
    learnings: [
      "Daily async updates combined with focused standups streamline design alignment.",
      "Cultural adaptation adds depth to international storytelling—language matters.",
      "Good reference designs accelerate delivery, but thoughtful adaptation is key.",
    ],
    wireframes: [
      "/src/assets/linsenpate-wire-1.png",
      "/src/assets/linsenpate-wire-2.png",
      "/src/assets/linsenpate-wire-3.png",
      "/src/assets/linsenpate-wire-4.png",
    ],
  },
  setting: {
    slug: "setting",
    title: "Redesigning Setting.io",
    subtitle: "Setting HQ",
    location: "Berlin, Germany",
    period: "2020–2021",
    link: "https://www.setting.io",
    description:
      "Setting HQ is the leading office marketplace for startups, scaleups, and innovators. Their mission is to identify a space that perfectly matches a company’s unique personality and culture—creating a custom solution for the team.\n\nIn Summer 2020, Setting contacted me to redesign their website. Working directly with the CEO, a UX Writer, and the development team, we aimed to communicate the company's maturity and automate processes both internally and externally. The new design launched in Spring 2021, reflecting a more established and complete service.",
    introImage: "/src/assets/setting-hero.png",
    hero: "/src/assets/setting-hero-full.png",
    challenges: [
      "How can we communicate the services to create new and better leads?",
      "How can we display the values and company culture to attract suitable candidates?",
      "How can we transmit trust and value to the provided service?",
    ],
    process: [
      {
        phase: "Discover",
        highlights: [
          "Conducted discussions with the CEO and various team members to understand motivations, goals, and vision.",
          "Identified user types through conversations and created proto-personas.",
          "Performed competitor analysis to benchmark industry standards.",
        ],
      },
      {
        phase: "Define",
        highlights: [
          "Created paper sketches to explore initial design concepts.",
          "Developed grey-scale wireframes for mobile and desktop pages to establish layout and structure.",
          "Applied UI designs to the wireframes, ensuring responsiveness across devices.",
        ],
      },
      {
        phase: "Develop",
        highlights: [
          "Prototyped mobile and desktop versions to visualize user interactions.",
          "Compiled a comprehensive Design System for consistent implementation.",
          "Collaborated with developers for hand-off and iterative design revisions.",
          "Defined tone and picture concepts to guide professional photography.",
        ],
      },
      {
        phase: "Deliver",
        highlights: [
          "Launched the redesigned website, communicating a more mature and complete service.",
          "Continued to test, analyze, and develop features, such as an improved dashboard for internal and external purposes.",
        ],
      },
    ],
    outcomes: [
      "Enhanced communication of services, leading to the generation of new and better leads.",
      "Improved display of company values and culture, attracting suitable candidates.",
      "Established trust and conveyed the value of services through an aesthetic and mature website design.",
    ],
    learnings: [
      "Direct collaboration with stakeholders ensures alignment with company vision and goals.",
      "Creating proto-personas aids in understanding diverse user needs and tailoring the design accordingly.",
      "Developing a Design System facilitates consistent implementation and scalability.",
    ],
    wireframes: [
      "/src/assets/setting-wire-1.png",
      "/src/assets/setting-wire-2.png",
      "/src/assets/setting-wire-3.png",
      "/src/assets/setting-wire-4.png",
      "/src/assets/setting-wire-5.png",
    ],
  },
  designFriends: {
    slug: "design-friends",
    title: "Design+Friends",
    subtitle: "Designer Community & Responsive Website",
    location: "Berlin, Germany",
    period: "2020–2021",
    link: "https://designfriends.netlify.app", // Replace if needed
    description:
      "During the Corona Pandemic, I realized most designer meetups in Berlin had gone quiet. Bringing my event management and community-building background, I decided to start a local designer community: Design+Friends.\n\nSince August 2020, I’ve organized monthly meetups and talks for designers in Berlin—on Zoom during the colder months, and in-person when safe. Our communication runs via Slack, Mailchimp newsletters, and our own website.\n\nThe result is a responsive, Bootstrap-powered website that works across all major viewports and browsers, hosted securely and for free using Github and Netlify.",
    introImage: "/src/assets/dfriends-hero.png",
    hero: "/src/assets/dfriends-hero-full.png",
    challenges: [
      "How to communicate who we are, what we do, and how to join the monthly events?",
      "How to identify the needs of our users and adapt the meetups accordingly?",
      "How to create a responsive website that works on all viewports and browsers using Bootstrap, HTML, CSS, and JavaScript?",
    ],
    process: [],
    outcomes: [
      "Launched a free, fast, secure, and fully responsive community website.",
      "Built an active network of Berlin-based designers with ongoing engagement.",
      "Learned to set up custom hosting and DNS, and became confident with Bootstrap and Netlify.",
    ],
    learnings: [
      "Free tools (Netlify, Github, Mailchimp, Slack) can go a long way when used strategically.",
      "Community building benefits from clear communication, visibility, and regular rhythm.",
      "Usability testing—even on small personal projects—makes a big difference in clarity and trust.",
    ],
    wireframes: [
      "/src/assets/dfriends-wire-1.png",
      "/src/assets/dfriends-wire-2.png",
      "/src/assets/dfriends-wire-3.png",
      "/src/assets/dfriends-wire-4.png",
    ],
  },
};

export default projects;  

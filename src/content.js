export const defaultContent = {
  profile: {
    name: 'jyous',
    role: 'student / builder',
    location: '',
    tagline: 'building until the idea makes sense.',
    intro:
      'I’m jyous. I build things because I want to understand them properly. Study tools, browser extensions, data projects, and the occasional app that gets much bigger than it was meant to.',
    about:
      `I used to think a note had to arrive with a conclusion attached. Now I think the unfinished version is usually more useful.

The page gives an idea somewhere to sit. Once it is outside my head, I can look at it from a small distance. Sometimes it gets clearer. Sometimes it becomes a question instead.

Both outcomes are progress.`,
    avatarUrl: '/home-photo.png',
    avatarCaption: 'Scott Monument, Edinburgh',
    currentNotes: [
      'making Beean feel good enough to use every day',
      'building Revisely around real exam papers, not a toy demo',
      'trying to understand chaos with a double pendulum',
    ],
    links: [
      { label: 'github', href: 'https://github.com/jyoush' },
      { label: 'beean', href: 'https://beean.app' },
    ],
  },
  projects: [
    {
      id: 'beean',
      title: 'Beean',
      year: '2026',
      description:
        "Ported my brother's iOS café app to Android using Flutter, picking up 200+ users along the way.",
      details:
        `## how it started
My brother wrote Beean in Swift for iOS first. Once people started using it, I took on the Android side and rebuilt the frontend in Flutter from the ground up. Between Reddit and word of mouth, we ended up getting around 200 active users and 100k+ views across our launch posts.

## the flutter rewrite
The iOS app was my reference point because I wanted the Android build to feel identical, not like a cheap knockoff. Under the hood it's Flutter + Riverpod for state, Firebase for auth/database, and Mapbox pulling café locations via Overpass queries on OpenStreetMap. Added the usual stuff too: review feeds, passport stamps, and user stories.

## mapbox was a nightmare
The hardest bug by far was custom map pins. On iOS you just use MapViewAnnotation, but Flutter's Mapbox plugin didn't have an equivalent that performed well. My first attempt was floating Flutter widgets in a Stack over the map canvas, but it lagged terribly and drifted every time you panned. Fixed it by rendering cards to rasterized style images inside a native symbol layer, with a 150-slot LRU cache so the phone wouldn't run out of memory.

## other weird bugs
Google Sign-in kept failing in production with DEVELOPER_ERROR 10 even though debug builds worked fine. Turned out Google Play App Signing generates a brand new SHA-1 fingerprint that wasn't in our Firebase console. Regenerated google-services.json and it finally sorted itself out.

Also had to fix a Firestore timestamp bug that silently crashed the comment section. I wrote a ton of integration tests after that, ending up with over 600 tests by the time we shipped.`,
      tags: ['Swift', 'Flutter', 'Android', 'Firebase'],
      href: 'https://beean.app',
      linkLabel: 'beean.app',
      websiteImage: '/beean-website.png',
      image: '/beean-icon.png',
    },
    {
      id: 'revisely',
      title: 'Revisely',
      year: '2026',
      description:
        'A past-paper revision workspace with PDF annotations, question detection, and a mark-scheme tutor.',
      details:
        `## why i made this
Studying with past exam papers is annoying when you're constantly alt-tabbing between a question PDF, a mark scheme PDF, and ChatGPT for explanations. Revisely puts all three on one screen. You upload an exam paper, it splits out the questions, and you write your answers right on the PDF using a stylus or keyboard.

## the tech setup
Built with Next.js, TypeScript, PDF.js for rendering/drawing, and Supabase for auth and sync. Everything writes to IndexedDB locally first so you never lose handwriting if the Wi-Fi drops, then syncs up to Supabase in the background. You can also export the whole marked paper back out to a clean PDF with ink flattened on top.

## fighting vision models
I used local Ollama vision models (Qwen-VL) to detect question boxes on paper uploads, with OpenRouter as a fallback.

Vision models are tricky to get reliable JSON out of. Qwen would constantly dump reasoning tokens into internal tags or hallucinate wrong page numbers. I ended up disabling model thinking for structural passes, wrote a strict schema validator with automatic retry prompts, and used native PDF text bounding boxes to lock down coordinates rather than trusting the model's pixel guesses.

## the tutor
Instead of giving you a lazy chat box that just spits out the answer, the tutor gets fed the exact question text, the exam board's mark scheme, and whatever you've written down. It gives progressive hints first, points out where you dropped method marks, and walks you through the step you're stuck on.`,
      tags: ['Next.js', 'TypeScript', 'Ollama', 'Supabase', 'LLM'],
      href: 'https://github.com/jyoush/revisely',
      linkLabel: 'github',
      status: 'unfinished',
      image:
        '/revisely-logo.png',
    },
    {
      id: 'simple-tab',
      title: 'Simple Tab',
      year: '2025',
      description:
        'A fast, distraction-free Firefox start tab with bookmarks and custom wallpapers.',
      details:
        `## why i made it
I got sick of opening a new tab in Firefox and getting blasted with sponsored tiles, pocket articles, and trending news stories. I just wanted a blank canvas with the time, a search box, my pinned links, and a wallpaper that looks nice.

## keeping it minimal
It's just plain HTML, CSS, and vanilla JS using the Firefox WebExtension storage API (browser.storage.local). Everything stays on your computer. No accounts, no telemetry, no tracking, and no external servers.`,
      tags: ['Firefox', 'JavaScript', 'WebExtension'],
      href: 'https://addons.mozilla.org/en-US/firefox/addon/simpletab/',
      links: [
        {
          label: 'download',
          href: 'https://addons.mozilla.org/en-US/firefox/addon/simpletab/',
        },
        { label: 'github', href: 'https://github.com/jyoush/modernTab' },
      ],
      image: '/simple-tab-logo.png',
      gallery: [
        {
          src: '/simple-tab-home.png',
          alt: 'Simple Tab new tab page over a blue ocean background',
          caption: 'the new tab screen',
        },
        {
          src: '/simple-tab-bookmark.png',
          alt: 'Simple Tab add bookmark dialog',
          caption: 'adding a bookmark',
        },
        {
          src: '/simple-tab-settings.png',
          alt: 'Simple Tab settings panel with search and wallpaper options',
          caption: 'customising the page',
        },
      ],
      galleryTextBreakAfter: 1,
    },
    {
      id: 'auren',
      title: 'Auren',
      year: '2025',
      description:
        'Generative apparel design platform built for a stealth startup alongside a Cornell graduate, featuring conversational multi-turn AI mockups and an interactive garment canvas.',
      details:
        `## the project
I teamed up with a Cornell graduate to architect the web app and AI generation pipeline for Auren, a custom apparel platform where customers can design merch through conversational AI or an interactive canvas editor, then take it straight through to checkout.

## two-stage ai pipeline
Instead of firing one big prompt at an image model and praying for good output, we broke the AI system into two distinct stages:

First, Gemini Flash acts as the conversationalist. It interprets natural-language user requests, maintains multi-turn context (remembering whether the user is editing the front or back of a garment), enforces catalog categorization, and outputs a strict JSON schema with a normalized visualPrompt for the artist model.

Second, the visualPrompt is passed to Gemini 3 Pro (image preview) for photorealistic apparel mockups, or OpenAI's image model (gpt-image-1.5) for vector logos and badges. The system tracks active sides and automatically carries forward uploaded brand logos and design elements across conversation turns.

## custom matting & alpha isolation
Neither Gemini nor standard generative models produce true transparent backgrounds for graphics. To extract clean logos and graphics for the interactive editor without paying for third-party segmentation APIs, I wrote a custom background removal pipeline in Node using Sharp.

The artist model is prompted to render assets against a calibrated neon green canvas (#00FF00). We process the raw buffer in Sharp using pixel-threshold gating and 4-way connected-component labeling (flood fill) to identify the largest foreground island and zero out the alpha channel everywhere else. As a classical fallback, we also built a linear-space difference matting pass (comparing white vs. black backgrounds) to preserve delicate edge antialiasing.

## frontend canvas & client-side caching
The storefront is built in Next.js 14 and React 18. Alongside the AI chat, we built a full drag-and-drop canvas designer with rotatable text, logo uploads, and front/back masking overlays. Everything on the canvas is stored in normalized 0–1 coordinates so designs remain perfectly resolution-independent across mobile and desktop viewports.

To prevent hitting localStorage's 5MB cap with high-res design snapshots, we wired up Dexie.js (IndexedDB) with a versioned schema. Dexie stores local compressed thumbnails for instantaneous Largest Contentful Paint (LCP) while pointing directly to high-res GCS URLs, so drafts restore immediately without network lag.

## cloud infrastructure & security
To keep cold starts near ~200ms on the storefront while supporting heavy image processing, we split the monorepo into two separate Google Cloud Run microservices. The backend handles Sharp processing, GCS asset storage, and Firestore for persistent design sessions, multi-turn conversation logs, and order states. We also built defense-in-depth security with 6-layer anti-spam filtering (reCAPTCHA v3, honeypot traps, timing checks, and Upstash Redis rate limiting) plus strict server-side pricing recalculation to prevent client-side cart tampering.`,
      tags: ['Next.js', 'TypeScript', 'Gemini Pro', 'GCP', 'Sharp', 'IndexedDB'],
      href: 'https://github.com/jyoush/auren',
      links: [
        { label: 'github', href: 'https://github.com/jyoush/auren' },
        { label: 'auren.co', href: 'https://auren.co' },
      ],
      websiteImage: '/auren-website.png',
      image: '/auren-logo.png',
      gallery: [
        {
          src: '/auren-chat.png',
          alt: 'Auren conversational AI design chat',
          caption: 'conversational mockup studio',
        },
        {
          src: '/auren-editor.png',
          alt: 'Auren interactive canvas garment designer',
          caption: 'drag & drop canvas editor',
        },
      ],
      galleryTextBreakAfter: 1,
    },
  ],
  done: [
    {
      id: 'ukmt-bronze',
      title: 'Won 2× bronze UKMT awards',
      year: '',
      description: 'Two bronze awards through UKMT mathematics competitions.',
    },
    {
      id: 'qub-volunteering',
      title: 'QUB volunteering research in RAG',
      year: '',
      description: "Contributed to research at Queen's University Belfast by annotating documents for retrieval-augmented generation (RAG).",
    },
    {
      id: 'beean-users',
      title: 'Scaled Beean to 200+ users',
      year: '',
      description: 'Beean is an app for discovering, rating, and sharing cafés.',
    },
    {
      id: 'lexigram-users',
      title: 'Scaled Lexigram to 120+ users',
      year: '',
      description: 'An AI-powered IELTS tutoring app.',
    },
    {
      id: 'app-models',
      title: 'Trained models for my apps',
      year: '',
      description: 'Including the maths tutor in Revisely and image-generation parameters for Auren.',
    },
  ],
  posts: [],
  contact: {
    email: 'hello@yourname.com',
    note: 'If you are working on something thoughtful, I would be happy to hear about it.',
    prompt: 'The best way to reach me is a short email with a little context.',
  },
}

export function cloneContent(content = defaultContent) {
  return JSON.parse(JSON.stringify(content))
}

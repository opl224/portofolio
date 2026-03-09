# **App Name**: InkFolio

## Core Features:

- Project Gallery: Showcase a collection of portfolio projects with hand-drawn thumbnails and creative titles, designed to grab attention with their unique visual style.
- Project Detail Pages: Each project will have a dedicated detail page featuring comprehensive descriptions, images, and embedded media, all presented with the signature wobbly aesthetic and hand-drawn elements.
- About Me Section: A personalized section detailing the portfolio owner's skills, experience, and bio, presented in an approachable, sketchbook-like format with handwritten typography.
- Contact Form: An interactive contact form for visitors to easily send inquiries or messages, featuring distinct handwritten input fields and playfully wobbly, interactive buttons.
- Responsive Viewing: The entire portfolio will be optimized to provide a comfortable and visually consistent viewing experience across various screen sizes, ensuring mobile devices display the design system effectively.

## Style Guidelines:

- Background color: 'Warm Paper' (#fdfbf7), establishing a light, inviting, and organic base for all content.
- Primary interaction color: 'Blue Ballpoint Pen' (#2d5da1), used for interactive elements like links, buttons, and input focus states.
- Accent color: 'Red Correction Marker' (#ff4d4d), employed for striking emphasis, call-to-action elements, and playful visual annotations.
- Foreground and border color: 'Soft Pencil Black' (#2d2d2d), used for primary text and distinct borders, avoiding pure black for a more natural feel.
- Muted elements color: 'Old Paper / Erased Pencil' (#e5e0d8), subtly utilized for less prominent visual details or soft background textures.
- Headings: 'Kalam' (sans-serif, wght 700), for a bold, marker-like appearance with dramatically varied sizes to mimic emphasized notes.
- Body Text: 'Patrick Hand' (sans-serif, wght 400), ensuring legibility while maintaining an authentic, distinct handwritten feel for all textual content.
- Icons: Utilizes 'lucide-react' icons with a 'stroke-width' of 2.5 or 3 for a strong, clear line. Key icons will be enclosed within artistically rough, hand-drawn circles.
- Wobbly Borders: All primary elements (cards, buttons, containers) will feature custom, irregular 'border-radius' values (e.g., '255px 15px 225px 15px / 15px 225px 15px 255px') to eliminate straight lines and enhance the hand-drawn aesthetic.
- Playful Rotation: Small, deliberate rotations (between -2deg and 2deg) will be applied to various elements, including cards, images, and decorative accents, to create dynamic and informal compositions.
- Hard Offset Shadows: Elements will incorporate solid, unblurred 'box-shadows' (e.g., '4px 4px 0px 0px #2d2d2d') to achieve a distinctive cut-paper or layered collage effect, rejecting soft blurs.
- Authentic Textures: The body background will include a subtle 'radial-gradient' dot pattern with a 'background-size' of '24px 24px' to realistically simulate notebook paper grain.
- Responsive Design: Implements a mobile-first grid system that fluidly collapses to single columns on small screens and expands to multiple columns on larger devices, paired with generous spacing ('gap-8') for readability.
- Structured Chaos: Consistent vertical rhythm with section padding ('py-20') and content constraints ('max-w-5xl') maintain a sketchbook-like flow while embracing visual asymmetry and deliberate irregularities.
- Interactive Jiggle: Elements will exhibit a subtle 'jiggle' or small rotation effect (e.g., 'hover:rotate-1' or 'hover:-2deg') on hover for a playful and engaging user experience.
- Snappy Transitions: Uses rapid 'transition-transform duration-100' for quick and responsive feedback, such as buttons 'pressing flat' into their background by eliminating their shadow on active states.
- Subtle Decorative Motion: Key decorative elements will feature gentle, slow bounce animations (around 3 seconds duration) to add ambient vitality to the interface without being distracting.
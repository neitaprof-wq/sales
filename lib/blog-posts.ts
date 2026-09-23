export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string[]
}

// Add new posts here — they'll automatically show up on /blog.
const blogPosts: BlogPost[] = [
  {
    slug: "my-first-headshot-day",
    title: "My First Headshot Day",
    date: "2025-01-15",
    excerpt:
      "I was so nervous before my first professional headshot session — but it turned out to be one of my favorite days ever!",
    content: [
      "Hi everyone! I still remember waking up early and being SO nervous about my first professional headshot day. My mom kept telling me I would do great, but my tummy still had butterflies the whole car ride there.",
      "When we got to the studio, the photographer was so kind. She showed me the lights and the camera and let me look through some pictures other kids had taken. That helped me feel a lot less nervous, because I could see it was going to be fun, not scary.",
      "We tried a bunch of different looks — some smiling big, some more serious and thoughtful, and some laughing for real because my mom made a silly joke behind the camera. The photographer kept saying 'there it is!' whenever she caught a shot she loved, which made me want to keep going.",
      "By the end of the session, I actually didn't want to stop! I learned that headshots aren't just about smiling pretty — they're about showing who you really are so casting directors can get to know you before they even meet you.",
      "My biggest tip for any kid getting ready for their first headshot day: get a good night's sleep, drink lots of water, and remember it's okay to be a little nervous. Once the camera starts clicking, it turns into so much fun.",
    ],
  },
  {
    slug: "why-i-love-kpop-dance",
    title: "Why I Love K-pop Dance",
    date: "2025-02-10",
    excerpt:
      "From learning my first choreography to performing it for my family, here's why K-pop dance has my whole heart.",
    content: [
      "If you know me, you know I am a HUGE K-pop fan. My favorite part isn't just the music though — it's the dancing! The choreography is so much fun to learn because every single move tells part of the story of the song.",
      "I started by watching dance practice videos over and over until I knew every step by heart. Then I'd clear a space in the living room and practice until my legs were tired but I still wanted to do it one more time.",
      "What I love most is how K-pop dance mixes so many styles together — sharp, powerful moves one second and smooth, graceful ones the next. It keeps me on my toes (literally!) and always challenges me to get better.",
      "Performing the choreography for my family and friends is one of my favorite feelings in the whole world. Even when I mess up a step, I just keep smiling and going, because that's what real performers do.",
      "K-pop dance has taught me discipline, confidence, and how to have fun while working hard — and I think those lessons help me in acting and modeling too. Plus, it's just really, really fun!",
    ],
  },
  {
    slug: "getting-ready-for-auditions",
    title: "Getting Ready for Auditions",
    date: "2025-03-05",
    excerpt:
      "Auditions can feel like a lot, but here's how I get my mind, my lines, and my outfit ready before I walk in the room.",
    content: [
      "Auditions used to make me feel really nervous, but now I actually look forward to them! Over time I've built a little routine that helps me feel calm and ready, and I wanted to share it.",
      "First, I always read through my lines a bunch of times the night before — not just to memorize them, but to really think about how my character is feeling in the scene. My mom likes to help me practice by reading the other parts with me.",
      "The morning of an audition, I like to pick out my outfit early so I'm not rushing. I try to wear something simple and comfortable that still feels like 'me,' because casting directors want to see the real you, not a costume.",
      "Right before I go in, I take a few deep breaths and remind myself that auditions are just a chance to have fun and show my work — not a test I can fail. Whatever happens, I get to practice acting in front of new people, and that's always good experience.",
      "My biggest piece of advice for other kids getting ready for auditions: be prepared, be yourself, and remember that every audition — no matter the outcome — makes you a stronger performer for the next one.",
    ],
  },
  {
    slug: "my-audition-journey-since-age-8",
    title: "My Audition Journey: Starting at Age 8",
    date: "2025-04-18",
    excerpt:
      "I booked my very first audition when I was only 8 years old. Here's my story of how I got started and everything I've learned about audition prep along the way.",
    content: [
      "I was 8 years old the very first time I walked into an audition room, and I still remember exactly how it felt — my hands were shaky, my heart was pounding, and I kept whispering my lines to myself in the waiting area just to make sure I wouldn't forget them.",
      "Back then, I didn't really know what to expect. My mom explained that an audition is basically just a chance to show a casting director what I could do, not a test with a pass or fail grade. That helped a little, but I was still so nervous I could barely eat breakfast that morning!",
      "My first audition prep routine was pretty simple: practice my lines in the mirror, pick out a comfy outfit, and have my mom quiz me in the car on the way there. I didn't book that first role, but I learned so much just from being in the room and trying.",
      "As I kept going to more auditions, I started figuring out what actually helped me do my best. Reading the sides out loud instead of just in my head made the words feel more natural. Thinking about how my character was feeling, instead of just memorizing words, made my acting feel more real too.",
      "One of the biggest lessons from being an 8-year-old at my very first audition to where I am now is that confidence grows with practice, not perfection. Every single audition — the ones I booked and the ones I didn't — taught me something new about being prepared, staying calm, and trusting myself.",
      "If there's one thing I'd tell any kid starting their own audition journey, it's this: the nerves never fully go away, and that's okay! What matters is walking in prepared, being yourself, and remembering that just getting the chance to audition is already something to be proud of.",
    ],
  },
]

export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

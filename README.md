# Sri Varshan B — Personal Portfolio

A premium, interactive personal portfolio website built with Next.js 15, React 19, and Tailwind CSS 4.

## How to Run

1. Clone or download the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

To build for production:
```bash
npm run build
npm start
```

## Sections Table

| Number | Section | Description |
| :--- | :--- | :--- |
| 00 | Hero | Looping portrait video with introductory heading. |
| 01 | About | Hanging realistic ID card that reacts to mouse movement. |
| 02 | Skills | Periodic table of the tech stack with an interactive inspector. |
| 03 | Work | Expanding accordion gallery with illustrative UIs. |
| 04 | Experience | Vertical timeline combining education and experience. |
| 05 | Achievements | Pinned horizontal scrolling gallery of milestones. |
| 06 | Contact | "Let's build something together" and footer links. |

*Note: Certifications section was omitted as per rules since there were no certifications listed in the résumé.*

## Rebuilding the Hero Video

To re-process your raw intro video into the seamless loop assets:
1. Ensure you have `ffmpeg` and Python installed on your system.
2. Ensure you have `numpy` and `scipy` installed (`pip install numpy scipy`).
3. Place your raw video file as `intro.mp4` (or update the script path).
4. Run the build script:
   ```bash
   cd scripts
   python build-hero-assets.py
   ```
5. The script will automatically crop, color-balance, crossfade the audio and video, and output `hero.mp4`, `hero.webm`, `portrait-bust.webp`, and `og.jpg` directly into the `public/` directory.

## Credits & Licences

- **Brand Logos**: In a production environment, brand logos would be sourced from [Devicon](https://devicon.dev/) or [Simple Icons](https://simpleicons.org/). These are typically licensed under MIT or CC0. Currently, the UI uses fallback stylized text SVGs for missing brand icons.
- **Fonts**: Inter Tight, Instrument Serif, and JetBrains Mono are served directly using `next/font/google` and are licensed under the SIL Open Font License (OFL).
- **Icons**: General UI icons are built using simple SVG paths within the components.

import './globals.css';
import SmoothScroll from './components/SmoothScroll';

export const metadata = {
  title: 'Happy New Year 2026',
  description: 'New Year theme with smooth scrolling and GSAP animations',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

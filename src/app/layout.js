import "./globals.css"; // Import our global CSS file so Tailwind works on every page
import Providers from "./provider";

export const metadata = { // Define metadata for SEO (Search Engine Optimization)
  title: "To-Do App", // Set the title that appears in the browser tab
  description: "A simple Next.js + MongoDB CRUD app", // Set the meta description for search engines
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"><body className="antialiased">
      <Providers>{children}</Providers></body></html>
  );
}

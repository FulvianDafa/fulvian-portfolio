import Link from "next/link";
import { Header } from "@/components/portfolio/header";
import { Footer } from "@/components/portfolio/contact";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="container not-found" tabIndex={-1}>
        <p className="eyebrow accent">404 / PAGE NOT FOUND</p>
        <h1>This page isn’t here.</h1>
        <p>Explore the selected work to find a project and its case study.</p>
        <Link href="/#projects" className="button primary">
          Back to selected work ↗
        </Link>
      </main>
      <Footer />
    </>
  );
}

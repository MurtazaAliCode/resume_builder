import { Link } from "wouter";
import { FileText } from "lucide-react";

export function Footer() {
  const footerSections = [
    {
      title: "Templates",
      links: [
        { name: "Modern", href: "/templates/modern" },
        { name: "Classic", href: "/templates/classic" },
        { name: "Creative", href: "/templates/creative" },
        { name: "Corporate", href: "/templates/corporate" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Resume Tips", href: "/tips" },
        { name: "Professional Cover Letters - Elevate your applications with expertly crafted cover letters that complement your resume perfectly", href: "/cover-letters" },
        { name: "Interview Preparation - Master your next interview with proven strategies, practice questions, and confidence-building techniques", href: "/interview-prep" },
        { name: "Career Advancement Advice - Navigate your career path with expert guidance on promotions, job transitions, and professional growth", href: "/career-advice" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "How to Use", href: "/how-to-use" },
        { name: "Terms of Use", href: "/terms" },
      ],
    },
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">ResumeBuilder Pro</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Build professional resumes with 80-90% job success rate using our AI-powered platform.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; 2024 ResumeBuilder Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

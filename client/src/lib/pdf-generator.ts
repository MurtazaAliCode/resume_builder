import type { ResumeData, Template } from "@shared/schema";

declare global {
  interface Window {
    jsPDF: any;
  }
}

export function generatePDF(resumeData: ResumeData, template: Template, isPaid: boolean) {
  try {
    // Dynamically load jsPDF if not already loaded
    const loadjsPDF = () => {
      return new Promise((resolve, reject) => {
        if (window.jsPDF) {
          resolve(window.jsPDF);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.onload = () => {
          if (window.jsPDF) {
            resolve(window.jsPDF);
          } else {
            reject(new Error('jsPDF not available'));
          }
        };
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    loadjsPDF().then(() => {
      const { jsPDF } = window;
      const doc = new jsPDF();

      // Set font
      doc.setFont('helvetica');

      let yPosition = 20;
      const lineHeight = 6;
      const margin = 20;

      // Add watermark for free trial
      if (!isPaid) {
        doc.setFontSize(8);
        doc.setTextColor(200, 200, 200);
        doc.text('Created with ResumeBuilder Pro Free Trial', margin, 285);
        doc.setTextColor(0, 0, 0);
      }

      // Header
      if (resumeData.personal.name) {
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.text(resumeData.personal.name, margin, yPosition);
        yPosition += 8;
      }

      if (resumeData.personal.title) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.text(resumeData.personal.title, margin, yPosition);
        yPosition += 6;
      }

      // Contact info
      const contactInfo = [];
      if (resumeData.personal.email) contactInfo.push(resumeData.personal.email);
      if (resumeData.personal.phone) contactInfo.push(resumeData.personal.phone);
      if (resumeData.personal.linkedin) contactInfo.push(resumeData.personal.linkedin);

      if (contactInfo.length > 0) {
        doc.setFontSize(10);
        doc.text(contactInfo.join(' • '), margin, yPosition);
        yPosition += 10;
      }

      // Education section
      if (resumeData.education.degree) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Education', margin, yPosition);
        yPosition += 6;

        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(resumeData.education.degree, margin, yPosition);
        yPosition += 5;

        if (resumeData.education.institution) {
          doc.setFont('helvetica', 'normal');
          doc.text(resumeData.education.institution, margin, yPosition);
          yPosition += 5;
        }

        if (resumeData.education.startYear || resumeData.education.endYear) {
          doc.text(`${resumeData.education.startYear || ''} - ${resumeData.education.endYear || 'Present'}`, margin, yPosition);
          yPosition += 5;
        }

        yPosition += 5;
      }

      // Experience section
      if (resumeData.skills.jobTitle) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Experience', margin, yPosition);
        yPosition += 6;

        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(resumeData.skills.jobTitle, margin, yPosition);
        yPosition += 5;

        if (resumeData.skills.company) {
          doc.setFont('helvetica', 'normal');
          doc.text(resumeData.skills.company, margin, yPosition);
          yPosition += 5;
        }

        if (resumeData.skills.duration) {
          doc.text(resumeData.skills.duration, margin, yPosition);
          yPosition += 5;
        }

        if (resumeData.skills.description) {
          doc.setFontSize(10);
          const splitDescription = doc.splitTextToSize(resumeData.skills.description, 170);
          doc.text(splitDescription, margin, yPosition);
          yPosition += splitDescription.length * 4 + 5;
        }

        yPosition += 5;
      }

      // Technical Skills section
      if (resumeData.skills.technical) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Technical Skills', margin, yPosition);
        yPosition += 6;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const splitSkills = doc.splitTextToSize(resumeData.skills.technical, 170);
        doc.text(splitSkills, margin, yPosition);
        yPosition += splitSkills.length * 4 + 5;
      }

      // Languages section
      if (resumeData.additional.languages) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Languages', margin, yPosition);
        yPosition += 6;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const splitLanguages = doc.splitTextToSize(resumeData.additional.languages, 170);
        doc.text(splitLanguages, margin, yPosition);
        yPosition += splitLanguages.length * 4 + 5;
      }

      // Certifications section
      if (resumeData.additional.certifications) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Certifications', margin, yPosition);
        yPosition += 6;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const splitCerts = doc.splitTextToSize(resumeData.additional.certifications, 170);
        doc.text(splitCerts, margin, yPosition);
        yPosition += splitCerts.length * 4 + 5;
      }

      // Projects section
      if (resumeData.additional.projects) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Projects', margin, yPosition);
        yPosition += 6;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const splitProjects = doc.splitTextToSize(resumeData.additional.projects, 170);
        doc.text(splitProjects, margin, yPosition);
      }

      // Save the PDF
      const fileName = `resume_${resumeData.personal.name?.replace(/\s+/g, '_').toLowerCase() || 'user'}.pdf`;
      doc.save(fileName);
    }).catch((error) => {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    });
  } catch (error) {
    console.error('Error loading PDF generator:', error);
    alert('Error loading PDF generator. Please try again.');
  }
}

'use client';

import dynamic from 'next/dynamic';
import { ResumePDF } from './ResumePDF';

// Dynamically import PDFDownloadLink to ensure it only runs in the browser
const PDFDownloadLink = dynamic(
  () =>
    import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  { ssr: false } // Important: disable server-side rendering
);

export default function ResumePDFClient() {
  return (
    <PDFDownloadLink
      document={<ResumePDF />}
      fileName="Bayazid_Talukder_Resume.pdf"
    >
      {({ loading }) => (
        <button
          className="px-6 py-4 bg-teal-600 text-white rounded-full shadow-2xl hover:scale-105 transition"
        >
          {loading ? 'Preparing PDF...' : '⬇ Download CV'}
        </button>
      )}
    </PDFDownloadLink>
  );
}

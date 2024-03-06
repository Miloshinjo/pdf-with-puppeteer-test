'use client';

import axios from 'axios';

export function DownloadPdf() {
  // Downloads page to PDF file
  const handleClick = async () => {
    const response = await axios.get('/api/pdf', {
      responseType: 'arraybuffer',
      headers: {
        Accept: 'application/pdf',
      },
    });

    const blob = new Blob([response.data], { type: 'application/pdf' });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'download-test.pdf');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <button
      onClick={handleClick}
      type="submit"
      className="bg-slate-200 border-gray-900 border text-2xl p-4 shadow-lg"
    >
      Download PDF
    </button>
  );
}

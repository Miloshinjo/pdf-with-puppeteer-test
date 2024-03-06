import puppeteer from 'puppeteer';

// Generates a PDF buffer using Puppeteer
export async function generatePdfBuffer(): Promise<Buffer> {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  await page.goto('https://stage.wovenlight.dev/', {
    waitUntil: 'networkidle0',
  });

  const pdfBuffer = await page.pdf({ format: 'a4' });

  await browser.close();

  return pdfBuffer;
}

export const dynamic = 'force-dynamic'; // defaults to auto

// GET Handler for /api/pdf
export async function GET() {
  const pdfBuffer = await generatePdfBuffer();

  return new Response(pdfBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Length': pdfBuffer.length.toString(),
    },
  });
}

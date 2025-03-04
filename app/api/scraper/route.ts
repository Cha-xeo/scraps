import chromium from '@sparticuz/chromium-min';
import puppeteer from 'puppeteer-core';

chromium.setGraphicsMode = false



export async function POST(request: Request) {
    const { siteUrl } = await request.json();

    const isLocal = !!process.env.CHROME_EXECUTABLE_PATH;
      
    const browser = await puppeteer.launch({
      args: isLocal ? puppeteer.defaultArgs() : chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath("https://chachascrapbucket.s3.eu-west-3.amazonaws.com/chromium-v132.0.0-pack.tar"),
      headless: true,
    });

  const page = await browser.newPage();
  await page.goto("https://spacejelly.dev");
  const pageTitle = await page.title();
  await browser.close();

  return Response.json({
    siteUrl,
    pageTitle,
  })
}

export async function GET() {
    return Response.json({
        hello: 'get world'
    })
}
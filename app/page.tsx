"use client"

import { useState } from "react";


export default function Home() {

  const [ result, setResults] = useState<object>();

  async function handleOnClick() {
    try {
      const results = await fetch('/api/scraper', {
        method: 'POST',
        body: JSON.stringify({
          siteUrl: 'https://spacejelly.dev'
        })
      }).then(r => r.json())
      setResults(results)
      
    } catch (error) {
      console.log(error);      
    }
  }

  return (
    <main className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold mb-8">Let&apos;s scrape!</h1>
          <p className="mb-6">
            <button className="btn btn-primary" onClick={handleOnClick}>Get Scrapping</button>
          </p>
          {result && (
            <div className="grid">
              <pre className="bg-zinc-200 text-left py-4 px-5 rounded overflow-x-scroll">
                <code>{JSON.stringify(result, undefined, 2)}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

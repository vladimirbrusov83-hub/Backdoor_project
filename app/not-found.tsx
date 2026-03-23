'use client'
import { useEffect, useState } from 'react'

const GLITCH_CHARS = '▓░█▄▀■□▪▫◆◇○●'

function GlitchText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    let iterations = 0
    const max = 18
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < iterations) return char
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          })
          .join('')
      )
      iterations++
      if (iterations > max) clearInterval(interval)
    }, 50)
    return () => clearInterval(interval)
  }, [text])

  return <span>{display}</span>
}

export default function NotFound() {
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    const id = setInterval(() => {
      setCountdown(n => {
        if (n <= 1) { clearInterval(id); window.location.href = '/'; return 0 }
        return n - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <html lang="en">
      <head>
        <title>NOT FOUND — BACK-NET TERMINAL</title>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=VT323&family=Rajdhani:wght@700&display=swap');
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            background: #0a0908;
            color: #c8bc96;
            font-family: 'Share Tech Mono', monospace;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .container {
            text-align: center;
            max-width: 560px;
            padding: 0 24px;
          }
          .code {
            font-family: 'VT323', monospace;
            font-size: 120px;
            color: #c8972a;
            line-height: 1;
            letter-spacing: 8px;
            margin-bottom: 8px;
          }
          .title {
            font-family: 'Rajdhani', sans-serif;
            font-size: 22px;
            font-weight: 700;
            color: #ece0c0;
            text-transform: uppercase;
            letter-spacing: 4px;
            margin-bottom: 20px;
          }
          .border-line {
            width: 100%;
            height: 1px;
            background: #252010;
            margin: 20px 0;
          }
          .body-text {
            font-size: 12px;
            color: #7a7050;
            line-height: 2;
            letter-spacing: 0.5px;
            margin-bottom: 20px;
          }
          .countdown {
            font-size: 11px;
            color: #403828;
            letter-spacing: 2px;
          }
          .countdown span {
            color: #c8972a;
          }
          .back-btn {
            display: inline-block;
            margin-top: 20px;
            background: rgba(200,151,42,0.07);
            border: 1px solid #5a420e;
            color: #c8972a;
            font-family: 'Share Tech Mono', monospace;
            font-size: 11px;
            padding: 10px 24px;
            cursor: pointer;
            letter-spacing: 2px;
            text-decoration: none;
          }
          .back-btn:hover {
            background: rgba(200,151,42,0.13);
            border-color: #c8972a;
          }
          .location {
            font-size: 10px;
            color: #403828;
            margin-top: 12px;
            letter-spacing: 1px;
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          <div className="code">404</div>
          <div className="title">
            <GlitchText text="LOCATION NOT FOUND" />
          </div>
          <div className="border-line" />
          <div className="body-text">
            The coordinates you attempted to access do not exist in the M.E.G. Prometheus Library, have been flagged and restricted, or were lost during a Level transition.
          </div>
          <div className="body-text" style={{ color: '#c8972a', fontSize: '11px' }}>
            Stay calm. Do not attempt to no-clip back. Return to a known location.
          </div>
          <div className="border-line" />
          <div className="countdown">
            REDIRECTING TO TERMINAL IN <span>{countdown}</span>
          </div>
          <a href="/" className="back-btn">← RETURN TO TERMINAL</a>
          <div className="location">BACK-NET TERMINAL — M.E.G. PROMETHEUS LIBRARY</div>
        </div>
      </body>
    </html>
  )
}

"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const tapChip = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = e.currentTarget;
    el.style.transform = "scale(.96)";
    setTimeout(() => (el.style.transform = ""), 140);
  };

  return (
    <>
      <div className="bg-wash" />
      <div className="grain" />

      <nav>
        <div className="wrap nav-in">
          <a className="brand" href="#">
            <span className="mark si">කපු</span>
            <b>Kapu</b>
          </a>
          <div className="nav-links">
            <a href="#how">How it works</a>
            <a href="#languages">Languages</a>
            <a href="#features">Why Kapu</a>
            <a className="nav-cta" href="#start">
              Start gifting
            </a>
          </div>
        </div>
      </nav>

      <header className="wrap">
        <span className="eyebrow">
          <span className="dot" /> Powered by Kapruka · Live catalog
        </span>
        <h1>
          Your gift <em>kapuwa</em>, always knows what to send.
        </h1>
        <p className="lede">
          A warm Sri Lankan concierge who helps you find the perfect gift and
          walks you all the way to a working pay link — by voice or text.
        </p>
        <p className="greet">
          Ayubowan!{" "}
          <span className="si">මට ඔයාට හොඳ තෑග්ගක් හොයල දෙන්න පුළුවන්</span> —
          just tell me who it&apos;s for. 🎁
        </p>

        <div className="cta-row" id="start">
          <a className="btn-primary" href="#">
            Start gifting — free
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <a className="btn-ghost" href="#">
            <span className="mic">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3" />
              </svg>
            </span>
            Talk to Kapu
          </a>
        </div>

        <div className="trust">
          <span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 6 9 17l-5-5" />
            </svg>{" "}
            No sign-up · guest checkout
          </span>
          <span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 6 9 17l-5-5" />
            </svg>{" "}
            Real prices in LKR
          </span>
          <span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 6 9 17l-5-5" />
            </svg>{" "}
            Island-wide delivery
          </span>
        </div>

        {/* Chat preview */}
        <div className="stage">
          <div className="glow" />
          <div className="chat">
            <div className="chat-top">
              <span className="mark si">කපු</span>
              <div style={{ flex: 1 }}>
                <div className="who">Kapu</div>
              </div>
              <div className="stat">online</div>
            </div>
            <div className="chat-body">
              <div className="msg user">
                Amma-ge birthday Saturday, send to Kandy — cake &amp; flowers,
                around 8000 🎂
              </div>
              <div className="msg kapu a">
                Ah, lovely! Kandy delivery Saturday — no problem, machan.
                Here&apos;s a cake + flower combo right in budget 👇
              </div>
              <div className="cards">
                <div className="pcard">
                  <div className="img i1">🎂</div>
                  <div className="meta">
                    <div className="nm">Ribbon Chocolate Gateau</div>
                    <div className="pr">LKR 4,950</div>
                    <button className="add">+ Add to cart</button>
                  </div>
                </div>
                <div className="pcard">
                  <div className="img i2">💐</div>
                  <div className="meta">
                    <div className="nm">Pastel Rose Bouquet</div>
                    <div className="pr">LKR 2,850</div>
                    <button className="add">+ Add to cart</button>
                  </div>
                </div>
              </div>
              <div className="typing">
                <span className="d">
                  <i />
                  <i />
                  <i />
                </span>
                <small>Kapu is checking Kandy delivery…</small>
              </div>
            </div>
          </div>
        </div>

        <div className="chips">
          <span className="chip" onClick={tapChip}>
            <span className="em">🎉</span>Amma-ge birthday gift
          </span>
          <span className="chip" onClick={tapChip}>
            <span className="em">💐</span>Anniversary flowers to Kandy
          </span>
          <span className="chip" onClick={tapChip}>
            <span className="em">💼</span>Under Rs. 5000 for a colleague
          </span>
          <span className="chip ta" onClick={tapChip}>
            <span className="em">🎁</span>தீபாவளி பரிசு
          </span>
        </div>
      </header>

      {/* Languages */}
      <section id="languages" className="wrap reveal">
        <div className="lang-band">
          <div className="kicker">Speaks your language</div>
          <h2>One concierge. Four ways to say it.</h2>
          <div className="lang-grid">
            <div className="lang-card">
              <div className="big">Hello</div>
              <div className="en">English</div>
              <div className="ex">&ldquo;Need a gift for my colleague.&rdquo;</div>
            </div>
            <div className="lang-card">
              <div className="big">Machan!</div>
              <div className="en">Tanglish</div>
              <div className="ex">&ldquo;Amma-ge birthday, shall we?&rdquo;</div>
            </div>
            <div className="lang-card">
              <div className="big si">ආයුබෝවන්</div>
              <div className="en">සිංහල · Sinhala</div>
              <div className="ex si">&ldquo;හොඳ තෑග්ගක් ඕන.&rdquo;</div>
            </div>
            <div className="lang-card">
              <div className="big ta">வணக்கம்</div>
              <div className="en">தமிழ் · Tamil</div>
              <div className="ex ta">&ldquo;ஒரு நல்ல பரிசு வேண்டும்.&rdquo;</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="wrap reveal">
        <div className="sec-head">
          <div className="kicker">Why Kapu</div>
          <h2>
            Not a chatbot. A <em>matchmaker</em> for gifts.
          </h2>
          <p>
            In Sri Lankan tradition a <em>kapuwa</em> is the trusted go-between
            who brings two parties together. Kapu connects you to the perfect
            gift.
          </p>
        </div>
        <div className="feat-grid">
          <div className="feat">
            <div className="ic">🪄</div>
            <h3>Guided discovery</h3>
            <p>
              &ldquo;Not sure what to get?&rdquo; Kapu asks a question or two,
              then shows a beautiful carousel — never a wall of text.
            </p>
          </div>
          <div className="feat">
            <div className="ic">🎙️</div>
            <h3>Voice or text</h3>
            <p>
              Talk to Kapu like a friend. Real-time speech with live
              transcripts, switching languages mid-sentence.
            </p>
          </div>
          <div className="feat">
            <div className="ic">🛒</div>
            <h3>End-to-end checkout</h3>
            <p>
              Multi-item cart, delivery city &amp; date, a gift message — all
              the way to a working click-to-pay link.
            </p>
          </div>
          <div className="feat">
            <div className="ic">📦</div>
            <h3>Grounded in real stock</h3>
            <p>
              Every price, product and delivery fact comes from Kapruka&apos;s
              live catalog. Kapu never makes things up.
            </p>
          </div>
          <div className="feat">
            <div className="ic">🌸</div>
            <h3>Knows the occasion</h3>
            <p>
              Avurudu, Vesak, weddings, exam results, anniversaries — Kapu gets
              the local context, gently.
            </p>
          </div>
          <div className="feat">
            <div className="ic">🚚</div>
            <h3>Honest about delivery</h3>
            <p>
              If a cake can&apos;t reach Kandy by Saturday, Kapu says so kindly —
              and offers a lovely alternative.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="wrap reveal">
        <div className="sec-head">
          <div className="kicker teal">The flow</div>
          <h2>
            From &ldquo;I&apos;m not sure&rdquo; to <em>sent</em>.
          </h2>
        </div>
        <div className="flow">
          <div className="step">
            <h4>Tell Kapu</h4>
            <p>
              Who it&apos;s for, the occasion, your budget — in any language, by
              voice or text.
            </p>
          </div>
          <div className="step">
            <h4>Browse picks</h4>
            <p>
              A snap carousel of real products with images, prices in LKR and
              stock hints.
            </p>
          </div>
          <div className="step">
            <h4>Set delivery</h4>
            <p>
              Pick the city and date. Kapu confirms cost and flags anything
              perishable.
            </p>
          </div>
          <div className="step">
            <h4>Pay &amp; track</h4>
            <p>
              Add a gift message, get a live pay link, and track it the whole
              way there.
            </p>
          </div>
        </div>
      </section>

      {/* Closer */}
      <section className="wrap reveal">
        <div className="closer">
          <div className="kicker">Ready when you are</div>
          <h2>Let&apos;s find something they&apos;ll love.</h2>
          <p>
            Tell Kapu who the gift is for. It takes a minute, and there&apos;s
            nothing to sign up for.
          </p>
          <div className="cta-row">
            <a className="btn-primary" href="#">
              Start gifting — free
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <footer className="wrap">
        <div className="foot-in">
          <div>
            <a className="brand" href="#">
              <span className="mark si">කපු</span>
              <b>Kapu</b>
            </a>
            <p className="madein">
              Your gift kapuwa · Made with warmth in Sri Lanka 🇱🇰
            </p>
          </div>
          <div className="foot-links">
            <a href="#how">How it works</a>
            <a href="#languages">Languages</a>
            <a href="#features">Why Kapu</a>
            <a href="https://www.kapruka.com" target="_blank" rel="noopener">
              Kapruka
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

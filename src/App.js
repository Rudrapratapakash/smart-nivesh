import React, { useState } from "react";
import "./App.css";

function App() {
  const [tab, setTab] = useState("sip");
  const [investment, setInvestment] = useState("");
  const [stepupRate, setStepupRate] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [adjustInflation, setAdjustInflation] = useState(false);
  const [result, setResult] = useState({ invested: 0, returns: 0, total: 0 });

  function switchTab(name) {
    setTab(name);
  }

  function formatCurrency(x) {
    if (isNaN(x) || x === null) return "₹0";
    return `₹${Number(x).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
  }

  function calculateSIP() {
    const P = Number(investment) || 0;
    const step = Number(stepupRate) / 100 || 0;
    const annualR = Number(rate) / 100 || 0;
    const nYears = Number(years) || 0;

    let invested = 0;
    let total = 0;

    if (tab === "lumpsum") {
      // Lump sum: single investment grows annually
      invested = P;
      total = P * Math.pow(1 + annualR, nYears);
    } else if (tab === "stepup") {
      // Step-up SIP: contributions increase yearly by `step` percent
      const i = annualR / 12; // monthly rate
      for (let y = 0; y < nYears; y++) {
        const monthly = P * Math.pow(1 + step, y);
        for (let m = 0; m < 12; m++) {
          total = total * (1 + i) + monthly;
          invested += monthly;
        }
      }
    } else {
      // Regular SIP
      const i = annualR / 12; // periodic rate
      const n = nYears * 12;
      if (i === 0) {
        invested = P * n;
        total = invested;
      } else {
        total = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
        invested = P * n;
      }
    }

    const returnsAmt = total - invested;

    // Inflation adjustment (annual 6%) — show real (inflation-adjusted) values when requested
    const inflationRate = 0.06;
    let adjInvested = invested;
    let adjTotal = total;
    let adjReturns = returnsAmt;
    if (adjustInflation && nYears > 0) {
      const factor = Math.pow(1 + inflationRate, nYears);
      adjInvested = invested / factor;
      adjTotal = total / factor;
      adjReturns = adjTotal - adjInvested;
    }

    setResult({
      invested,
      returns: returnsAmt,
      total,
      adjInvested,
      adjReturns,
      adjTotal,
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Smart Nivesh India</h1>
        <p>Everyone Needs Financial Freedom</p>
      </header>
      <div className="calculator-container">
        <div className="calculator-card">
          <div className="tabs">
            <button
              className={`tab-btn ${tab === "sip" ? "active" : ""}`}
              onClick={() => switchTab("sip")}
            >
              SIP
            </button>
            <button
              className={`tab-btn ${tab === "lumpsum" ? "active" : ""}`}
              onClick={() => switchTab("lumpsum")}
            >
              Lumpsum
            </button>
            <button
              className={`tab-btn ${tab === "stepup" ? "active" : ""}`}
              onClick={() => switchTab("stepup")}
            >
              Step Up
            </button>
          </div>

          <div className="input-group">
            <label id="amount-label">
              {tab === "lumpsum"
                ? "Lump Sum Investment (₹)"
                : "Monthly Investment (₹)"}
            </label>
            <input
              type="number"
              id="investment"
              placeholder="e.g. 5000"
              value={investment}
              onChange={(e) => setInvestment(e.target.value)}
            />
          </div>

          {tab === "stepup" && (
            <div className="input-group" id="stepup-container">
              <label>Annual Step Up (%)</label>
              <input
                type="number"
                id="stepup-rate"
                placeholder="e.g. 10"
                value={stepupRate}
                onChange={(e) => setStepupRate(e.target.value)}
              />
            </div>
          )}

          <div className="input-group">
            <label>Expected Return Rate (p.a %)</label>
            <input
              type="number"
              id="rate"
              placeholder="e.g. 12"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Time Period (Years)</label>
            <input
              type="number"
              id="years"
              placeholder="e.g. 10"
              value={years}
              onChange={(e) => setYears(e.target.value)}
            />
          </div>
          <div className="input-group checkbox-group">
            <input
              type="checkbox"
              id="inflation"
              checked={adjustInflation}
              onChange={(e) => setAdjustInflation(e.target.checked)}
            />
            <label htmlFor="inflation">Adjust for Inflation (6%)</label>
          </div>
          <button onClick={calculateSIP}>Calculate Returns</button>
        </div>

        <div className="result-Box" id="result-Box">
          <div className="result-row">
            <span>Invested Amount:</span>
            <span id="displayInvested">
              {formatCurrency(
                adjustInflation ? result.adjInvested : result.invested,
              )}
            </span>
          </div>
          <div className="result-row">
            <span>Est. Returns:</span>
            <span id="displayReturns">
              {formatCurrency(
                adjustInflation ? result.adjReturns : result.returns,
              )}
            </span>
          </div>
          <div className="result-row total-amount">
            <span>Total Value:</span>
            <span id="displayTotal">
              {formatCurrency(adjustInflation ? result.adjTotal : result.total)}
            </span>
          </div>
        </div>
      </div>
      <section class="promo-container">
        <h3 class="promo-title">🚀 Best Tools to Grow Your Wealth</h3>

        <div class="card-grid">
          <div class="offer-card">
            <div class="card-icon">📈</div>
            <div class="card-content">
              <h4 class="card-heading">Angel One (Free)</h4>
              <p class="card-desc">
                Zero Brokerage on Delivery. Best for beginners starting SIP.
              </p>
              <a
                href="https://leads.goldenteam.in/?h=c2pDeGFka0JROWIzbVYvcTcxc2NyQT09"
                target="_blank"
                rel="noreferrer"
                class="action-btn btn-orange"
              >
                Open Free Account &rarr;
              </a>
            </div>
          </div>

          <div class="offer-card">
            <div class="card-icon">💳</div>
            <div class="card-content">
              <h4 class="card-heading">Lifetime Free Card</h4>
              <p class="card-desc">
                Get SBI Credit Card. No Annual Fee. Best for shopping.
              </p>
              <a
                href="https://leads.banksathi.com/?h=ZTJ0alAvd2RqMnBLQ1NGeGpGelZyZz09"
                target="_blank"
                rel="noreferrer"
                class="action-btn btn-blue"
              >
                Apply Now &rarr;
              </a>
            </div>
          </div>

          <div class="offer-card">
            <div class="card-icon">🦄</div>
            <div class="card-content">
              <h4 class="card-heading">Upstox Pro</h4>
              <p class="card-desc">
                Join millions of investors. Fast and reliable trading app.
              </p>
              <a
                href="https://leads.banksathi.com/?h=MGpFbzZQc1V2K0YwdjFwSUpyWlR6UT09"
                target="_blank"
                rel="noreferrer"
                class="action-btn btn-green"
              >
                Start Investing &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>
      <div class="content-section">
        <h1>SIP Calculator: Calculate Mutual Fund Returns Online</h1>
        <p>
          Welcome to India's fastest <strong>SIP Calculator</strong>. If you are
          planning to invest in Mutual Funds, our free tool helps you estimate
          how much wealth you can create over time.
        </p>

        <h3>What is a Systematic Investment Plan (SIP)?</h3>
        <p>
          A Systematic Investment Plan (SIP) is a method of investing in mutual
          funds where an investor chooses to invest a fixed amount of money at
          regular intervals (usually monthly). It is one of the best ways to
          build wealth for long-term goals like buying a house, retirement, or
          children's education.
        </p>

        <h3>Why Use Our SIP Return Calculator?</h3>
        <ul>
          <li>
            <strong>Instant Results:</strong> No manual calculations needed. Get
            results in milliseconds.
          </li>
          <li>
            <strong>Inflation Planning:</strong> Helps you understand the future
            value of your money.
          </li>
          <li>
            <strong>Goal Setting:</strong> Decide how much you need to invest
            monthly to reach 1 Crore or more.
          </li>
        </ul>

        <h3>How is SIP Calculated?</h3>
        <p>
          SIP returns are calculated based on compound interest. The longer you
          stay invested, the more your money grows. The formula used is:
        </p>
        <code>{"M = P × ([1 + i] ^ (n - 1) / i) × (1 + i)"}</code>
        <p>
          Where <strong>P</strong> is the monthly investment,
          <strong>i</strong> is the periodic interest rate, and
          <strong>n</strong> is the total number of payments.
        </p>

        <p class="disclaimer">
          <em>
            Disclaimer: Mutual Fund investments are subject to market risks.
            Please read all scheme-related documents carefully. This tool
            provides an estimate based on the assumed rate of return.
          </em>
        </p>
      </div>
      <div class="content-section faq-container">
        <h2>💡 Frequently Asked Questions (FAQs)</h2>

        <div class="faq-item">
          <h3 class="faq-question">1. Can I start SIP with ₹500?</h3>
          <p>
            Yes! Many top mutual funds in India allow you to start a SIP with as
            low as <strong>₹500 or even ₹100 per month</strong>. You don't need
            a large amount to start building wealth.
          </p>
        </div>

        <div class="faq-item">
          <h3 class="faq-question">2. Can I withdraw my money anytime?</h3>
          <p>
            Yes, open-ended mutual funds offer high liquidity. You can withdraw
            your money anytime with a click of a button. However, ELSS funds
            have a lock-in period of 3 years.
          </p>
        </div>

        <div class="faq-item">
          <h3 class="faq-question">3. Is SIP Tax-Free?</h3>
          <p>
            Not all SIPs are tax-free. However, if you invest in
            <strong>ELSS (Equity Linked Savings Scheme)</strong>, you can save
            tax up to ₹1.5 Lakh under Section 80C of the Income Tax Act.
          </p>
        </div>

        <div class="faq-item">
          <h3 class="faq-question">4. Which is better: FD or SIP?</h3>
          <p>
            Fixed Deposits (FD) usually offer 6-7% returns, while SIPs in Equity
            Mutual Funds can offer <strong>12-15% returns</strong> over the long
            term. SIP beats inflation better than FD.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

"use client";

import { Check, FlaskConical } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Research() {
  return (
    <section
      id="research"
      className="research-section"
      aria-labelledby="research-title"
    >
      <div className="container research-layout">
        <div className="research-intro" data-reveal>
          <p className="eyebrow accent">03 / RESEARCH SPOTLIGHT</p>
          <h2 id="research-title">
            When the DOM changes,
            <br />
            <span>the test can adapt.</span>
          </h2>
          <p>
            Implementing self-healing testing in Selenium WebDriver using
            similarity matching to recover broken DOM locators.
          </p>
          <div className="research-identity">
            <FlaskConical size={20} />
            <div>
              <strong>Undergraduate research · UPI</strong>
              <span>Design Research Methodology (DRM)</span>
            </div>
          </div>
          <div className="research-sut">
            <p className="eyebrow">PRIMARY SYSTEM UNDER TEST</p>
            <h3>Anugrah Jaya inventory & POS</h3>
            <p>
              An inventory and cashier application for a building-materials
              business, used to test real UI changes.
            </p>
            <p>
              Developed the web application used as the primary system under
              test in the self-healing research. Tested interactions across
              product modals, search fields, transaction controls, and payment
              inputs. Used 13 DOM-mutation scenarios to evaluate locator
              recovery on the application.
            </p>
            <p>
              All 13 healing scenarios recovered, with 0% false positives and a
              mean healing time of 2,644.8 ms on this SUT.
            </p>
            <p className="scope-note">
              These results apply to Anugrah Jaya&apos;s evaluated scenarios.
              They are a subset of the broader 23-SUT experiment.
            </p>
          </div>
        </div>
        <Tabs defaultValue="method" className="research-tabs" data-reveal data-reveal-delay="1">
          <TabsList variant="line" className="research-tab-list">
            <TabsTrigger value="method">Method</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="limits">Limits</TabsTrigger>
          </TabsList>
          <TabsContent value="method" className="research-panel">
            <h3>A small layer. A more adaptive test.</h3>
            <p>
              A WebDriver wrapper detects a failed lookup, filters compatible
              candidates, and chooses a replacement using a combined similarity
              score.
            </p>
            <div
              className="weight-chart"
              aria-label="Similarity weights: text 50 percent, locator 30 percent, position 20 percent"
            >
              <div style={{ width: "50%" }}>
                Text <strong>50%</strong>
              </div>
              <div style={{ width: "30%" }}>
                Locator <strong>30%</strong>
              </div>
              <div style={{ width: "20%" }}>
                Position <strong>20%</strong>
              </div>
            </div>
            <div className="method-meta">
              <span>
                Acceptance threshold <strong>0.50</strong>
              </span>
              <span>
                Training data required <strong>None</strong>
              </span>
            </div>
            <p className="panel-note">
              Text scoring combines Levenshtein similarity, token coverage, and
              substring matching. Available weights are normalized when
              historical information is missing.
            </p>
          </TabsContent>
          <TabsContent value="results" className="research-panel">
            <h3>Measured across 23 systems.</h3>
            <div className="research-stats">
              <div>
                <strong>92.31%</strong>
                <span>Healing success rate</span>
              </div>
              <div>
                <strong>11.46%</strong>
                <span>False positive rate</span>
              </div>
              <div>
                <strong>11.77 s</strong>
                <span>Mean healing time</span>
              </div>
              <div>
                <strong>5.80 s</strong>
                <span>Median healing time</span>
              </div>
            </div>
            <p className="panel-note">
              104 attempts; 96 accepted recoveries, including 11 false
              positives. HSR measures recovery, while FPR separately captures
              incorrect element selection. Results are from the research
              dataset.
            </p>
            <p className="validation-note">
              <Check size={18} /> Practitioner validation: 92.50% from two QA
              reviewers.
            </p>
          </TabsContent>
          <TabsContent value="limits" className="research-panel">
            <h3>Recovery needs the right context.</h3>
            <ul className="limits-list">
              <li>
                Stable labels and compatible elements help the matcher find the
                intended target.
              </li>
              <li>
                Similar attributes, text-free elements, hidden controls, and
                overlays can lead to incorrect selection.
              </li>
              <li>
                Anti-bot protections can prevent execution before healing
                begins.
              </li>
              <li>
                Healing time depends on the DOM, page loading, and network
                conditions; the experiment does not represent all websites.
              </li>
            </ul>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import styles from "./page.module.css";

const faqItems = [
  {
    question: "How does BingeLearn make money?",
    answer:
      "BingeLearn uses a freemium model with optional Pro tutor subscriptions and a commission on paid course sales.",
  },
  {
    question: "What commission do you take?",
    answer:
      "Free Starter tutors pay a standard 20% commission, while Pro tutors get a reduced 10% commission rate.",
  },
  {
    question: "Do students need a subscription?",
    answer:
      "No. Students can buy courses on demand. Subscription-style bundles can be added later by tutors.",
  },
  {
    question: "Is my content protected?",
    answer:
      "Yes. We use secure content delivery, account-based access controls, and clear policy enforcement for misuse reports.",
  },
  {
    question: "Can I sell in multiple subjects?",
    answer:
      "Yes. Tutors can create multiple course tracks, bundle them, and price each path independently.",
  },
];

const topCourses = [
  { title: "Algebra Crash Sprint", price: "$29", enrollments: 1240 },
  { title: "SAT Verbal in 7 Days", price: "$39", enrollments: 860 },
  { title: "Physics Problem Bootcamp", price: "$35", enrollments: 710 },
];

export default function HomePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggleFaq(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <div className={styles.page}>
      <header className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.navInner}>
            <a href="#" className={styles.logo} aria-label="BingeLearn home">
              <span className={styles.logoEmphasis}>Binge</span>Learn
            </a>
            <nav className={styles.navLinks}>
              <a href="#product">Product</a>
              <a href="#for-tutors">For Tutors</a>
              <a href="#pricing">Pricing</a>
              <a href="#faq">FAQ</a>
            </nav>
            <div className={styles.navCtas}>
              <button className={styles.ghostButton}>Sign in</button>
              <button className={styles.primaryButton}>Join as Tutor</button>
            </div>
          </div>
        </div>
      </header>

      <section id="product" className={`${styles.section} ${styles.heroSection}`}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.kicker}>Creator-style tutoring marketplace</p>
              <h1 className={styles.heroTitle}>Binge-learn smarter, not harder.</h1>
              <p className={styles.heroSubtitle}>
                BingeLearn helps tutors build their education brand and monetize content, while students discover engaging courses they can buy and
                binge-learn on demand.
              </p>
              <div className={styles.heroActions}>
                <button className={styles.primaryButton}>Join as Tutor</button>
                <button className={styles.secondaryButton}>Explore courses</button>
              </div>
              <p className={styles.heroNote}>Freemium to start - Commission only when you earn</p>
            </div>
            <aside className={styles.dashboardCard}>
              <h3>Tutor Dashboard Preview</h3>
              <div className={styles.dashboardStats}>
                <div>
                  <p className={styles.statLabel}>Monthly earnings</p>
                  <p className={styles.statValue}>$8,420</p>
                </div>
                <div>
                  <p className={styles.statLabel}>Active students</p>
                  <p className={styles.statValue}>1,927</p>
                </div>
              </div>
              <p className={styles.courseListTitle}>Top courses</p>
              <ul className={styles.courseList}>
                {topCourses.map((course) => (
                  <li key={course.title}>
                    <div>
                      <p>{course.title}</p>
                      <small>{course.enrollments} enrolled</small>
                    </div>
                    <strong>{course.price}</strong>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2>How BingeLearn works</h2>
          <div className={styles.steps}>
            <article className={styles.stepCard}>
              <div className={styles.stepIcon}>1</div>
              <h3>Tutors create</h3>
              <p>Upload lessons, bundle courses, and set your own prices in minutes.</p>
            </article>
            <article className={styles.stepCard}>
              <div className={styles.stepIcon}>2</div>
              <h3>Students binge-learn</h3>
              <p>Students buy or subscribe and learn at their own pace, anytime.</p>
            </article>
            <article className={styles.stepCard}>
              <div className={styles.stepIcon}>3</div>
              <h3>We handle the rest</h3>
              <p>Payments, analytics, and smart discovery are managed by BingeLearn.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="for-tutors" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.tutorGrid}>
            <div>
              <h2>Why tutors love BingeLearn</h2>
              <p className={styles.supportingText}>
                We are building a platform where tutors can teach their way, grow an audience, and earn from multiple formats without technical overhead.
              </p>
              <ul className={styles.benefitList}>
                <li>Freemium start with no upfront pressure</li>
                <li>Multiple income streams from one-to-many content</li>
                <li>Built-in analytics to optimize your offerings</li>
                <li>Fair, transparent commission model</li>
              </ul>
            </div>
            <aside className={styles.profileCard}>
              <div className={styles.avatar}>AL</div>
              <h3>Ana Lee</h3>
              <p>Math & SAT Tutor</p>
              <div className={styles.chips}>
                <span>Algebra</span>
                <span>Calculus</span>
                <span>SAT Math</span>
              </div>
              <p className={styles.rating}>4.9 stars (312 reviews)</p>
              <button className={styles.secondaryButton}>Follow</button>
            </aside>
          </div>
        </div>
      </section>

      <section id="pricing" className={styles.section}>
        <div className={styles.container}>
          <h2>Simple, creator-friendly pricing</h2>
          <div className={styles.pricingGrid}>
            <article className={styles.pricingCard}>
              <h3>Free starter</h3>
              <p className={styles.price}>$0</p>
              <ul>
                <li>Up to 3 courses</li>
                <li>Basic analytics</li>
                <li>Standard commission: 20%</li>
              </ul>
            </article>
            <article className={`${styles.pricingCard} ${styles.proCard}`}>
              <p className={styles.badge}>Most popular</p>
              <h3>Pro tutor</h3>
              <p className={styles.price}>$19/month</p>
              <ul>
                <li>Unlimited courses</li>
                <li>Better discovery placement</li>
                <li>Lower commission: 10%</li>
                <li>Advanced analytics</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2>Built on trust and safety</h2>
          <ul className={styles.trustList}>
            <li>Secure payments with protected transactions</li>
            <li>Transparent rating and review system</li>
            <li>Clear refund and content policy framework</li>
          </ul>
        </div>
      </section>

      <section id="faq" className={styles.section}>
        <div className={styles.container}>
          <h2>FAQ</h2>
          <div className={styles.faqList}>
            {faqItems.map((item, index) => (
              <article key={item.question} className={styles.faqItem}>
                <button type="button" onClick={() => toggleFaq(index)} className={styles.faqQuestion} aria-expanded={openIndex === index}>
                  {item.question}
                  <span>{openIndex === index ? "-" : "+"}</span>
                </button>
                {openIndex === index ? <p className={styles.faqAnswer}>{item.answer}</p> : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.ctaSection}`}>
        <div className={styles.container}>
          <h2>Ready to launch your tutoring brand?</h2>
          <p>Join BingeLearn as an early-stage tutor and help us shape the future of learning.</p>
          <button className={styles.primaryButton}>Apply as early tutor</button>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerLinks}>
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Contact us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

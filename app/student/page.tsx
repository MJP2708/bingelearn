"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

type Tutor = {
  id: string;
  name: string;
  subject: string;
  level: string;
  rating: number;
  reviews: number;
  hourlyRate: number;
  students: number;
  intro: string;
  tags: string[];
};

const tutors: Tutor[] = [
  {
    id: "t1",
    name: "Ana Lee",
    subject: "Algebra",
    level: "Middle School",
    rating: 4.9,
    reviews: 312,
    hourlyRate: 950,
    students: 1240,
    intro: "Explains tricky concepts with visual shortcuts and weekly practice plans.",
    tags: ["Exam Prep", "Homework Help", "Beginner Friendly"],
  },
  {
    id: "t2",
    name: "Marcus Chen",
    subject: "Physics",
    level: "High School",
    rating: 4.8,
    reviews: 201,
    hourlyRate: 1200,
    students: 860,
    intro: "Problem-solving focused sessions for AP Physics and fundamentals.",
    tags: ["AP Physics", "STEM", "Past Papers"],
  },
  {
    id: "t3",
    name: "Priya Nair",
    subject: "SAT Verbal",
    level: "Test Prep",
    rating: 4.7,
    reviews: 178,
    hourlyRate: 1100,
    students: 710,
    intro: "Helps students build confidence in reading and writing with measurable goals.",
    tags: ["SAT", "Reading", "Writing"],
  },
  {
    id: "t4",
    name: "David Park",
    subject: "Calculus",
    level: "High School",
    rating: 4.9,
    reviews: 265,
    hourlyRate: 1350,
    students: 950,
    intro: "Specializes in breaking down complex topics into practical step-by-step methods.",
    tags: ["Calculus AB", "Calculus BC", "Advanced"],
  },
];

const subjects = ["All", "Algebra", "Physics", "SAT Verbal", "Calculus"];
const levels = ["All", "Middle School", "High School", "Test Prep"];

export default function StudentHomePage() {
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("All");
  const [level, setLevel] = useState("All");
  const [maxRate, setMaxRate] = useState(1500);

  const filteredTutors = useMemo(() => {
    return tutors.filter((tutor) => {
      const matchQuery =
        query.trim().length === 0 ||
        tutor.name.toLowerCase().includes(query.toLowerCase()) ||
        tutor.subject.toLowerCase().includes(query.toLowerCase()) ||
        tutor.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()));

      const matchSubject = subject === "All" || tutor.subject === subject;
      const matchLevel = level === "All" || tutor.level === level;
      const matchRate = tutor.hourlyRate <= maxRate;

      return matchQuery && matchSubject && matchLevel && matchRate;
    });
  }, [query, subject, level, maxRate]);

  return (
    <div className={styles.page}>
      <header className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.navInner}>
            <Link href="/" className={styles.logo}>
              <span>Binge</span>Learn Students
            </Link>
            <div className={styles.navActions}>
              <Link href="/lessons" className={styles.ghostButton}>
                Browse lessons
              </Link>
              <Link href="/dashboard" className={styles.primaryButton}>
                Start learning
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.kicker}>Built for ambitious students</p>
              <h1>Level up faster with tutors that match your goals.</h1>
              <p>
                BingeLearn Student gives you curated learning paths, trusted tutors, and measurable progress so every study hour drives real outcomes.
              </p>
              <div className={styles.heroCtas}>
                <Link href="/lessons" className={styles.primaryButton}>
                  Explore learning paths
                </Link>
                <a href="#find-tutors" className={styles.secondaryButton}>
                  Find tutors now
                </a>
              </div>
            </div>
            <aside className={styles.statsCard}>
              <h3>What students unlock</h3>
              <ul>
                <li>
                  <strong>3x</strong> faster prep cycles with guided paths
                </li>
                <li>
                  <strong>2,900+</strong> tutor sessions booked monthly
                </li>
                <li>
                  <strong>4.8/5</strong> average session satisfaction
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2>Student plans in Thai baht</h2>
          <p className={styles.subtext}>Start free and upgrade when you want deeper mentorship, premium tracks, and priority support.</p>
          <div className={styles.planGrid}>
            <article className={styles.planCard}>
              <h3>Explorer</h3>
              <p className={styles.price}>฿0</p>
              <ul>
                <li>Access to free lesson catalog</li>
                <li>Basic tutor discovery</li>
                <li>Community study resources</li>
              </ul>
            </article>
            <article className={`${styles.planCard} ${styles.planFeatured}`}>
              <p className={styles.badge}>Best for exam prep</p>
              <h3>Student Plus</h3>
              <p className={styles.price}>฿490/month</p>
              <ul>
                <li>Premium structured learning tracks</li>
                <li>Priority tutor matching</li>
                <li>Progress analytics and weak-topic alerts</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section} id="find-tutors">
        <div className={styles.container}>
          <h2>Find your perfect tutor</h2>
          <p className={styles.subtext}>Filter by subject, level, and budget, then book your first session in minutes.</p>

          <div className={styles.filterPanel}>
            <div className={styles.searchBox}>
              <label htmlFor="search">Search tutors</label>
              <input
                id="search"
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Try: Algebra, SAT, beginner..."
              />
            </div>

            <div className={styles.controls}>
              <label>
                Subject
                <select value={subject} onChange={(event) => setSubject(event.target.value)}>
                  {subjects.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Level
                <select value={level} onChange={(event) => setLevel(event.target.value)}>
                  {levels.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Max rate (฿{maxRate}/hr)
                <input type="range" min={600} max={1500} step={50} value={maxRate} onChange={(event) => setMaxRate(Number(event.target.value))} />
              </label>
            </div>
          </div>

          <div className={styles.resultsHeader}>
            <h3>{filteredTutors.length} tutors found</h3>
            <p>Top matches based on your filters</p>
          </div>

          <div className={styles.tutorGrid}>
            {filteredTutors.map((tutor) => (
              <article key={tutor.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={styles.avatar}>{tutor.name.slice(0, 2).toUpperCase()}</div>
                  <div>
                    <h4>{tutor.name}</h4>
                    <p>
                      {tutor.subject} - {tutor.level}
                    </p>
                  </div>
                </div>

                <p className={styles.intro}>{tutor.intro}</p>

                <div className={styles.meta}>
                  <span>{tutor.rating.toFixed(1)} stars</span>
                  <span>{tutor.reviews} reviews</span>
                  <span>{tutor.students} students</span>
                </div>

                <div className={styles.tags}>
                  {tutor.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className={styles.cardBottom}>
                  <p>
                    <strong>฿{tutor.hourlyRate}</strong>/hour
                  </p>
                  <div className={styles.actions}>
                    <Link href="/tutors" className={styles.secondaryButton}>
                      View profile
                    </Link>
                    <Link href="/tutors" className={styles.primaryButton}>
                      Book trial
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.ctaSection}`}>
        <div className={styles.container}>
          <h2>Ready to binge-learn with confidence?</h2>
          <p>Join thousands of students improving grades and exam scores with BingeLearn.</p>
          <Link href="/dashboard" className={styles.primaryButton}>
            Start as student
          </Link>
        </div>
      </section>
    </div>
  );
}

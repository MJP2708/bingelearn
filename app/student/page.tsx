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
    hourlyRate: 28,
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
    hourlyRate: 35,
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
    hourlyRate: 32,
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
    hourlyRate: 40,
    students: 950,
    intro: "Specializes in breaking down complex topics into practical step-by-step methods.",
    tags: ["Calculus AB", "Calculus BC", "Advanced"],
  },
];

const subjects = ["All", "Algebra", "Physics", "SAT Verbal", "Calculus"];
const levels = ["All", "Middle School", "High School", "Test Prep"];

export default function StudentTutorFinderPage() {
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("All");
  const [level, setLevel] = useState("All");
  const [maxRate, setMaxRate] = useState(50);

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
      <section className={styles.hero}>
        <div className={styles.container}>
          <Link href="/" className={styles.backLink}>
            Back to home
          </Link>
          <h1>Find your perfect tutor</h1>
          <p>
            Discover high-impact tutors by subject, level, and budget. Preview ratings, teaching style, and social proof before booking a trial.
          </p>
        </div>
      </section>

      <section className={styles.searchSection}>
        <div className={styles.container}>
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
                Max rate (${maxRate}/hr)
                <input type="range" min={15} max={50} value={maxRate} onChange={(event) => setMaxRate(Number(event.target.value))} />
              </label>
            </div>
          </div>

          <div className={styles.resultsHeader}>
            <h2>{filteredTutors.length} tutors found</h2>
            <p>Top matches based on your filters</p>
          </div>

          <div className={styles.tutorGrid}>
            {filteredTutors.map((tutor) => (
              <article key={tutor.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={styles.avatar}>{tutor.name.slice(0, 2).toUpperCase()}</div>
                  <div>
                    <h3>{tutor.name}</h3>
                    <p>
                      {tutor.subject} · {tutor.level}
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
                    <strong>${tutor.hourlyRate}</strong>/hour
                  </p>
                  <div className={styles.actions}>
                    <button type="button" className={styles.secondaryButton}>
                      View profile
                    </button>
                    <button type="button" className={styles.primaryButton}>
                      Book trial
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

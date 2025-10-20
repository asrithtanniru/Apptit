# Apptit

Apptit is a centralized job aggregation platform that scrapes listings from **LinkedIn**, **Glassdoor**, and **Internshala**, providing a unified search experience with improved speed and reliability through multithreading.

---

## 🌟 Overview

Traditional job searches require users to switch between multiple sites and filter through duplicate results.
**Apptit** solves this by collecting and consolidating data from top job platforms into one place with an intuitive interface and robust backend.

---

## 🚀 Key Features

* Unified job aggregation from LinkedIn, Glassdoor, and Internshala
* Fast and parallel scraping using multithreading
* Clean and responsive frontend built with Next.js and TailwindCSS
* RESTful API backend powered by FastAPI
* Centralized PostgreSQL database for storage and deduplication
* Lightweight deployment and modular structure

---

## 🛠️ Tech Stack

* **Frontend:** Next.js, TailwindCSS
* **Backend:** FastAPI, Python (Selenium, AsyncIO)
* **Database:** PostgreSQL
* **Other:** Multithreading, REST APIs

---

## 💡 Project Setup

### Frontend

```bash
cd apptit
npm install
npm run dev
```

### Backend

```bash
cd apptit-backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## 📂 Folder Structure

```
Apptit
│
├── frontend/         # Next.js + TailwindCSS frontend
├── backend/          # FastAPI + Selenium backend
└── database/         # PostgreSQL schema and ORM models
```

---
[Backend Repo](https://github.com/AsrithTanniru/Apptit-Backend)


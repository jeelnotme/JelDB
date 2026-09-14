# Biodata Form

A small Node.js + Express + EJS app that collects biodata through a web form
and stores it in a MySQL database.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create the database and table in MySQL:
   ```sql
   CREATE DATABASE biodata_db;

   USE biodata_db;

   CREATE TABLE biodata (
       id INT AUTO_INCREMENT PRIMARY KEY,
       fn VARCHAR(100),
       ln VARCHAR(100),
       age VARCHAR(10),
       gender VARCHAR(50),
       birthday VARCHAR(50),
       address VARCHAR(255),
       civilStatus VARCHAR(50),
       phone VARCHAR(50),
       education VARCHAR(100),
       course VARCHAR(100),
       father VARCHAR(100),
       mother VARCHAR(100),
       siblings VARCHAR(10),
       hobbies VARCHAR(255),
       skills VARCHAR(255)
   );
   ```
   `conn.js` connects as `root` with no password to a database called
   `biodata_db` — update those values in `conn.js` if your local MySQL setup
   is different.

3. Run the app:
   ```
   npm start
   ```
   The server listens on `http://localhost:8000`.

## What was fixed vs. the original

- `location.href = '/'` — the original had a typo (`local.href`) that broke
  the redirect after a successful submit. Fixed here so the form actually
  returns to the home page after inserting data.
- Removed the unused `init` package from `package.json` (it wasn't used
  anywhere in the code).

## Design update

The form was restyled to match a reference layout: a full-width banner with
the title, an "Info" callout box, and sections with underlined field rows
instead of boxed inputs.

- `public/style.css` is now a **separate file** instead of inline `<style>`
  in the EJS template. Keeping CSS separate from markup makes it easier to
  reuse, and easier to find things when the file gets bigger.
- `app.js` now includes `app.use(express.static('public'));`. Express does
  not serve files from a folder automatically — without this line, the
  browser's request for `/style.css` would 404, even though the file exists
  on disk. This is a common beginner trip-up: static assets (CSS, images,
  client-side JS) need to be explicitly told which folder to serve from.
- Sections were reordered to Personal details → Family background →
  Education & profession first (matching the reference), with the rest of
  the original fields (civil status, contact, hobbies, skills) kept below.

## Accessibility improvements

`views/index.ejs` was updated to be screen-reader and keyboard friendly:

- `<label for="...">` now points at each input's matching `id`, so screen
  readers announce the correct label when an input receives focus (the
  original labels weren't associated with any input at all).
- Each section is a `<fieldset>` with a `<legend>` instead of a plain
  `<h2>`, so assistive tech announces "Personal Information, group" before
  reading the fields inside it.
- Required fields (`fn`, `ln`, `age`) are marked with `required` and
  `aria-required="true"`, and visually flagged with a "(required)" label.
- A "Skip to form" link appears on keyboard focus, letting keyboard users
  jump past repeated content.
- Custom `:focus-visible` outlines replace the removed default outline, so
  keyboard users can still see which field is focused.
- A JavaScript validation layer intercepts submission, marks invalid
  fields with `aria-invalid` and an inline error message linked via
  `aria-describedby`, moves focus to the first invalid field, and
  announces a summary through a visually-hidden `aria-live="polite"`
  region — so screen-reader users hear what went wrong instead of relying
  on the browser's default validation bubble alone.
- Added `lang="en"` and a `viewport` meta tag, both missing before.

## Known issues left for you to practice fixing

These are intentionally left as-is so you can work on them yourself:

- **SQL injection**: `app.js` builds the `INSERT` query with template
  literals instead of parameterized queries. Try rewriting it with
  `conn.query('INSERT INTO biodata (...) VALUES (?, ?, ...)', [values])`.
- **No input validation**: none of the form fields are checked for empty or
  malformed values before hitting the database.
- **Hardcoded DB credentials**: `conn.js` hardcodes `root` with an empty
  password. Consider moving these into environment variables with `dotenv`.
- **Error handling**: `if (err) throw err` crashes the whole server on any
  DB error instead of returning a proper error response.

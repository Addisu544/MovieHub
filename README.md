## MovieHub

MovieHub is a production-grade movie browsing experience powered by TMDB.

### Setup

Create a `.env` file (see `.env.example`) and provide your TMDB API key:

```bash
cp .env.example .env
```

Install deps and start the dev server:

```bash
npm install
npm run dev
```

### Environment variables

- **`VITE_TMDB_KEY`**: TMDB API key used for all API requests.

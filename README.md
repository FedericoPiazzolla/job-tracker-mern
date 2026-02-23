# Job Tracker MERN

Applicazione full-stack per tracciare candidature di lavoro, aggiornarne lo stato e mantenere una panoramica ordinata del percorso di ricerca.

Progetto pensato come portfolio tecnico: focus su autenticazione, CRUD completo, UX pulita e architettura client/server separata.

## Obiettivo del progetto

Durante la ricerca di lavoro è facile perdere informazioni tra email, fogli sparsi e note manuali.  
`Job Tracker` centralizza tutto in un unico flusso:

- creazione candidature
- modifica stato e dettagli
- consultazione rapida dell’elenco
- eliminazione sicura con conferma

## Funzionalità principali

- Autenticazione utenti con `signup` / `login`
- Gestione sessione lato client con token JWT
- CRUD candidature:
- creazione candidatura
- visualizzazione dettaglio candidatura
- modifica candidatura
- eliminazione candidatura con modal di conferma
- Filtri e ordinamento nell’elenco candidature
- Feedback UX con toast (create/update/delete)
- Interfaccia responsive (desktop/mobile)

## Stack tecnologico

### Tecnologie usate (in evidenza)

- **Frontend**
- **React 19** per UI component-based
- **React Router** per routing SPA
- **Vite** per dev/build veloci
- **CSS custom** per UI minimale/elegante
- **React Transition Group** per animazioni/transizioni

- **Backend**
- **Node.js + Express** per API REST
- **MongoDB + Mongoose** per persistenza e modelli dati
- **express-validator** per validazione input
- **JWT (`jsonwebtoken`)** per autenticazione stateless
- **bcryptjs** per hashing password
- **dotenv** per gestione variabili ambiente
- **body-parser** per parsing payload JSON

### Librerie/strumenti chiave

- **Auth:** JWT + middleware `check-auth`
- **HTTP client custom:** `useHttpClient` (loading/error/abort handling)
- **Form handling custom:** `useForm` + validators
- **UX:** modal di conferma, toast di feedback, spinner di caricamento

## Architettura

- `client/`: SPA React
- `server/`: API REST Express
- comunicazione via HTTP (`fetch`) con hook custom `useHttpClient`
- autenticazione JWT tramite middleware `check-auth` sulle rotte protette

## Rotte principali

### Frontend

- `/` landing page
- `/auth` autenticazione
- `/jobs` elenco candidature utente autenticato
- `/jobs/new` creazione candidatura
- `/jobs/:jobId` dettaglio/modifica candidatura

### API Backend

- `POST /api/users/signup`
- `POST /api/users/login`
- `GET /api/jobs/user/:uid`
- `GET /api/jobs/:jid`
- `POST /api/jobs` (protetta)
- `PATCH /api/jobs/:jid` (protetta)
- `DELETE /api/jobs/:jid` (protetta)

## Setup locale

Prerequisiti:

- Node.js 18+
- npm
- MongoDB Atlas (o MongoDB locale)

### 1) Clone repository

```bash
git clone <repo-url>
cd job-tracker-mern
```

### 2) Installazione dipendenze

```bash
cd client && npm install
cd ../server && npm install
```

### 3) Avvio ambiente di sviluppo

Prima di avviare il backend configura le variabili ambiente:

```bash
cd server
```

Compila il file `.env` con i tuoi valori reali:

- `MONGODB_URI`
- `JWT_KEY`
- `PORT` (opzionale, default `5010`)

Poi avvia:

Terminale 1 (backend):

```bash
cd server
npm run dev
```

Terminale 2 (frontend):

```bash
cd client
npm run dev
```

Frontend disponibile su `http://localhost:5173`  
Backend disponibile su `http://localhost:5010`

## Sicurezza (stringhe sensibili)

Le stringhe sensibili **non** sono hardcoded nel codice:

- connessione DB via `MONGODB_URI`
- secret JWT via `JWT_KEY`

Entrambe vengono lette da variabili ambiente (`server/.env`).

## Build produzione (frontend)

```bash
cd client
npm run build
```

## Struttura del progetto (sintesi)

```text
job-tracker-mern/
  client/
    src/
      jobs/
      shared/
      user/
  server/
    controllers/
    middleware/
    models/
    routes/
```

## Scelte implementative rilevanti

- Hook custom `useAuth` per gestione token/sessione lato client
- Hook custom `useHttpClient` con gestione loading/error/abort
- Rotte frontend semplificate e leggibili (`/jobs/...`)
- Conferma eliminazione con modal custom invece di `window.confirm`
- UI feedback immediato tramite toast

## Possibili miglioramenti futuri

- Aggiungere test automatici backend (controller jobs/users)
- Aggiungere paginazione e ricerca full-text sulle candidature
- Aggiungere dashboard statistiche avanzate

## Contesto d’uso (portfolio)

Questo progetto dimostra competenze pratiche su:

- sviluppo full-stack JavaScript
- progettazione API REST e integrazione frontend
- gestione autenticazione/autorizzazione
- qualità UX/UI e refactoring incrementale

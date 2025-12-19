# Node.js Todo Application

A full-stack todo application built with Node.js, Express, and vanilla JavaScript. Features a beautiful, modern UI with complete CRUD operations.

## Features

- ✅ Create, Read, Update, and Delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Edit todo text inline
- ✅ Filter todos (All, Active, Completed)
- ✅ Clear all completed todos
- ✅ Real-time todo counter
- ✅ Beautiful, responsive UI
- ✅ Smooth animations and transitions
- ✅ RESTful API backend

## Project Structure

```
.
├── server.js              # Express backend server
├── package.json           # Project dependencies
├── public/                # Frontend files
│   ├── index.html        # Main HTML file
│   ├── styles.css        # CSS styling
│   └── app.js            # Frontend JavaScript
└── README.md             # Documentation
```

## Installation

1. Clone the repository or navigate to the project directory

2. Install dependencies:
```bash
npm install
```

## Running the Application

Start the server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The application will be available at: `http://localhost:3000`

## API Endpoints

### Get all todos
```
GET /api/todos
```

### Get a single todo
```
GET /api/todos/:id
```

### Create a new todo
```
POST /api/todos
Body: { "text": "Todo text" }
```

### Update a todo
```
PUT /api/todos/:id
Body: { "text": "Updated text", "completed": true/false }
```

### Delete a todo
```
DELETE /api/todos/:id
```

### Delete all completed todos
```
DELETE /api/todos/completed/all
```

## Usage

1. **Add a todo**: Type your task in the input field and click "Add Todo" or press Enter
2. **Complete a todo**: Click the checkbox next to a todo item
3. **Edit a todo**: Click the edit (✏️) icon, modify the text, and save
4. **Delete a todo**: Click the delete (🗑️) icon
5. **Filter todos**: Use the All, Active, or Completed buttons to filter your view
6. **Clear completed**: Click "Clear Completed" to remove all finished tasks

## Technologies Used

- **Backend**: Node.js, Express
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Data Storage**: JSON file-based persistence

## Data Persistence

The application now includes automatic data persistence:

- **Storage**: Todos are saved to a JSON file (`data/todos.json`)
- **Automatic saving**: Data is saved after every create, update, or delete operation
- **Recovery**: Data is automatically loaded on server restart
- **Docker volumes**: When using Docker, data persists across container restarts

### Configuration

Set the data file location using the `DATA_FILE` environment variable:
```bash
DATA_FILE=/path/to/todos.json npm start
```

Default location: `./data/todos.json`

## Features in Detail

### Frontend
- Modern, gradient-based design
- Fully responsive layout
- Smooth animations and transitions
- Intuitive user interface
- Real-time updates

### Backend
- RESTful API architecture
- Express middleware for parsing JSON
- File-based data persistence
- CORS-ready
- Error handling
- Input validation

## 🐳 Projet de Dockerisation

Un projet de containerisation optimisée est en cours pour cette application (durée : 7 heures). Consultez les documents suivants :

- **[PROJET_DOCKERISATION.md](./PROJET_DOCKERISATION.md)** - Énoncé complet du projet (objectifs, livrables, grille d'évaluation)
- **[DOCKERIZATION_CHECKLIST.md](./DOCKERIZATION_CHECKLIST.md)** - Checklist détaillée avec commandes de référence

### Objectifs du Projet

- 🐳 Containerisation avec Docker multi-stage
- ⚡ Optimisation de l'image (< 150 MB)
- 🔒 Sécurité renforcée (Trivy, Hadolint)
- 📚 Documentation complète (architecture, sécurité)
- ✅ Tests et validation

### Planning (7 heures)

1. **Phase 1** (2h30) : Dockerisation de base - Dockerfile multi-stage + Docker Compose avec volume
2. **Phase 2** (1h30) : Optimisation - Réduction taille, layer caching
3. **Phase 3** (2h) : Sécurité - Scans Trivy/Hadolint, corrections
4. **Phase 4** (1h) : Documentation - README, docs/DOCKER.md, docs/SECURITY.md

### Bonus Optionnel

- 🎁 **Migration vers MongoDB** (+5 pts) : Remplacer le volume JSON par une base de données NoSQL
  - Service MongoDB dans docker-compose
  - Backend adapté avec Mongoose
  - Meilleure scalabilité et performance
  - Documentation complète de la migration

## Future Enhancements

- [ ] **MongoDB integration** (bonus du projet Docker - voir énoncé)
- [ ] User authentication & authorization
- [ ] Todo categories/tags
- [ ] Due dates and reminders
- [ ] Search functionality
- [ ] Drag and drop reordering
- [ ] Dark mode toggle
- [ ] Export/import todos
- [ ] Collaborative features

## License

ISC

## Author

Built with Node.js and Express

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
- **Data Storage**: In-memory (array-based)

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
- CORS-ready
- Error handling
- Input validation

## 🐳 Projet de Dockerisation

Un projet complet de containerisation est en cours pour cette application. Consultez les documents suivants :

- **[PROJET_DOCKERISATION.md](./PROJET_DOCKERISATION.md)** - Énoncé complet du projet de dockerisation
- **[DOCKERIZATION_CHECKLIST.md](./DOCKERIZATION_CHECKLIST.md)** - Checklist de suivi du projet

### Objectifs du Projet Docker

- ✅ Containerisation avec Docker multi-stage
- ✅ Optimisation de l'image (< 200 MB)
- ✅ Sécurité renforcée (scans, bonnes pratiques)
- ✅ Pipeline CI/CD complet avec GitHub Actions
- ✅ Déploiement automatisé
- ✅ Monitoring et health checks

### Phases Prévues

1. **Phase 1** : Dockerisation de base (Dockerfile + Docker Compose)
2. **Phase 2** : Sécurité et optimisation
3. **Phase 3** : Intégration Continue (CI)
4. **Phase 4** : Déploiement Continu (CD)
5. **Phase 5** : Documentation et optimisation

## Future Enhancements

- [ ] Database integration (MongoDB, PostgreSQL)
- [ ] User authentication
- [ ] Todo categories/tags
- [ ] Due dates and reminders
- [ ] Search functionality
- [ ] Drag and drop reordering
- [ ] Dark mode toggle
- [ ] Export/import todos

## License

ISC

## Author

Built with Node.js and Express

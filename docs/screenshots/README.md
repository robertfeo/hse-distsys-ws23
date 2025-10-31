# Application Screenshots

This directory contains screenshots and demo materials for the Todo List application.

## 📸 Capturing Screenshots

To add screenshots to this directory, follow these guidelines:

### Recommended Screenshots

1. **Application Overview**
   - `01-homepage.png` - Main todo list view with some sample todos
   - `02-empty-state.png` - Empty state when no todos exist

2. **CRUD Operations**
   - `03-add-todo.png` - Add new todo modal/form
   - `04-edit-todo.png` - Edit existing todo
   - `05-delete-confirmation.png` - Delete confirmation dialog
   - `06-search-feature.png` - Search functionality in action

3. **UI States**
   - `07-completed-todos.png` - View with completed todos
   - `08-responsive-mobile.png` - Mobile responsive view
   - `09-responsive-tablet.png` - Tablet responsive view

4. **Technical Features**
   - `10-jaeger-tracing.png` - Jaeger UI showing traces
   - `11-api-response.png` - Example API response (Postman/Browser DevTools)
   - `12-docker-containers.png` - Running Docker containers

5. **Demo GIF**
   - `demo.gif` - Short animated demo showing CRUD operations (max 5MB)

### Screenshot Guidelines

**Quality:**
- Use high resolution (at least 1920x1080 for desktop)
- Use PNG format for static images
- Use GIF or MP4 for animations (convert MP4 to GIF if needed)
- Ensure good contrast and readability

**Content:**
- Use realistic but non-sensitive data
- Ensure UI is clean and professional
- Hide any personal information
- Show the complete feature being demonstrated

**Naming:**
- Use descriptive, lowercase names with hyphens
- Number files if order matters (01-, 02-, etc.)
- Use standard extensions (.png, .gif, .jpg)

### Tools for Creating Screenshots

**Screenshot Tools:**
- **macOS**: Cmd + Shift + 4
- **Windows**: Windows + Shift + S (Snipping Tool)
- **Linux**: Gnome Screenshot, Flameshot
- **Browser Extensions**: Full Page Screen Capture, Nimbus Screenshot

**GIF Creation:**
- **ScreenToGif** (Windows)
- **Kap** (macOS)
- **Peek** (Linux)
- **LICEcap** (Cross-platform)

**Video to GIF Conversion:**
```bash
# Using ffmpeg
ffmpeg -i demo.mp4 -vf "fps=10,scale=800:-1:flags=lanczos" -c:v gif demo.gif

# Using online tools
# - CloudConvert (https://cloudconvert.com/)
# - EZGIF (https://ezgif.com/)
```

### Adding Screenshots to Documentation

After adding screenshots here, reference them in the main README:

```markdown
## 📸 Application Preview

### Main Interface
![Todo List Main View](docs/screenshots/01-homepage.png)

### Add New Todo
![Add Todo Modal](docs/screenshots/03-add-todo.png)

### Demo
![Application Demo](docs/screenshots/demo.gif)
```

### Optimization

Before committing large images, optimize them:

```bash
# Install optimization tools
npm install -g imagemin-cli

# Optimize PNGs
imagemin docs/screenshots/*.png --out-dir=docs/screenshots/optimized

# Optimize JPGs
imagemin docs/screenshots/*.jpg --out-dir=docs/screenshots/optimized

# For GIFs, use gifsicle
gifsicle -O3 --colors 256 demo.gif -o demo-optimized.gif
```

### File Size Limits

- **PNG/JPG**: Keep under 500KB each
- **GIF**: Keep under 5MB
- **Total directory**: Keep under 20MB

### Current Screenshots

Add a list here as you add screenshots:

- [ ] `01-homepage.png` - Main application view
- [ ] `02-empty-state.png` - Empty state
- [ ] `03-add-todo.png` - Add todo feature
- [ ] `04-edit-todo.png` - Edit todo feature
- [ ] `05-delete-confirmation.png` - Delete confirmation
- [ ] `06-search-feature.png` - Search functionality
- [ ] `07-completed-todos.png` - Completed todos view
- [ ] `08-responsive-mobile.png` - Mobile view
- [ ] `09-responsive-tablet.png` - Tablet view
- [ ] `10-jaeger-tracing.png` - Jaeger UI
- [ ] `11-api-response.png` - API example
- [ ] `12-docker-containers.png` - Docker setup
- [ ] `demo.gif` - Application demo

---

## 🎬 Creating a Demo GIF

### Step-by-Step Demo Script

1. **Start with empty state** (2 seconds)
2. **Add first todo** - "Buy groceries" (3 seconds)
3. **Add second todo** - "Complete documentation" (3 seconds)
4. **Toggle first todo as complete** (2 seconds)
5. **Edit second todo** (3 seconds)
6. **Search for a todo** (3 seconds)
7. **Delete a todo** (3 seconds)
8. **End with final state** (2 seconds)

**Total duration**: 20-25 seconds

### Recording Tips

- Clear browser cache and localStorage before recording
- Use a clean, distraction-free browser window
- Record at 10-15 FPS for smaller file sizes
- Keep mouse movements smooth and deliberate
- Pause slightly between actions for clarity
- Use a standard screen resolution (1920x1080 or 1280x720)

---

## 📋 Screenshot Checklist

Before considering the screenshots complete:

- [ ] All key features are demonstrated
- [ ] Images are optimized for web
- [ ] File sizes are reasonable
- [ ] Screenshots are referenced in main README
- [ ] Mobile responsive views are included
- [ ] Technical screenshots (Jaeger, API) are added
- [ ] Demo GIF shows complete workflow
- [ ] All images have descriptive alt text in documentation

---

**Note**: If you don't have access to capture screenshots yourself, you can:
1. Ask a collaborator to add them
2. Create an issue requesting screenshots
3. Use placeholder images temporarily

**Contributors**: When adding screenshots, please update this README with the list of files and their purposes.

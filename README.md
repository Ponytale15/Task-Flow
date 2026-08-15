# TaskFlow

TaskFlow is a lightweight browser-based daily task manager for creating, organizing, editing, completing, and deleting tasks. It provides separate views for pending and completed tasks, keeps task data in the browser, and displays task timestamps.

## Features

- Add new tasks
- Prevent empty tasks from being added
- Limit task text to 200 characters
- Mark tasks as completed
- Undo completed tasks
- Edit pending tasks
- Cancel an edit
- Delete tasks
- View pending and completed task counts
- Display when each task was added
- Display when completed tasks were completed
- Persist tasks using browser `localStorage`
- Automatically display the current date
- Press **Enter** to add a task
- Responsive two-column/single-column layout
- HTML escaping for task text before rendering

## Technologies

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Browser Local Storage API
- Google Fonts — Inter

## Project Structure

```text
TaskFlow/
├── index.html
├── script.js
├── style.css
└── README.md
```

### `index.html`

Defines the TaskFlow interface, including:

- Application header and logo
- Current-date display
- New-task input
- Add Task button
- Pending task list
- Completed task list
- Task count badges
- Empty-state messages

The page loads the stylesheet and JavaScript file used by the application.

## `script.js`

Contains the application's task-management logic.

### Task storage

Tasks are stored in `localStorage` under the key:

```text
taskflow_tasks
```

The application loads previously saved tasks when it starts and saves changes whenever tasks are added, edited, completed, undone, or deleted.

### Task data

Each task contains information similar to:

```javascript
{
    id: "...",
    text: "Example task",
    done: false,
    addedAt: 1234567890,
    doneAt: null
}
```

- `id` — unique task identifier
- `text` — task description
- `done` — whether the task is completed
- `addedAt` — timestamp for when the task was created
- `doneAt` — timestamp for when the task was completed

### Adding tasks

A task is added after the user enters text and clicks **Add Task** or presses **Enter**. Empty input is rejected, and the input is cleared after a successful addition.

### Completing and undoing tasks

Tasks can be moved between the pending and completed sections by changing their `done` state. Completing a task records a completion timestamp; undoing it removes that timestamp.

### Editing tasks

Pending tasks can be edited directly. The application replaces the task text with an input field and provides **Save** and **Cancel** controls.

### Deleting tasks

The delete action removes the selected task from the task array and updates browser storage and the interface.

### Rendering

The application separates tasks into:

- Pending tasks
- Completed tasks

It then updates the corresponding counts and lists.

### Input safety

Task text is escaped before being inserted into generated HTML. This prevents characters such as `<`, `>`, `&`, and `"` from being interpreted as HTML when task content is rendered.

## `style.css`

Provides the visual design for TaskFlow.

The interface uses:

- Inter typography
- Light neutral background
- White content cards
- Blue primary actions
- Green completed-task actions
- Orange undo/pending indicators
- Red delete styling
- Rounded cards and buttons
- Hover transitions
- Responsive layouts

On screens narrower than 640px, the pending and completed task panels switch from two columns to a single column.

## How the Application Works

### 1. Start the application

Open `index.html` in a modern web browser.

### 2. Add a task

Enter a task in the **New Task** field and click **Add Task**.

You can also press **Enter** while the input is focused.

### 3. Manage the task

For pending tasks, you can:

- Mark the task as done
- Edit the task
- Delete the task

For completed tasks, you can:

- Undo completion
- Delete the task

### 4. Data persistence

TaskFlow saves the current task list to browser `localStorage`. Reloading the page therefore keeps previously saved tasks in the same browser storage.

## Application Flow

```text
User enters task
       │
       ▼
Validate input
       │
       ▼
Create task object
       │
       ▼
Save to localStorage
       │
       ▼
Render task lists
       │
       ├── Pending
       │
       └── Completed
```

When a task is updated:

```text
User action
    │
    ▼
Update task state
    │
    ▼
Save to localStorage
    │
    ▼
Re-render interface
```

## Data Storage

TaskFlow uses browser storage rather than a backend database.

| Data | Storage |
|---|---|
| Task list | `localStorage` |
| Storage key | `taskflow_tasks` |
| Task text | Browser storage |
| Completion state | Browser storage |
| Added timestamp | Browser storage |
| Completion timestamp | Browser storage |

### Important limitation

Because data is stored in `localStorage`, tasks are tied to the browser/device where they were created. The project does not currently provide user accounts, cloud synchronization, or a server-side database.

## User Interface

The application has two primary task sections:

### Pending

Shows tasks that still need to be completed and displays the current number of pending tasks.

### Completed

Shows completed tasks and displays the number of completed tasks.

Each task displays its creation time, and completed tasks also display their completion time.

## Responsive Design

TaskFlow uses a two-column layout for pending and completed tasks on larger screens. At smaller screen widths, the layout changes to a single column to make the application easier to use on mobile-sized displays.

## Running Locally

No build process or external package installation is required.

1. Download or clone the project.
2. Keep `index.html`, `script.js`, and `style.css` in the same directory.
3. Open `index.html` in a modern browser.
4. Start adding tasks.

For development, you can also use a local development server such as VS Code Live Server.

## Browser Requirements

TaskFlow requires a browser with support for:

- JavaScript
- `localStorage`
- Modern DOM APIs
- CSS Grid and Flexbox

Current versions of common modern browsers should support the application's core functionality.

## Possible Future Improvements

Potential extensions include:

- Task categories
- Priority levels
- Due dates
- Search and filtering
- Sorting
- Dark mode
- Drag-and-drop task ordering
- Task completion statistics
- Recurring tasks
- Notifications and reminders
- User accounts
- Cloud synchronization
- Backend API
- Database persistence
- Authentication
- Automated tests
- Improved accessibility
- Keyboard shortcuts
- Import/export of tasks

## Learning Objectives

This project demonstrates practical frontend development concepts including:

- DOM manipulation
- Event handling
- JavaScript arrays and objects
- CRUD-style task operations
- Browser storage
- Form/input validation
- Dynamic HTML generation
- State management
- Responsive CSS
- CSS Grid and Flexbox
- Basic client-side input safety
- Timestamp handling

## License

No specific license is defined in the provided project files. If this project will be distributed publicly, add an appropriate license file and update this section accordingly.

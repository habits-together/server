# Habits Together Server

This is the Firebase backend for the Habits Together app. It uses Firebase Cloud Functions and Firestore for data storage.

## Prerequisites

- Node.js v18.20.5 (use nvm to manage Node versions)
- Firebase CLI (`npm install -g firebase-tools`)
- Firebase project credentials (`serviceKey.json`)

## Setup

1. Navigate to the functions directory:

```bash
cd functions
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the `functions` directory:

```bash
GOOGLE_APPLICATION_CREDENTIALS="./serviceKey.json"
```

4. Place your `serviceKey.json` in the `functions` directory (obtain this from a team member)

## Development

### Emulator Data Management

The emulators support data persistence to help maintain consistent test data:

- `npm run em` - Starts emulators and loads previously saved data. When stopped (Ctrl+C), it saves any changes to the data directory.
- `npm run em:fresh` - Starts emulators with a clean slate and runs the seeding script to populate with fresh test data. Changes are saved on exit.
- `npm run seed` - Manually runs the database seeding script to populate with test data.

Note: The data directory is gitignored to prevent committing test data. New developers should run `npm run em:fresh` to generate their initial test data.

### Cloud Functions Development

When making changes to cloud functions, you need to rebuild the TypeScript files for the changes to take effect:

```bash
npm run build
```

This command should be run after making any changes to function code, as the emulator serves the compiled JavaScript files.

## Available Scripts

- `npm run em` - Start emulators with data persistence
- `npm run em:fresh` - Start emulators with fresh seeded data
- `npm run seed` - Run the database seeding script
- `npm run build` - Build TypeScript files
- `npm run deploy` - Deploy functions to Firebase
- `npm run logs` - View Firebase function logs

## Deployment

To deploy to production:

1. Ensure you're logged in:

```bash
firebase login
```

2. Select the correct project:

```bash
firebase use habits-together
```

3. Deploy functions:

```bash
npm run deploy
```

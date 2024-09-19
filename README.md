
# Birthday Notifier

A web-based birthday notification system using Vue.js and Firebase. This project enables users to add servers and birthdays and send birthday notifications to Discord channels.

## Features

- **Server management**: Add and modify servers that will receive birthday notifications.
- **Birthday management**: Add and view birthdays, including monthly overviews.
- **Discord notifications**: Automatically sends birthday notifications to designated Discord channels.
- **Vuetify Integration**: Beautiful UI powered by Vuetify components.
- **Firebase Hosting**: Deployed using Firebase Hosting with GitHub Actions for CI/CD.

## Project Setup

### Prerequisites

- Node.js
- Firebase CLI
- A Discord server with webhook access

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/suhrusai/birthday-notifier.git
   cd birthday-notifier
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Firebase:
   Ensure that Firebase is set up in your project. Update `.firebaserc` and `firebase.json` to match your Firebase project settings.

4. Set up Discord Webhooks:
   Add the webhook URLs for the servers where birthday notifications will be sent.

### Compiles and Hot-Reloads for Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Deploy to Firebase

Ensure Firebase CLI is installed and authenticated:

```bash
firebase deploy
```

## GitHub Actions CI/CD

This project uses GitHub Actions for Firebase hosting. You can find the workflow configuration under `.github/workflows`.

- `firebase-hosting-merge.yml` handles automatic deployments on merge to the main branch.
- `firebase-hosting-pull-request.yml` previews deployments for pull requests.

### Customize Configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

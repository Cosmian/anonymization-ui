This is the main UI for Cosmian CipherCompute and ZeroTrust

# Cosmian Ochestrator

## Authentication

Please provide your Auth0 informations in `.env` file:

```
REACT_APP_AUTH0_DOMAIN="example.us.auth0.com"
REACT_APP_AUTH0_CLIENT_ID="xxxxxxxxx"
```

---

## Features

This app can run 3 differents features:

- Ciphercompute with MPC. Please provide this environment variable: `REACT_APP_FEATURE_ENABLED="ciphercompute"`
- SGX Enclave demo: `REACT_APP_FEATURE_ENABLED="enclave"`
- Merging tool demo: `REACT_APP_FEATURE_ENABLED="merging_tool"`

### Backend

Add url to your backend. e.g.

- `REACT_APP_CIPHERCOMPUTE_API_URL="http://localhost:9000"`
- `REACT_APP_ENCLAVE_API_URL="http://localhost:9999"`
- `REACT_APP_MERGING_TOOL_API_URL="http://localhost:9009"`

---

## Start application

After providing the required environement variable you can run the app in the development mode:

```
npm start
```

Then open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## Tests with cypress

```
npm run cypress:open // opens the Cypress test runner in default browser
```

```
npm run test:component // Component testing with Cypress test runner
```

```
npm run test:e2e // run all Cypress tests headless
```

See [docs.cypress.io](https://docs.cypress.io/guides/overview/why-cypress) for more information.

---

## Storybook

Start Storybook and see Cosmian design system, components and resources used for our products with this command:

```
npm run storybook
```

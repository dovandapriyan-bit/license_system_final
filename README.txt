FINAL LICENSE SYSTEM (FRONTEND-ONLY) - READY TO DEPLOY

Files included:
- index.html       -> User activation page
- admin.html       -> Admin dashboard (requires Firebase Auth admin user)
- js/firebase-config.js -> Firebase config (already filled)
- js/main.js       -> User logic (activation, listing)
- js/admin.js      -> Admin logic (login, create license, revoke)
- css/style.css
- firestore.rules  -> Recommended Firestore rules
- README.txt

Quick deploy (GitHub Pages):
1. Create a new GitHub repo (e.g., license-panel) and push these files to repo root.
2. Enable GitHub Pages (branch main). Site URL will be https://<username>.github.io/<repo>/
3. In Firebase Console (project license-system-ba060):
   - Authentication -> Sign-in method -> enable Email/Password.
   - Authentication -> Users -> Add user -> create admin account (email/password).
   - Firestore -> Rules -> paste contents of firestore.rules and Publish.
   - Firestore -> Data -> (optional) add a license document:
       collection: licenses
       doc id: lic_demo1 (auto-id allowed)
       fields: licenseId, licenseKey, productId, userEmail, expiryDate (YYYY-MM-DD), status, createdAt (timestamp)
4. Open admin.html on your site, login, create licenses.
5. Open index.html to test activation.

Security notes:
- Frontend-only writes to Firestore from browser. For production, move admin write ops to a secure backend or restrict writes with custom claims.
- Do not expose sensitive secrets in client-side code. The firebase config here is required for client SDK, but further secrets (service account) must not be in browser.

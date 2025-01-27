
-   setup
    - Use node **v18.20.5**
    - `npm install`
    -   get `ts-node`
    -   get `serviceKey.json` from a trusted source (discord) and put in the the functions directory
        -   `export GOOGLE_APPLICATION_CREDENTIALS="path/to/serviceKey.json"` (unix)
        -   `$env:GOOGLE_APPLICATION_CREDENTIALS="path\to\serviceKey.json"` (powershell)
        -   `set GOOGLE_APPLICATION_CREDENTIALS="path\to\serviceKey.json"` (cmd)

-   start emulator
    -   `cd .\functions\`
    -   `npm run em`
    -   make sure firestore running on port `8080`
        -   if not, make sure port is free
            -   **windows** -> `netstat -ano | findstr :8080`. Find the `pid` of the thing occupying the port. Then run `taskkill /PID <pid> /F`.
        -   restart the emulator
    -   to populate the emulator firestore run `npm run seed` in a different terminal.

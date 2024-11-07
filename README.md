# How to run

In the root directory just run the follwoing command:

```bash
npm start
```

As a result the local server will be started along with the application.

# CORS issues

The aplication was failing due to CORS issues. There are a couple colutions:

1. Use a Chrome extension to disable CORS.
2. Add `proxy.conf.json` to the project root.
3. Adjust backend `server.js` to allow CORS.

I decided to adjust `server.js`, since variant 2 didn't work for me and using extension is not explicit.

# Form validation

- Form validation happens on "Blur".
- For email `Validators.pattern` used in favor of `Validators.email`, because `Validators.email` considers values like `test@test` as valid email.

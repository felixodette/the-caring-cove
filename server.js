/**
 * Custom server for cPanel/Phusion Passenger.
 * Use this as the Application startup file if "npm start" doesn't work.
 * Set PassengerStartupFile to "server.js" in your Node.js app config.
 */
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

// Always run in production mode on cPanel (serves built .next output)
const dev = process.env.NODE_ENV === "development";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    const parsedUrl = parse(req.url, true);
    await handle(req, res, parsedUrl);
  }).listen(process.env.PORT || 3000, (err) => {
    if (err) throw err;
    console.log("> Next.js ready on port", process.env.PORT || 3000);
  });
});

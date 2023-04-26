import app from './API/app.js';

// Use port 8000
const port = 8000;

app.get("/",(req, res) => {
    res.send("Hello Express");
})

// Start express server at port:8000
app.listen(port, () => {
  console.log(`Server running on to http://localhost:${port}`);
});
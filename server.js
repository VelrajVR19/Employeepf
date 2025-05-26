const express = require("express");

const path = require("path");
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
const PORT = 3000;
app.use(cors());  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));



const emailRoutes = require("./routes/routes");
app.use("/api", emailRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

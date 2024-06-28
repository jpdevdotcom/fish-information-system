import express, { response } from "express";
import mysql from "mysql2";
import axios from "axios";
import cors from "cors";

const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;

const db = mysql.createConnection(urlDB);

const app = express();
let responseData;
app.use(express.json());
app.use(cors());

// API
const options = {
    method: "GET",
    url: "https://fish-species.p.rapidapi.com/fish_api/fishes",
    headers: {
        "X-RapidAPI-Key": "796ac31075msh8c5260e6e3379c2p120115jsn3a802a8356a8",
        "X-RapidAPI-Host": "fish-species.p.rapidapi.com",
    },
};
try {
    const response = await axios.request(options);
    responseData = response.data;
} catch (error) {
    console.error(error);
}

// Insert all data from the api into mysql db
app.post("/store-api", (req, res) => {
    let decoded;
    const results = [];
    const ADD_FISH =
        "INSERT INTO fish (`name`, `image`, `img_url`, `binomial_name`, `url`, `domain`, `kingdom`, `phylum`, `family`, `species`, `genera`) VALUES (?)";

    responseData.map((fishData) => {
        let url = fishData.img_src_set["2x"];

        if (!url) {
            return null;
        } else {
            let urlObj = new URL(url);
            let file = urlObj.pathname.split("/").pop(); // split the url and get only the image filename
            const finalFileName = file.replace(/[\d]+px-/, "");
            decoded = decodeURIComponent(finalFileName); // Decode the encrypted image filename

            if (fishData.meta.scientific_classification) {
                const val = [
                    fishData.name,
                    decoded,
                    fishData.img_src_set["2x"],
                    fishData.meta.binomial_name,
                    fishData.url,
                    fishData.meta.scientific_classification.domain,
                    fishData.meta.scientific_classification.kingdom,
                    fishData.meta.scientific_classification.phylum,
                    fishData.meta.scientific_classification.family,
                    fishData.meta.scientific_classification.species,
                    fishData.meta.genera,
                ];

                db.query(ADD_FISH, [val], (err, data) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({
                            error: "Error inserting scientific classification",
                        });
                    }

                    return results.push("Add");
                });
            }
        }
    });

    res.json(results);
});
app.get("/get", (req, res) => {
    res.json(responseData);
});

app.get("/fish-data", (req, res) => {
    const GET_ALL_FISh = "SELECT * FROM fish";

    db.query(GET_ALL_FISh, (err, data) => {
        if (err) throw err;
        return res.json(data);
    });
});

app.get("/fish-data/:id", (req, res) => {
    var id = req.params.id;

    const FILTER_FISH = `SELECT * FROM fish WHERE id = ${id}`;

    db.query(FILTER_FISH, (err, data) => {
        if (err) throw err;
        return res.json(data);
    });
});

app.get("/filter-fish/:image", (req, res) => {
    var img = req.params.image;

    const q = `SELECT * FROM fish WHERE image = '${img}'`;

    db.query(q, (err, data) => {
        if (err) throw err;
        return res.json(data);
    });
});

app.get("/filter-fish/fish-name/:fish_name", (req, res) => {
    var fishName = req.params.fish_name;

    const FILTER_FISH_NAME = `SELECT * FROM fish WHERE name = '${fishName}'`;

    db.query(FILTER_FISH_NAME, (err, data) => {
        if (err) throw err;
        return res.json(data);
    });
});

app.listen(8800, () => {
    console.log("Connected to server");
});

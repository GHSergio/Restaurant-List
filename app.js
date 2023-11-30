const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;
const restaurants = require("./public/jsons/restaurant.json").results;

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.static("public"));

//首頁 --> 跳轉至餐廳清單頁面
app.get("/", (req, res) => {
  res.redirect("/restaurants");
});

//餐廳清單頁面
http: app.get("/restaurants", (req, res) => {
  const keyword = req.query.search?.trim();
  const matchedRestaurants = keyword
    ? restaurants.filter((restaurant) =>
        Object.values(restaurant).some((property) => {
          if (typeof property === "string") {
            return property.toLowerCase().includes(keyword.toLowerCase());
          }
        })
      )
    : restaurants;
  res.render("index", { restaurants: matchedRestaurants, keyword });
});

//餐廳細節頁面
app.get("/restaurant/:id", (req, res) => {
  const id = req.params.id;
  const restaurant = restaurants.find(
    (restaurant) => restaurant.id.toString() === id
  );
  res.render("detail", { restaurant, id });
});

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});

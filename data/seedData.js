const { sampleData } = require("../config/sampleData");

function makeRandom(seed) {
  let state = seed >>> 0;
  return function () {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function between(random, min, max) {
  return Math.floor(random() * (max - min + 1)) + min;
}

function pick(random, list) {
  return list[Math.floor(random() * list.length)];
}

// ---------------- Posts (50) ----------------
const postRows = [
  "Understanding HTTP status codes|http,status,api",
  "Building your first Express server|node,express,backend",
  "How JSON became the language of the web|json,web,data",
  "Async and await explained simply|javascript,async,promises",
  "Ten tips for cleaner CSS|css,design,frontend",
  "A beginner guide to MongoDB|mongodb,database,nosql",
  "Using environment variables safely|dotenv,security,node",
  "Pagination patterns for APIs|pagination,api,design",
  "Debugging JavaScript like a pro|javascript,debugging,tools",
  "Responsive layouts with Flexbox|css,flexbox,layout",
  "CSS Grid in practice|css,grid,layout",
  "What is CORS and why does it matter|cors,security,web",
  "Writing readable commit messages|git,workflow,teamwork",
  "Git branching for small teams|git,branches,teamwork",
  "Server-side rendering with EJS|ejs,node,templates",
  "Handling errors in Express|express,errors,node",
  "Designing friendly API error messages|api,errors,design",
  "Mock data for faster prototyping|mock,testing,prototype",
  "Testing APIs with the browser|testing,browser,api",
  "Deploying a Node app for free|deployment,node,hosting",
  "Understanding the event loop|javascript,eventloop,node",
  "Array methods every developer uses|javascript,arrays,beginner",
  "Working with dates in JavaScript|javascript,dates,tips",
  "Accessible forms made simple|accessibility,forms,html",
  "Why semantic HTML matters|html,semantic,seo",
  "Speeding up your website|performance,web,optimization",
  "Introduction to REST resources|rest,api,resources",
  "Query parameters explained|api,query,http",
  "Learning to read documentation|learning,docs,career",
  "Building a portfolio that stands out|portfolio,career,design",
  "Project ideas for beginners|projects,beginner,practice",
  "Staying motivated while learning to code|learning,motivation,career",
  "Version control basics|git,basics,tools",
  "Authentication versus authorization|security,auth,web",
  "Hashing passwords the right way|security,passwords,backend",
  "Understanding indexes in databases|database,indexes,performance",
  "Modeling data in MongoDB|mongodb,schema,design",
  "Naming things in code|clean-code,naming,tips",
  "Refactoring without fear|refactoring,clean-code,testing",
  "Code reviews that help everyone|teamwork,review,quality",
  "Using the Network tab in DevTools|devtools,network,debugging",
  "Dark mode with CSS variables|css,variables,theme",
  "Keyboard shortcuts that save time|productivity,tools,tips",
  "Caching basics for web apps|caching,performance,web",
  "Rate limiting explained|api,security,performance",
  "Logging that helps in production|logging,node,operations",
  "Environment setup for new projects|setup,tools,beginner",
  "Open source for first-time contributors|opensource,github,community"
];

const postIntros = [
  "Every project begins with a small step, and this one is no different. Start with a tiny example, run it, and change one thing at a time until it makes sense.",
  "Many beginners get stuck here, so let us walk through it slowly. Read the error message carefully, because it usually points to the real problem.",
  "Good habits matter more than clever tricks. Keep things simple, name things clearly, and your future self will thank you.",
  "You do not need to memorize everything. Learn the core idea, keep the documentation open, and practice with small experiments.",
  "A common mistake is trying to do too much at once. Break the task into small parts and finish them one by one."
];

function buildPosts() {
  const random = makeRandom(101);
  return postRows.map((row, index) => {
    const [title, tags] = row.split("|");
    return {
      id: index + 3,
      title,
      body: `${pick(random, postIntros)} This guide covers the essentials of ${title.toLowerCase()} with practical tips you can use today.`,
      tags: tags.split(","),
      reactions: { likes: between(random, 5, 200), dislikes: between(random, 0, 15) },
      views: between(random, 100, 2000),
      userId: between(random, 1, 40)
    };
  });
}

// ---------------- Products (40) ----------------
const productRows = [
  "Bluetooth Speaker|Portable speaker with deep bass and 10 hours of playtime.|electronics|39.99",
  "USB-C Hub|Seven-in-one hub with HDMI, USB 3.0 and an SD card reader.|electronics|34.5",
  "Noise Cancelling Headphones|Over-ear headphones with active noise cancelling and a 30-hour battery.|electronics|129",
  "Webcam HD 1080p|Full HD webcam with a built-in microphone and privacy cover.|electronics|45.9",
  "Portable Charger 20000mAh|Fast-charging power bank with two USB ports and USB-C.|electronics|29.99",
  "Smart LED Bulb|Wi-Fi bulb with millions of colors and voice control.|home|12.49",
  "Desk Lamp|Dimmable LED desk lamp with three color temperatures.|home|27",
  "Ceramic Plant Pot|Matte ceramic pot with a drainage hole and bamboo tray.|home|14.75",
  "Throw Blanket|Soft knitted blanket, warm and machine washable.|home|32",
  "Wall Clock|Silent quartz wall clock with a minimalist face.|home|18.99",
  "Scented Candle Set|Set of three soy candles in glass jars.|home|21.5",
  "Stainless Steel Water Bottle|Insulated bottle keeps drinks cold for 24 hours or hot for 12.|kitchen|19.99",
  "Non-stick Frying Pan|Twenty-eight centimeter pan with a heat-resistant handle.|kitchen|36",
  "Chef Knife|Eight-inch stainless steel knife with an ergonomic handle.|kitchen|44.5",
  "Electric Kettle|One point seven liter kettle with auto shut-off.|kitchen|31.25",
  "Coffee Grinder|Burr grinder with adjustable grind size and a quiet motor.|kitchen|52",
  "Glass Food Containers|Set of five airtight glass containers with lids.|kitchen|28.75",
  "Yoga Mat|Non-slip eco-friendly mat, six millimeters thick.|fitness|22.99",
  "Adjustable Dumbbells|Pair of dumbbells adjustable from two to twenty kilograms.|fitness|149",
  "Resistance Bands Set|Five bands with different strengths and a carry bag.|fitness|15.99",
  "Jump Rope|Speed rope with ball bearings and foam grips.|fitness|9.5",
  "Running Shoes|Lightweight breathable shoes with cushioned soles.|fashion|64.99",
  "Canvas Backpack|Everyday backpack with a padded laptop compartment.|fashion|42",
  "Cotton T-Shirt|Classic fit crew neck shirt in soft combed cotton.|fashion|14.99",
  "Leather Wallet|Slim wallet with six card slots and a coin pocket.|fashion|26.5",
  "Sunglasses|Polarized lenses with UV400 protection.|fashion|19",
  "JavaScript for Beginners|Friendly introduction to JavaScript with hands-on exercises.|books|24.99",
  "REST API Design Handbook|Practical patterns for designing clean and consistent APIs.|books|34",
  "The Pragmatic Developer|Career advice and habits for working programmers.|books|29.5",
  "Learning MongoDB|Step-by-step guide to document databases and queries.|books|31.99",
  "Spiral Notebook Pack|Pack of four ruled notebooks with sturdy covers.|stationery|11.99",
  "Gel Pen Set|Twelve smooth-writing gel pens in assorted colors.|stationery|8.49",
  "Desk Organizer|Wooden organizer with compartments for pens, notes and a phone.|stationery|17.5",
  "Sticky Notes Bundle|Ten pads of bright sticky notes in four sizes.|stationery|6.99",
  "Laptop Stand|Aluminum adjustable stand that improves posture and airflow.|accessories|38",
  "Ergonomic Mouse Pad|Gel wrist rest pad with a non-slip base.|accessories|13.25",
  "Phone Tripod|Flexible tripod with a Bluetooth remote shutter.|accessories|16.99",
  "Cable Organizer Kit|Clips and sleeves to keep desk cables neat.|accessories|9.99"
];

function buildProducts() {
  const random = makeRandom(202);
  return productRows.map((row, index) => {
    const [title, description, category, price] = row.split("|");
    return {
      id: index + 3,
      title,
      description,
      category,
      price: Number(price),
      rating: Math.round((3 + random() * 2) * 10) / 10,
      stock: between(random, 0, 100),
      thumbnail: `https://placehold.co/300x300?text=${encodeURIComponent(title)}`
    };
  });
}

// ---------------- Users (40) ----------------
const femaleNames = ["Ayesha", "Fatima", "Zainab", "Hira", "Sana", "Maryam", "Noor", "Iqra", "Mehwish", "Sadia", "Laiba", "Rabia", "Amna", "Bushra", "Anum", "Komal", "Saima", "Nimra", "Hania", "Areeba"];
const maleNames = ["Omar", "Ali", "Hamza", "Bilal", "Usman", "Zain", "Hassan", "Ahmed", "Faisal", "Imran", "Talha", "Saad", "Danish", "Kamran", "Raza", "Waqar", "Junaid", "Salman", "Asad", "Daniyal"];
const lastNames = ["Khan", "Siddiqui", "Ahmed", "Malik", "Sheikh", "Qureshi", "Butt", "Raza", "Hussain", "Ansari", "Mirza", "Chaudhry", "Farooqui", "Baig", "Javed", "Iqbal", "Rizvi", "Abbasi", "Hashmi", "Shah"];
const cities = [
  { city: "Karachi", state: "Sindh", postalCode: "75500" },
  { city: "Lahore", state: "Punjab", postalCode: "54000" },
  { city: "Islamabad", state: "Islamabad Capital Territory", postalCode: "44000" },
  { city: "Rawalpindi", state: "Punjab", postalCode: "46000" },
  { city: "Peshawar", state: "Khyber Pakhtunkhwa", postalCode: "25000" },
  { city: "Quetta", state: "Balochistan", postalCode: "87300" },
  { city: "Multan", state: "Punjab", postalCode: "60000" },
  { city: "Faisalabad", state: "Punjab", postalCode: "38000" }
];
const streets = ["Garden Road", "Mall Road", "Canal View", "Main Boulevard", "Station Road", "Jinnah Avenue", "Model Town", "University Road"];

function buildUsers() {
  const random = makeRandom(303);
  const users = [];
  for (let id = 3; id <= 40; id++) {
    const isFemale = id % 2 === 1;
    const firstName = (isFemale ? femaleNames : maleNames)[Math.floor((id - 1) / 2) % 20];
    const lastName = lastNames[(id - 1) % 20];
    const place = pick(random, cities);
    users.push({
      id,
      firstName,
      lastName,
      email: `${firstName}.${lastName}${id}@example.com`.toLowerCase(),
      age: between(random, 18, 60),
      gender: isFemale ? "female" : "male",
      phone: `+92 3${between(random, 0, 4)}${between(random, 0, 9)} ${between(random, 1000000, 9999999)}`,
      address: {
        address: `${between(random, 1, 120)} ${pick(random, streets)}`,
        city: place.city,
        state: place.state,
        postalCode: place.postalCode,
        country: "Pakistan"
      }
    });
  }
  return users;
}

// ---------------- Recipes (30) ----------------
const recipeRows = [
  "Chicken Karahi|Pakistani|Chicken;Tomatoes;Ginger;Green chilies;Garlic;Fresh coriander|15|35|4|Medium",
  "Seekh Kebab|Pakistani|Minced beef;Onions;Green chilies;Kebab masala;Fresh coriander;Ginger paste|25|15|4|Medium",
  "Aloo Gosht|Pakistani|Mutton;Potatoes;Tomatoes;Onions;Garam masala;Ginger garlic paste|15|60|5|Medium",
  "Haleem|Pakistani|Wheat;Beef;Lentils;Ginger;Garlic;Garam masala|30|180|8|Hard",
  "Nihari|Pakistani|Beef shank;Wheat flour;Ginger;Nihari masala;Onions;Ghee|20|240|6|Hard",
  "Chana Chaat|Pakistani|Chickpeas;Potatoes;Tomatoes;Tamarind chutney;Chaat masala;Fresh mint|15|10|4|Easy",
  "Aloo Paratha|Pakistani|Wheat flour;Potatoes;Green chilies;Cumin seeds;Fresh coriander;Butter|25|20|4|Medium",
  "Pakoray|Pakistani|Gram flour;Onions;Potatoes;Spinach;Red chili powder;Cumin seeds|15|15|4|Easy",
  "Kheer|Pakistani|Milk;Rice;Sugar;Cardamom;Almonds;Pistachios|10|45|6|Easy",
  "Spaghetti Carbonara|Italian|Spaghetti;Eggs;Pancetta;Parmesan;Black pepper;Garlic|10|20|3|Medium",
  "Margherita Pizza|Italian|Pizza dough;Tomato sauce;Mozzarella;Fresh basil;Olive oil;Salt|20|15|2|Easy",
  "Vegetable Lasagna|Italian|Lasagna sheets;Zucchini;Spinach;Ricotta;Tomato sauce;Mozzarella|30|45|6|Medium",
  "Mushroom Risotto|Italian|Arborio rice;Mushrooms;Vegetable stock;Onions;Parmesan;White wine|10|35|4|Hard",
  "Chicken Fried Rice|Chinese|Cooked rice;Chicken;Eggs;Spring onions;Soy sauce;Peas|15|15|3|Easy",
  "Vegetable Stir Fry|Chinese|Broccoli;Bell peppers;Carrots;Soy sauce;Garlic;Ginger|10|10|3|Easy",
  "Chicken Manchurian|Chinese|Chicken;Corn flour;Soy sauce;Garlic;Spring onions;Green chilies|20|20|4|Medium",
  "Hot and Sour Soup|Chinese|Chicken stock;Mushrooms;Eggs;Vinegar;White pepper;Soy sauce|15|20|4|Easy",
  "Beef Tacos|Mexican|Tortillas;Minced beef;Tomatoes;Lettuce;Cheddar cheese;Taco seasoning|15|15|4|Easy",
  "Chicken Quesadilla|Mexican|Tortillas;Chicken;Cheddar cheese;Bell peppers;Onions;Sour cream|10|10|2|Easy",
  "Guacamole|Mexican|Avocados;Lime;Onions;Tomatoes;Fresh coriander;Jalapeno|10|0|4|Easy",
  "Greek Salad|Greek|Cucumbers;Tomatoes;Feta cheese;Olives;Red onions;Olive oil|10|0|2|Easy",
  "Chicken Souvlaki|Greek|Chicken;Lemon;Oregano;Garlic;Olive oil;Pita bread|20|15|4|Medium",
  "Hummus|Middle Eastern|Chickpeas;Tahini;Lemon;Garlic;Olive oil;Cumin|10|0|6|Easy",
  "Chicken Shawarma|Middle Eastern|Chicken;Yogurt;Garlic;Paprika;Pita bread;Pickles|25|25|4|Medium",
  "Butter Chicken|Indian|Chicken;Butter;Tomato puree;Cream;Garam masala;Fenugreek leaves|20|35|4|Medium",
  "Palak Paneer|Indian|Spinach;Paneer;Onions;Tomatoes;Garlic;Cream|15|25|4|Easy",
  "Masala Dosa|Indian|Rice;Urad dal;Potatoes;Mustard seeds;Curry leaves;Turmeric|30|30|4|Hard",
  "Pancakes|American|Flour;Milk;Eggs;Sugar;Baking powder;Butter|10|15|4|Easy"
];

function buildRecipes() {
  return recipeRows.map((row, index) => {
    const [name, cuisine, ingredientText, prep, cook, servings, difficulty] = row.split("|");
    const ingredients = ingredientText.split(";");
    const firstThree = ingredients.slice(0, 3).map((item) => item.toLowerCase()).join(", ");
    return {
      id: index + 3,
      name,
      ingredients,
      instructions: [
        `Prepare and measure all ingredients: ${firstThree} and the rest.`,
        "Cook the main ingredients over medium heat, adding the spices and seasoning as you go.",
        "Combine everything, taste, and adjust the seasoning.",
        "Serve warm and enjoy."
      ],
      prepTimeMinutes: Number(prep),
      cookTimeMinutes: Number(cook),
      servings: Number(servings),
      difficulty,
      cuisine,
      image: `https://placehold.co/400x300?text=${encodeURIComponent(name)}`
    };
  });
}

// ---------------- Final datasets ----------------
function buildSeedData() {
  return {
    posts: [...sampleData.posts.list, ...buildPosts()],
    products: [...sampleData.products.list, ...buildProducts()],
    users: [...sampleData.users.list, ...buildUsers()],
    recipes: [...sampleData.recipes.list, ...buildRecipes()]
  };
}

module.exports = { buildSeedData };

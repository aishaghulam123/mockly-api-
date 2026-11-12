const sampleData = {
  "posts": {
    "total": 50,
    "list": [
      {
        "id": 1,
        "title": "Getting started with the Fetch API",
        "body": "Every project begins with a small step, and this one is no different. Start with a tiny example, run it, and change one thing at a time until it makes sense. This guide covers the essentials of getting started with the fetch api with practical tips you can use today.",
        "tags": [
          "javascript",
          "fetch",
          "beginner"
        ],
        "reactions": {
          "likes": 20,
          "dislikes": 0
        },
        "views": 150,
        "userId": 1
      },
      {
        "id": 2,
        "title": "Why every developer should learn REST",
        "body": "Many beginners get stuck here, so let us walk through it slowly. Read the error message carefully, because it usually points to the real problem. This guide covers the essentials of why every developer should learn rest with practical tips you can use today.",
        "tags": [
          "rest",
          "api",
          "web"
        ],
        "reactions": {
          "likes": 57,
          "dislikes": 7
        },
        "views": 361,
        "userId": 2
      }
    ],
    "single": {
      "id": 1,
      "title": "Getting started with the Fetch API",
      "body": "Every project begins with a small step, and this one is no different. Start with a tiny example, run it, and change one thing at a time until it makes sense. This guide covers the essentials of getting started with the fetch api with practical tips you can use today.",
      "tags": [
        "javascript",
        "fetch",
        "beginner"
      ],
      "reactions": {
        "likes": 20,
        "dislikes": 0
      },
      "views": 150,
      "userId": 1
    }
  },
  "products": {
    "total": 40,
    "list": [
      {
        "id": 1,
        "title": "Wireless Mouse",
        "description": "Compact wireless mouse with silent clicks and a 12-month battery life.",
        "category": "electronics",
        "price": 24.99,
        "rating": 3.4,
        "stock": 5,
        "thumbnail": "https://placehold.co/300x300?text=Wireless%20Mouse"
      },
      {
        "id": 2,
        "title": "Mechanical Keyboard",
        "description": "Tactile mechanical keyboard with hot-swappable switches and white backlight.",
        "category": "electronics",
        "price": 89.5,
        "rating": 4.7,
        "stock": 34,
        "thumbnail": "https://placehold.co/300x300?text=Mechanical%20Keyboard"
      }
    ],
    "single": {
      "id": 1,
      "title": "Wireless Mouse",
      "description": "Compact wireless mouse with silent clicks and a 12-month battery life.",
      "category": "electronics",
      "price": 24.99,
      "rating": 3.4,
      "stock": 5,
      "thumbnail": "https://placehold.co/300x300?text=Wireless%20Mouse"
    }
  },
  "users": {
    "total": 40,
    "list": [
      {
        "id": 1,
        "firstName": "Ayesha",
        "lastName": "Khan",
        "email": "ayesha.khan1@example.com",
        "age": 19,
        "gender": "female",
        "phone": "+92 310 1000000",
        "address": {
          "address": "10 Garden Road",
          "city": "Karachi",
          "state": "Sindh",
          "postalCode": "75500",
          "country": "Pakistan"
        }
      },
      {
        "id": 2,
        "firstName": "Omar",
        "lastName": "Siddiqui",
        "email": "omar.siddiqui2@example.com",
        "age": 26,
        "gender": "male",
        "phone": "+92 311 1007919",
        "address": {
          "address": "13 Mall Road",
          "city": "Lahore",
          "state": "Punjab",
          "postalCode": "54000",
          "country": "Pakistan"
        }
      }
    ],
    "single": {
      "id": 1,
      "firstName": "Ayesha",
      "lastName": "Khan",
      "email": "ayesha.khan1@example.com",
      "age": 19,
      "gender": "female",
      "phone": "+92 310 1000000",
      "address": {
        "address": "10 Garden Road",
        "city": "Karachi",
        "state": "Sindh",
        "postalCode": "75500",
        "country": "Pakistan"
      }
    }
  },
  "recipes": {
    "total": 30,
    "list": [
      {
        "id": 1,
        "name": "Chicken Biryani",
        "ingredients": [
          "Basmati rice",
          "Chicken",
          "Yogurt",
          "Onions",
          "Biryani masala",
          "Fresh mint"
        ],
        "instructions": [
          "Prepare and measure all ingredients: basmati rice, chicken, yogurt and the rest.",
          "Cook the main ingredients over medium heat, adding the spices and seasoning as you go.",
          "Combine everything, taste, and adjust the seasoning.",
          "Serve warm and enjoy."
        ],
        "prepTimeMinutes": 30,
        "cookTimeMinutes": 60,
        "servings": 6,
        "difficulty": "Medium",
        "cuisine": "Pakistani",
        "image": "https://placehold.co/400x300?text=Chicken%20Biryani"
      },
      {
        "id": 2,
        "name": "Daal Chawal",
        "ingredients": [
          "Yellow lentils",
          "Rice",
          "Garlic",
          "Cumin seeds",
          "Turmeric",
          "Dried red chilies"
        ],
        "instructions": [
          "Prepare and measure all ingredients: yellow lentils, rice, garlic and the rest.",
          "Cook the main ingredients over medium heat, adding the spices and seasoning as you go.",
          "Combine everything, taste, and adjust the seasoning.",
          "Serve warm and enjoy."
        ],
        "prepTimeMinutes": 10,
        "cookTimeMinutes": 30,
        "servings": 4,
        "difficulty": "Easy",
        "cuisine": "Pakistani",
        "image": "https://placehold.co/400x300?text=Daal%20Chawal"
      }
    ],
    "single": {
      "id": 1,
      "name": "Chicken Biryani",
      "ingredients": [
        "Basmati rice",
        "Chicken",
        "Yogurt",
        "Onions",
        "Biryani masala",
        "Fresh mint"
      ],
      "instructions": [
        "Prepare and measure all ingredients: basmati rice, chicken, yogurt and the rest.",
        "Cook the main ingredients over medium heat, adding the spices and seasoning as you go.",
        "Combine everything, taste, and adjust the seasoning.",
        "Serve warm and enjoy."
      ],
      "prepTimeMinutes": 30,
      "cookTimeMinutes": 60,
      "servings": 6,
      "difficulty": "Medium",
      "cuisine": "Pakistani",
      "image": "https://placehold.co/400x300?text=Chicken%20Biryani"
    }
  }
};

module.exports = { sampleData };

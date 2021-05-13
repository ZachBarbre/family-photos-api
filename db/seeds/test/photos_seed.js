
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('photos').del()
    .then(() => {
      return knex('photos').insert([
        { 
          spaces: {image_full: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0475.JPG"},
          description: "A very tired Zach holding Anna soon after she was born",
        }
      ])
    })
    .then(() => {
      return knex('photos').insert([
        { 
          spaces: {image_full: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0481.JPG"},
          description: "Anna in hospital hat and swaddle",
        }
      ])
    })
    .then(() => {
      return knex('photos').insert([
        { 
          spaces: {image_full: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0485.JPG"},
          description: "Anna with her hospital hat",
        }
      ])
    })
    .then(() => {
      return knex('photos').insert([
        { 
          spaces: {image_full: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0488.JPG"},
          description: "Kira and Anna in the Mom and Baby room chair",
        }
      ])
    })
    .then(() => {
      return knex('photos').insert([
        { 
          spaces: {image_full: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0492.JPG"},
          description: "Kira and Anna leaving the hospital",
        }
      ])
    })
    .then(() => {
      return knex('photos').insert([
        { 
          spaces: {image_full: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0493.JPG"},
          description: "Zach holding Anna. Kinda a closeup.",
        }
      ])
    })
    .then(() => {
      return knex('photos').insert([
        { 
          spaces: {image_full: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0499.JPG"},
          description: "Anna on Zach's legs in the sun",
        }
      ])
    })
    .then(() => {
      return knex('photos').insert([
        { 
          spaces: {image_full: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0500.JPG"},
          description: "Garion meeting Anna",
        }
      ])
    })
    .then(() => {
      return knex('photos').insert([
        { 
          spaces: {image_full: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0539.JPG"},
          description: "Cat looking down at a meal",
        }
      ])
    })
    .then(() => {
      return knex('photos').insert([
        { 
          spaces: {image_full: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0509.JPG"},
          description: "Anna in her comically oversized diaper",
        }
      ])
    })
    .then(() => {
      return knex('photos').insert([
        { 
          spaces: {image_full: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0517.JPG"},
          description: "In the swaddle from Aunt P",
        }
      ])
    })
    .then(() => {
      return knex('photos').insert([
        { 
          spaces: {image_full: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0521.JPG"},
          description: "Anna with a paci",
        }
      ])
    })
    .then(() => {
      return knex('photos').insert([
        { 
          spaces: {image_full: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0537.JPG"},
          description: "Zach wearing Anna in a sling",
        }
      ])
    })
    .then(() => {
      return knex('photos').insert([
        { 
          spaces: {image_full: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0544.JPG"},
          description: "Anna holding a paci",
        }
      ])
    })
    .then(() => {
      return knex('photos').insert([
        { 
          spaces: {image_full: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0544.JPG"},
          description: "Anna holding a paci",
        }
      ])
    })
    .then(() => {
      return knex('photos').insert([
        { 
          spaces: {image_full: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0548.JPG"},
          description: "The Barbre Family",
        }
      ])
    })
    .then(() => {
      return knex('photos').insert([
        { 
          spaces: {image_full: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0549.JPG"},
          description: "Kira holding Anna",
        }
      ])
    })
    
    
};

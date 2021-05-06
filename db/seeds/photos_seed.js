
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('photos').del()
    .then(() => {
      return knex('photos').insert([
        { 
          url: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0475.JPG",
          description: "A very tired Zach holding Anna soon after she was born",
          photo_date: "2021-04-07 09:08:00",
        }
      ])
    })
    .then(() => {
      return knex('photos').insert([
        { 
          url: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0481.JPG",
          description: "Anna in hospital hat and swaddle",
          photo_date: "2021-04-07 19:43:00",
        }
      ])
    })
    .then(() => {
      return knex('photos').insert([
        { 
          url: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0485.JPG",
          description: "Anna with her hospital hat",
          photo_date: "2021-04-08 12:56:00",
        }
      ])
    })
    .then(() => {
      return knex('photos').insert([
        { 
          url: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0488.JPG",
          description: "Kira and Anna in the Mom and Baby room chair",
          photo_date: "2021-04-09 12:20:00",
        }
      ])
    })
    .then(() => {
      return knex('photos').insert([
        { 
          url: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0492.JPG",
          description: "Kira and Anna leaving the hospital",
          photo_date: "2021-04-09 13:38:00",
        }
      ])
    })
    .then(() => {
      return knex('photos').insert([
        { 
          url: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0493.JPG",
          description: "Zach holding Anna. Kinda a closeup.",
          photo_date: "2021-04-09 15:21:00",
        }
      ])
    })
    .then(() => {
      return knex('photos').insert([
        { 
          url: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0499.JPG",
          description: "Anna on Zach's legs in the sun",
          photo_date: "2021-04-11 10:50:00",
        }
      ])
    })
    .then(() => {
      return knex('photos').insert([
        { 
          url: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0500.JPG",
          description: "Garion meeting Anna",
          photo_date: "2021-04-11 13:11:00",
        }
      ])
    })
    .then(() => {
      return knex('photos').insert([
        { 
          url: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0539.JPG",
          description: "Cat looking down at a meal",
          photo_date: "2021-04-12 13:02:00",
        }
      ])
    })
    .then(() => {
      return knex('photos').insert([
        { 
          url: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0509.JPG",
          description: "Anna in her comically oversized diaper",
          photo_date: "2021-04-13 13:52:00",
        }
      ])
    })
    .then(() => {
      return knex('photos').insert([
        { 
          url: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0517.JPG",
          description: "In the swaddle from Aunt P",
          photo_date: "2021-04-15 00:00:00",
        }
      ])
    })
    .then(() => {
      return knex('photos').insert([
        { 
          url: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0521.JPG",
          description: "Anna with a paci",
          photo_date: "2021-04-15 14:06:00",
        }
      ])
    })
    .then(() => {
      return knex('photos').insert([
        { 
          url: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0537.JPG",
          description: "Zach wearing Anna in a sling",
          photo_date: "2021-04-17 10:29:00",
        }
      ])
    })
    .then(() => {
      return knex('photos').insert([
        { 
          url: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0544.JPG",
          description: "Anna holding a paci",
          photo_date: "2021-04-18 16:39:00"
        }
      ])
    })
    .then(() => {
      return knex('photos').insert([
        { 
          url: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0544.JPG",
          description: "Anna holding a paci",
          photo_date: "2021-04-18 16:39:00"
        }
      ])
    })
    .then(() => {
      return knex('photos').insert([
        { 
          url: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0548.JPG",
          description: "The Barbre Family",
          photo_date: "2021-04-19 16:31:00",
        }
      ])
    })
    .then(() => {
      return knex('photos').insert([
        { 
          url: "https://barbrephotos.nyc3.cdn.digitaloceanspaces.com/IMG_0549.JPG",
          description: "Kira holding Anna",
          photo_date: "2021-04-19 17:02:00",
        }
      ])
    })
    
    
};

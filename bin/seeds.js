require('../config/db.config')

const User = require('../models/user.model')
const Tweet = require('../models/tweet.model')
const Comment = require('../models/comment.model')
const faker = require('faker')

User.deleteMany({})
  .then(() => Tweet.deleteMany({}))
  .then(() => {
    for (let i = 0; i < 100; i++) {
      const user = new User({
        name: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: "123123123",
        avatar: faker.internet.avatar(),
        bio: faker.lorem.paragraph()
      })
      user.save()
        .then(user => {
          for(let j = 0; j < 100; j++) {
            const tweet = new Tweet({
              body: faker.lorem.paragraph(),
              image: faker.image.image(),
              user: user.id
            })
            tweet.save()
              .then(
                tweet => {
                  for(let k = 0; k < 100; k++) {
                    const comment = new Comment({
                      text: faker.lorem.paragraph(),
                      user: user.id,
                      tweet: tweet.id
                    })
                    comment.save();
                  }})
          }
        })
        
    }
  }).catch(err => console.log('Error =>' + err))



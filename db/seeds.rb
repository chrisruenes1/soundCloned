# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


User.destroy_all
Track.destroy_all

puts "destroyed tracks"


users = []
10.times do
  user = {
    fname: Faker::Name.first_name,
    lname: Faker::Name.last_name,
    username: Faker::Internet.user_name,
    password: Faker::Internet.password(10,20),
    group_name: Faker::Company.name,
    city: Faker::Address.city,
    state: Faker::Address.state
  }
  users.push(user)
end


demo_user = {
  fname: "Chris",
  lname: "Ruenes",
  username: "chrisruenes1",
  password: "demopassword1",
  group_name: "The Peaches",
  city: "New York City",
  state: "New York"
}

users.push(demo_user)


chance = {
  group_name: "Chance the Rapper",
  city: "Chicago",
  state: "Illinois",
  username: "chance3",
  password: "coloringbook"
}

users.push(chance);

User.create!(
  users
)
puts "created users"

users = User.all


chance_id = User.find_by(username: "chance3").id;

puts "found chance"

Track.create!([
  {
    title: "Summer Friends",
    image: "https://s3.amazonaws.com/sound-cloned-seeds/cover_art.jpg",
    audio_file: "https://s3.amazonaws.com/sound-cloned-seeds/summer_friends.mp3",
    composer_id: chance_id,
    album: "Coloring Book",
    public: true
  },
  {
    title: "No Problem",
    image: "https://s3.amazonaws.com/sound-cloned-seeds/cover_art.jpg",
    audio_file: "https://s3.amazonaws.com/sound-cloned-seeds/no_problem.mp3",
    composer_id: chance_id,
    album: "Coloring Book",
    public: true
  },
  {
    title: "Same Drugs",
    image: "https://s3.amazonaws.com/sound-cloned-seeds/cover_art.jpg",
    audio_file: "https://s3.amazonaws.com/sound-cloned-seeds/same_drugs.mp3",
    composer_id: chance_id,
    album: "Coloring Book",
    public: true
  },
  {
    title: "All We Got",
    image: "https://s3.amazonaws.com/sound-cloned-seeds/cover_art.jpg",
    audio_file: "https://s3.amazonaws.com/sound-cloned-seeds/all_we_got.mp3",
    composer_id: chance_id,
    album: "Coloring Book",
    public: true
  }
]);

tracks = Track.all

comments= [];
10.times do
  comment = {
    content: Faker::Hipster.sentence,
    track_id: tracks.sample.id,
    author_id: users.sample.id,
    elapsed_time: (180) * Random.rand()
  }
  comments.push(comment)
end

Comment.create!(
comments
)
puts "created comments"

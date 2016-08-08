# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.destroy_all

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
);

chance_id = User.find_by(username: "chance3").id;

Track.create!([
  {
    title: "All We Got",
    image: File.new("public/Chance The Rapper - Coloring Book/00 - Chance_The_rapper_Chance_3-front-large.jpg"),
    audio_file: File.new("public/Chance The Rapper - Coloring Book/01 - All We Got (feat Kanye West  Chicago Childrens Choir).mp3"),
    composer_id: chance_id,
    album: "Coloring Book",
    public: true
  },
  {
    title: "No Problem",
    image: File.new("public/Chance The Rapper - Coloring Book/00 - Chance_The_rapper_Chance_3-front-large.jpg"),
    audio_file: File.new("public/Chance The Rapper - Coloring Book/02 - No Problem (feat Lil Wayne 2 Chainz).mp3"),
    composer_id: chance_id,
    album: "Coloring Book",
    public: true
  },
  {
    title: "Summer Friends",
    image: File.new("public/Chance The Rapper - Coloring Book/00 - Chance_The_rapper_Chance_3-front-large.jpg"),
    audio_file: File.new("public/Chance The Rapper - Coloring Book/03 - Summer Friends (feat Jeremih Francis The Lights).mp3"),
    composer_id: chance_id,
    album: "Coloring Book",
    public: true
  },
  {
    title: "Same Drugs",
    image: File.new("public/Chance The Rapper - Coloring Book/00 - Chance_The_rapper_Chance_3-front-large.jpg"),
    audio_file: File.new("public/Chance The Rapper - Coloring Book/06 - Same Drugs.mp3"),
    composer_id: chance_id,
    album: "Coloring Book",
    public: true
  },
]);

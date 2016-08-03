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

User.create(
  users
);

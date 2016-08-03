# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

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

User.create(
  users
);

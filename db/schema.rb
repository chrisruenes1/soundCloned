# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160829015938) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.text     "content",      null: false
    t.integer  "author_id",    null: false
    t.integer  "track_id",     null: false
    t.float    "elapsed_time", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["author_id"], name: "index_comments_on_author_id", using: :btree
  add_index "comments", ["track_id"], name: "index_comments_on_track_id", using: :btree

  create_table "tracks", force: :cascade do |t|
    t.string   "title",                                  null: false
    t.integer  "composer_id",                            null: false
    t.string   "album"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.string   "audio_file_file_name"
    t.string   "audio_file_content_type"
    t.integer  "audio_file_file_size"
    t.datetime "audio_file_updated_at"
    t.text     "description"
    t.boolean  "public",                  default: true
    t.string   "genre"
    t.float    "duration",                default: 0.0,  null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tracks", ["album"], name: "index_tracks_on_album", using: :btree
  add_index "tracks", ["composer_id"], name: "index_tracks_on_composer_id", using: :btree
  add_index "tracks", ["genre"], name: "index_tracks_on_genre", using: :btree
  add_index "tracks", ["public"], name: "index_tracks_on_public", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "fname"
    t.string   "lname"
    t.string   "username",                        null: false
    t.string   "password_digest",                 null: false
    t.string   "session_token",                   null: false
    t.string   "group_name",         default: ""
    t.string   "city",               default: ""
    t.string   "state"
    t.text     "bio",                default: ""
    t.string   "custom_url",                      null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["city"], name: "index_users_on_city", using: :btree
  add_index "users", ["custom_url"], name: "index_users_on_custom_url", unique: true, using: :btree
  add_index "users", ["password_digest"], name: "index_users_on_password_digest", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end

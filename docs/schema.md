# Schema Information

## tracks
column name   | data type   | details
--------------|-------------|---------------------------------------------------
id            | integer     | not null, primary key
title         | string      | not null
composer_id   | integer     | not null, foreign key (references users), indexed
image_id      | integer     | not null, foreign key (references track_images)
audio_file_id | integer     | not null, foreign key (references audio_files)
album_title   | string      |


## comments
column name   | data type   | details
--------------|-------------|---------------------------------------------------
id            | integer     | not null, primary key
author_id     | integer     | not null, foreign key (references users), indexed
track_id      | integer     | not null, foreign key (references tracks), indexed
content       | string      | not null
song_location | timestamp   | not null

## profiles
column name   | data type   | details
--------------|-------------|---------------------------------------------------
id            | integer     | not null, primary key
user_id       | integer     | not null, foreign key (references users), indexed
fname         | string      |
lname         | string      |
group_name    | string      | not null
city          | string      | not null
state         | string      |
bio           | text        |

## users
column name     | data type | details
----------------|-----------|---------------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

## audio_files
column name     | data type | details                
----------------|-----------|----------------------------------------
id              | integer   | not null, primary key
data            | ?         | not null
track_id        | integer   | not null, foreign key, indexed, unique

## track_images
column name     | data type | details                
----------------|-----------|----------------------------------------
id              | integer   | not null, primary key
data            | ?         | not null
track_id        | integer   | not null, foreign key, indexed


## tags (bonus)
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

## taggings (bonus)
column name | data type | details
------------|-----------|-------------------------------------------------------------------
id          | integer   | not null, primary key
track_id    | integer   | not null, foreign key (references notes), indexed, unique [tag_id]
tag_id      | integer   | not null, foreign key (references tags), indexed

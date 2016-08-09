# Schema Information

## tracks
column name   | data type   | details
--------------|-------------|---------------------------------------------------
id            | integer     | not null, primary key
title         | string      | not null
composer_id   | integer     | not null, foreign key (references users), indexed
image         | file        | not null
audio_file    | file        | not null
album_title   | string      |


## comments
column name   | data type   | details
--------------|-------------|---------------------------------------------------
id            | integer     | not null, primary key
author_id     | integer     | not null, foreign key (references users), indexed
track_id      | integer     | not null, foreign key (references tracks), indexed
content       | string      | not null
song_location | float       | not null

## users
column name   | data type   | details
--------------|-------------|---------------------------------------------------
id              | integer       | not null, primary key
username        | string        | not null, indexed, unique
password_digest | string        | not null, indexed, unique
session_token   | string        | not null, indexed, unique
fname           | string        |
lname           | string        |
group_name      | string        | not null
city            | string        | not null, indexed
state           | string        |
bio             | text          |

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

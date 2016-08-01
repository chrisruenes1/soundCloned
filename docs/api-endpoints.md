# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

## JSON API

### Users

- `POST /api/users`
- `PATCH /api/users`

### Session

- `POST /api/session`
- `DELETE /api/session`
- `GET /api/session`

### Tracks

- `GET /api/tracks`
  - Tracks index(/search)(if i get there)
  - accepts `tag_name` query param to list tracks by tag (if I get there)
- `POST /api/tracks`
- `GET /api/tracks/:userId`
- `PATCH /api/tracks/:id`
- `DELETE /api/tracks/:id`

### Comments

- `POST /api/comments`
- `DELETE /api/comments/:id`
- `GET /api/tracks/:id/comments`
  - index of all notes for a notebook
  - this route may not end up being necessary since comment queries will be included in track queries

### Profiles

- `POST /api/profiles`
- `GET /api/profiles/:id`
- `PATCH /api/profiles/:id`

### Audio Files

- `POST /api/audio_files`
- `GET /api/audio_files/:id`
- `PATCH /api/audio_files/:id`
  -this route may not end up being necessary. I'll need to determine whether the idea of replacing
   a track's associated audio file with a different version warrants a PATCH or simply a POST
   and switching the pointer of the track to a new audio_file_id
- `DELETE /api/audio_files/:id`

### Track Images

- `POST /api/track_images`
- `GET api/track_images/:id`
- `PATCH api/track_images/:id`
  -see above in audio files for discussion of whether this route will be necessary
- `DELETE /api/audio_files/:id`

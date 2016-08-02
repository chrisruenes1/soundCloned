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
- `GET /api/tracks/:trackId`
- `GET /api/users/:userId/tracks`
- `PATCH /api/tracks/:id`
- `DELETE /api/tracks/:id`

### Comments

- `POST /api/comments`
- `DELETE /api/comments/:id`
- `GET /api/tracks/:id/comments`
  - index of all comments for a track
  - this route may not end up being necessary since comment queries will be included in track queries

### Profiles

- `POST /api/profiles`
- `GET /api/profiles/:id`
- `PATCH /api/profiles/:id`

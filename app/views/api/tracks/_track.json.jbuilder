json.extract! track, :title, :genre, :description, :composer_id, :album, :audio_file_file_name
json.image_url asset_path(track.image.url(:original))

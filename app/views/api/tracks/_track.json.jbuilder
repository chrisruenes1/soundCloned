json.extract! track, :title, :genre, :description, :composer, :album, :id
json.image_url asset_path(track.image.url(:original))
json.audio_file_url asset_path(track.audio_file.url(:original))

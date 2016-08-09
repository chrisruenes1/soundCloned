json.extract! track, :id, :title, :genre, :description, :composer, :album, :comments
json.image_url asset_path(track.image.url(:original))
json.audio_file_url asset_path(track.audio_file.url(:original))

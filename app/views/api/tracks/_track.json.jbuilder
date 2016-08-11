json.extract! track, :id, :title, :genre, :description, :duration, :composer, :album

json.comments track.comments do |comment|
  json.partial! 'api/comments/comment', comment:comment
end.sort_by do |comment|
  comment["elapsed_time"]
end

json.image_url asset_path(track.image.url(:original))
json.audio_file_url asset_path(track.audio_file.url(:original))

json.(comment, :id, :elapsed_time, :content, :track_id)
json.author do
  json.image_url asset_path(comment.author.image.url(:original))
  json.username comment.author.username
end

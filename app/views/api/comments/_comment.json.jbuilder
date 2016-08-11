json.extract! comment, :id, :elapsed_time, :content, :track_id
json.author do
  json.username comment.author.username
end

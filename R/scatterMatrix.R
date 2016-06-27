###returns json object to render scatter matrix plot

scatterMatrix <- function(data = ""){

  library(jsonlite)

  data <- fromJSON(data)

  data <- sapply(data, as.character)
  data <- as.data.frame(data)

  json_string <- toJSON(data)

  list(message = paste(json_string))
}

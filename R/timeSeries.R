###returns json object to render time series plot

timeSeries <- function(data = ""){

  library(jsonlite)

  data <- fromJSON(data)

  index <- apply(data, 1, function(x){!all(is.na(x))})
  data <- data[index, ]

  data <- sapply(data, as.character)
  data <- as.data.frame(data)
  json_string <- toJSON(data)

  list(message = paste(json_string), count = paste(dim(data)[2]))
}

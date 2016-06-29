###returns json object to render time series plot

timeSeries <- function(data = ""){

  library(jsonlite)

  data <- fromJSON(data)

  data <- do.call("cbind", data)
  data <- data.frame(data)
  data <- na.omit(data)

  data <- sapply(data, as.character)
  data <- as.data.frame(data)
  json_string <- toJSON(data)

  list(message = paste(json_string), count = paste(dim(data)[2]))
}

###returns json object to render group bar plot

groupBar <- function(data = ""){

  library(jsonlite)

  data <- fromJSON(data)
  colnames(data)[1] <- "Group"

  data <- sapply(data, as.character)
  data <- as.data.frame(data)

  l <- dim(data)[1]
  data <- data[1:l-1, ]
  
  json_string <- toJSON(data)

  list(message = paste(json_string))
}

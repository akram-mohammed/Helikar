###returns json object to render scatter matrix plot

q_qplot <- function(data = ""){

  library(jsonlite)

  data <- fromJSON(data)

  data <- lapply(data, function(x) {
    x[sapply(x, is.null)] <- NA
    unlist(x)
  })

  data <- do.call("cbind", json_file)
  data <- data.frame(data)
  data <- na.omit(data)

  cor <- qqplot(data$X, data$Y)

  data <- data.frame(X = cor$x, Y = cor$y)
  data <- sapply(data, as.character)
  data <- as.data.frame(data)
  json_string <- toJSON(data)

  list(message = paste(json_string))
}

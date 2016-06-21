kmeans <- function(myname = ""){

  library(jsonlite)
  
  data <- fromJSON(myname)
  colnames(data) <- c("X", "Y")

  cl <- kmeans(data, 6)

  data <- cbind(description = c(1:dim(data)), data, cl = cl$cluster)

  center <- cl$centers
  colnames(center) <- c("X", "Y")
  center <- cbind(description = rep("center", dim(center)[1]), center, cl = c(1:dim(center)[1]))

  data <- merge(data, center, all = TRUE)

  json_string <- toJSON(data)
  list(message = paste(json_string))
}

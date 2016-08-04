kmeansClustring <- function(data, var_x, var_y, kvalue){

  library(jsonlite)

  data <- fromJSON(data)
  data <- na.omit(data)
  data <- data[c(var_x, var_y)]
  colnames(data) <- c("X", "Y")

  cl <- kmeans(x = data, centers = kvalue)

  data <- cbind(description = c(1:dim(data)[1]), data, cl = cl$cluster)

  center <- cl$centers
  colnames(center) <- c("X", "Y")
  center <- cbind(description = rep("center", dim(center)[1]), center, cl = c(1:dim(center)[1]))

  data <- merge(data, center, all = TRUE)

  kmeansdata <- toJSON(data)
  list(message = paste(kmeansdata))
}

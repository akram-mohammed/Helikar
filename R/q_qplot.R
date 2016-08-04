q_qplot <- function(data, var_x, var_y){

  library(jsonlite)

  data <- fromJSON(data)

  data <- na.omit(data)
  data <- data[c(var_x, var_y)]
  colnames(data) <- c("X", "Y")

  cor <- qqplot(data$X, data$Y)
  data <- data.frame(X = cor$x, Y = cor$y)
  data <- sapply(data, as.character)
  data <- as.data.frame(data)
  qqdata <- toJSON(data)

  ss <- smooth.spline(cor$y~cor$x, spar = 1)
  data <- data.frame(X = ss$x, Y = ss$y)
  data <- sapply(data, as.character)
  data <- as.data.frame(data)
  linedata <- toJSON(data)

  list(qqdata = paste(qqdata), linedata = paste(linedata))
}

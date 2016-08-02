regression <- function(data, var_s){
  library(jsonlite)

  data <- fromJSON(data)
  data <- na.omit(data)
  data <- data[var_s]
  colnames(data)[1] <- "x"

  col1 <- rep(data$x, dim(data)[2] - 1)
  col2 <- data
  col2$x <- NULL
  col2 <- unlist(col2)
  cl <- rep(1:(dim(data)[2]-1), each = dim(data)[1])
  scatterdata <- cbind(X = col1, Y = col2)
  scatterdata <- cbind(description = rownames(scatterdata), scatterdata, cl = cl)
  rownames(scatterdata) <- 1:nrow(scatterdata)
  scatterdata <- data.frame(scatterdata)
  scatterdata <- toJSON(scatterdata)

  formula <- as.formula(paste("x~",paste(var_s[-1],collapse="+")))
  fit <- lm(formula, data = data)
  co <- fit$coefficients

  x <- data$x
  data$x <- NULL

  data <- cbind(intercept = rep(1, dim(data)[1]), data)
  y <- co*data
  y <- rowSums(data)

  linedata <- cbind(X = x, Y = y)
  linedata <- data.frame(linedata)
  linedata <- linedata[order(linedata$X), ]
  linedata <- sapply(linedata, as.character)
  linedata <- data.frame(linedata)
  linedata <- toJSON(linedata)

  list(scatterdata = paste(scatterdata), linedata = paste(linedata))
}

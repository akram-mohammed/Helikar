comatrix <- function(data = "", method = ""){

  library(jsonlite)

  data <- fromJSON(data)
  data <- data.frame(data)
  data <- na.omit(data)
  rownames(data) <- as.vector(data[,1])
  data[,1] <- NULL
  data <- as.matrix(data)

  if(method == 'cor'){
    mat = cor(data)
  }
  if(method == 'cov'){
    mat = cov(data)
  }

  t <- dim(mat)[1]

  V1 <- rep("R", t)
  V2 <- rownames(mat)
  columns <- data.frame(V1, V2)
  columns <- as.matrix(columns)

  index <- V2
  data <- as.matrix(mat)

  out <- list(columns = columns, index = index, data = data)
  out <- toJSON(out)

  list(message = paste(out))

}

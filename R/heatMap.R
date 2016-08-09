heatMap <- function(data){

  library(jsonlite)

  data <- fromJSON(data)
  data <- na.omit(data)

  rowNames <- as.vector(data[,1])
  data[,1] <- NULL
  colNames <- colnames(data)
  colnames(data) <- 1:ncol(data)

  data <- as.matrix(data)
  data <- as.vector(data)

  maxValue = max(data)
  minValue = min(data)

  newRow <- rep(1:length(rowNames), length(colNames))
  newCol <- rep(1:length(colNames), each = length(rowNames))

  data <- cbind(row = newRow, col = newCol, value = data)
  data <- data.frame(data)

  heatmapdata <- toJSON(data)

  list(heatmapdata = paste(heatmapdata))
}

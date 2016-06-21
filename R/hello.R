#' Hello World
#'
#' Basic hello world function to be called from the demo app
#'
#' @export
#' @param myname your name. Required.
hello <- function(myname = ""){

library(jsonlite)
json_file <- '[{"rows":"Mazda RX4","mpg":21,"cyl":6,"disp":160,"hp":110,"drat":3.9,"wt":2.62,"_row":"Mazda RX4"},{"rows":"Mazda RX4 Wag","mpg":21,"cyl":6,"disp":160,"hp":110,"drat":3.9,"wt":2.875,"_row":"Mazda RX4 Wag"},{"rows":"Datsun 710","mpg":22.8,"cyl":4,"disp":108,"hp":93,"drat":3.85,"wt":2.32,"_row":"Datsun 710"},{"rows":"Hornet 4 Drive","mpg":21.4,"cyl":6,"disp":258,"hp":110,"drat":3.08,"wt":3.215,"_row":"Hornet 4 Drive"}]'
json_file <- fromJSON(json_file)

json_file <- lapply(json_file, function(x) {
  x[sapply(x, is.null)] <- NA
  unlist(x)
})

data <- do.call("cbind", json_file)
data <- data.frame(data)
rownames(data) <- data$rows
data$rows <- NULL
d <- dist(data)
hc <- hclust(d)

#plot(hc)

#names(hc)
mergeData <- data.frame(hc$merge)
lableData <- hc$labels
size <- dim(mergeData)
storeData <- c(1:size[1])

for (i in 1:size[1]) {
  index1 <- mergeData$X1[i]
  index2 <- mergeData$X2[i]

  if (index1 < 0 & index2 < 0) {
    string <- paste('{"name": "","children":[{"name":"',
                    lableData[-index2], '"},{"name":"',lableData[-index1],'"}]}',
                    collapse = "")
  }
  else if (index1 > 0 & index2 > 0) {
    string <- paste('{"name": "","children":[',
                    storeData[index1], ',',storeData[index2],']}',
                    collapse = "")
  }
  else if (index1 > 0 & index2 < 0) {
    string <- paste('{"name": "","children":[',
                    storeData[index1], ',{"name":"',lableData[-index2],'"}]}',
                    collapse = "")
  }
  else if (index1 < 0 & index2 > 0) {
    string <- paste('{"name": "","children":[{"name":"',
                    lableData[-index1],'"},',storeData[index2],']}',
                    collapse = "")
  }
  storeData[i] <- string
}
list(message = paste(storeData[size[1]]))
}

###returns json object to render simple bar plot

simpleBar <- function(data = "", value = ""){

library(jsonlite)

data <- fromJSON(data)

colnames(data)[1] <- "Group"

data <- sapply(data, as.character)
data <- as.data.frame(data)

l <- dim(data)[1]
data <- data[1:l-1, ]

data <- data[value]

Group <- data$Group
data <- cbind(Group, data)

colnames(data) <- c('Group', 'value')

json_string <- toJSON(data)
list(message = paste(json_string))
}

scatterplot <- function(data, var_x, var_y){
  library(jsonlite)

  data <- fromJSON(data)
  data <- na.omit(data)
  data <- data[c(var_x, var_y)]
  colnames(data) <- c("X", "Y")
  rownames(data) <- 1:nrow(data)

  x <- data$X
  y <- data$Y

  scatterdata <- sapply(data, as.character)
  scatterdata <- data.frame(scatterdata)
  scatterdata <- toJSON(scatterdata)

  # basic straight line of fit
  f <- function(x,a,b) {a*x + b}
  fit <- glm(y~x)
  co <- coef(fit)
  coly <- f(x, co[2], co[1])
  lindata <- cbind(X = x, Y = coly)
  lindata <- data.frame(lindata)
  lindata <- sapply(lindata, as.character)
  lindata <- data.frame(lindata)
  lindata <- toJSON(lindata)

  # exponential
  f <- function(x,a,b) {a * exp(b * x)}
  expdata <- tryCatch(nls(y ~ f(x,a,b), start = c(a=1, b=1)), error=function(e) "Singular Gradient")
  if(expdata != "Singular Gradient"){
    fit <- nls(y ~ f(x,a,b), start = c(a=1, b=1))
    co <- coef(fit)
    coly <- f(x,co[1],co[2])
    expdata <- cbind(X = x, Y = coly)
    expdata <- data.frame(expdata)
    expdata <- sapply(expdata, as.character)
    expdata <- data.frame(expdata)
    expdata <- toJSON(expdata)
  }

  # logarithmic
  f <- function(x,a,b) {a * log(x) + b}
  fit <- nls(y ~ f(x,a,b), start = c(a=1, b=1))
  co <- coef(fit)
  coly <- f(x,co[1],co[2])
  logdata <- cbind(X = x, Y = coly)
  logdata <- data.frame(logdata)
  logdata <- sapply(logdata, as.character)
  logdata <- data.frame(logdata)
  logdata <- toJSON(logdata)

  # polynomial
  f <- function(x,a,b,d) {(a*x^2) + (b*x) + d}
  fit <- nls(y ~ f(x,a,b,d), start = c(a=1, b=1, d=1))
  co <- coef(fit)
  coly <- f(x,co[1],co[2], co[3])
  poldata <- cbind(X = x, Y = coly)
  poldata <- as.data.frame(poldata)
  poldata <- sapply(poldata, as.character)
  poldata <- as.data.frame(poldata)
  poldata <- toJSON(poldata)

  list(scatterdata = paste(scatterdata), lindata = paste(lindata), logdata = paste(logdata), poldata = paste(poldata), expdata = paste(expdata))
}

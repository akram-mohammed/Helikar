scatterplot <- function(data, var_x, var_y){
  library(jsonlite)

  data <- fromJSON(data)
  data <- na.omit(data)

  data <- data[c(var_x, var_y)]
  colnames(data) <- c("X", "Y")
  rownames(data) <- 1:nrow(data)

  scatterdata <- toJSON(data)

  x <- data$X
  y <- data$Y

  # basic straight line of fit
  fit <- glm(y~x)
  co <- coef(fit)
  intercept <- as.vector(fit$coefficients[1])
  slope <- as.vector(fit$coefficients[2])

  # exponential
  f <- function(x,a,b) {a * exp(b * x)}
  expdata <- tryCatch(nls(y ~ f(x,a,b), start = c(a=1, b=1)), error=function(e) "Singular Gradient")
  if(expdata != "Singular Gradient"){
    fit <- nls(y ~ f(x,a,b), start = c(a=1, b=1))
    co <- coef(fit)
    expdata <- curve(f(x, a=co[1], b=co[2]))
    expdata <- sapply(expdata, as.character)
    expdata <- as.data.frame(expdata)
    colnames(expdata) <- c("X", "Y")
    expdata <- toJSON(expdata)
  }

  # logarithmic
  f <- function(x,a,b) {a * log(x) + b}
  fit <- nls(y ~ f(x,a,b), start = c(a=1, b=1))
  co <- coef(fit)
  logdata <- curve(f(x, a=co[1], b=co[2]))
  logdata <- sapply(logdata, as.character)
  logdata <- as.data.frame(logdata)
  colnames(logdata) <- c("X", "Y")
  logdata <- toJSON(logdata)

  # polynomial
  f <- function(x,a,b,d) {(a*x^2) + (b*x) + d}
  fit <- nls(y ~ f(x,a,b,d), start = c(a=1, b=1, d=1))
  co <- coef(fit)
  poldata <- curve(f(x, a=co[1], b=co[2], d=co[3]))
  poldata <- sapply(poldata, as.character)
  poldata <- as.data.frame(poldata)
  colnames(poldata) <- c("X", "Y")
  poldata <- toJSON(poldata)

  list(scatterdata = paste(scatterdata), intercept = (intercept), slope = paste(slope), expdata = paste(expdata), logdata = paste(logdata), poldata = paste(poldata))
}

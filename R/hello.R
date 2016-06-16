#' Hello World
#'
#' Basic hello world function to be called from the demo app
#'
#' @export
#' @param myname your name. Required.
hello <- function(myname = ""){

#if (!require("rjson")) {
#  install.packages("rjson", dependencies = TRUE)
#  library(rjson)
#}

json_file <-  '[
 {
 "rows": [ "Mazda RX4" ],
"mpg": [     21 ],
"cyl": [      6 ],
"disp": [    160 ],
"hp": [    110 ],
"drat": [    3.9 ],
"wt": [   2.62 ],
"qsec": [  16.46 ],
"vs": [      0 ],
"am": [      1 ],
"gear": [      4 ],
"carb": [      4 ]
},
{
 "rows": [ "Mazda RX4 Wag" ],
"mpg": [     21 ],
"cyl": [      6 ],
"disp": [    160 ],
"hp": [    110 ],
"drat": [    3.9 ],
"wt": [  2.875 ],
"qsec": [  17.02 ],
"vs": [      0 ],
"am": [      1 ],
"gear": [      4 ],
"carb": [      4 ]
},
{
 "rows": [ "Datsun 710" ],
"mpg": [   22.8 ],
"cyl": [      4 ],
"disp": [    108 ],
"hp": [     93 ],
"drat": [   3.85 ],
"wt": [   2.32 ],
"qsec": [  18.61 ],
"vs": [      1 ],
"am": [      1 ],
"gear": [      4 ],
"carb": [      1 ]
},
{
 "rows": [ "Hornet 4 Drive" ],
"mpg": [   21.4 ],
"cyl": [      6 ],
"disp": [    258 ],
"hp": [    110 ],
"drat": [   3.08 ],
"wt": [  3.215 ],
"qsec": [  19.44 ],
"vs": [      1 ],
"am": [      0 ],
"gear": [      3 ],
"carb": [      1 ]
},
{
 "rows": [ "Hornet Sportabout" ],
"mpg": [   18.7 ],
"cyl": [      8 ],
"disp": [    360 ],
"hp": [    175 ],
"drat": [   3.15 ],
"wt": [   3.44 ],
"qsec": [  17.02 ],
"vs": [      0 ],
"am": [      0 ],
"gear": [      3 ],
"carb": [      2 ]
},
{
 "rows": [ "Valiant" ],
"mpg": [   18.1 ],
"cyl": [      6 ],
"disp": [    225 ],
"hp": [    105 ],
"drat": [   2.76 ],
"wt": [   3.46 ],
"qsec": [  20.22 ],
"vs": [      1 ],
"am": [      0 ],
"gear": [      3 ],
"carb": [      1 ]
},
{
 "rows": [ "Duster 360" ],
"mpg": [   14.3 ],
"cyl": [      8 ],
"disp": [    360 ],
"hp": [    245 ],
"drat": [   3.21 ],
"wt": [   3.57 ],
"qsec": [  15.84 ],
"vs": [      0 ],
"am": [      0 ],
"gear": [      3 ],
"carb": [      4 ]
},
{
 "rows": [ "Merc 240D" ],
"mpg": [   24.4 ],
"cyl": [      4 ],
"disp": [  146.7 ],
"hp": [     62 ],
"drat": [   3.69 ],
"wt": [   3.19 ],
"qsec": [     20 ],
"vs": [      1 ],
"am": [      0 ],
"gear": [      4 ],
"carb": [      2 ]
},
{
 "rows": [ "Merc 230" ],
"mpg": [   22.8 ],
"cyl": [      4 ],
"disp": [  140.8 ],
"hp": [     95 ],
"drat": [   3.92 ],
"wt": [   3.15 ],
"qsec": [   22.9 ],
"vs": [      1 ],
"am": [      0 ],
"gear": [      4 ],
"carb": [      2 ]
},
{
 "rows": [ "Merc 280" ],
"mpg": [   19.2 ],
"cyl": [      6 ],
"disp": [  167.6 ],
"hp": [    123 ],
"drat": [   3.92 ],
"wt": [   3.44 ],
"qsec": [   18.3 ],
"vs": [      1 ],
"am": [      0 ],
"gear": [      4 ],
"carb": [      4 ]
},
{
 "rows": [ "Merc 280C" ],
"mpg": [   17.8 ],
"cyl": [      6 ],
"disp": [  167.6 ],
"hp": [    123 ],
"drat": [   3.92 ],
"wt": [   3.44 ],
"qsec": [   18.9 ],
"vs": [      1 ],
"am": [      0 ],
"gear": [      4 ],
"carb": [      4 ]
},
{
 "rows": [ "Merc 450SE" ],
"mpg": [   16.4 ],
"cyl": [      8 ],
"disp": [  275.8 ],
"hp": [    180 ],
"drat": [   3.07 ],
"wt": [   4.07 ],
"qsec": [   17.4 ],
"vs": [      0 ],
"am": [      0 ],
"gear": [      3 ],
"carb": [      3 ]
},
{
 "rows": [ "Merc 450SL" ],
"mpg": [   17.3 ],
"cyl": [      8 ],
"disp": [  275.8 ],
"hp": [    180 ],
"drat": [   3.07 ],
"wt": [   3.73 ],
"qsec": [   17.6 ],
"vs": [      0 ],
"am": [      0 ],
"gear": [      3 ],
"carb": [      3 ]
},
{
 "rows": [ "Merc 450SLC" ],
"mpg": [   15.2 ],
"cyl": [      8 ],
"disp": [  275.8 ],
"hp": [    180 ],
"drat": [   3.07 ],
"wt": [   3.78 ],
"qsec": [     18 ],
"vs": [      0 ],
"am": [      0 ],
"gear": [      3 ],
"carb": [      3 ]
},
{
 "rows": [ "Cadillac Fleetwood" ],
"mpg": [   10.4 ],
"cyl": [      8 ],
"disp": [    472 ],
"hp": [    205 ],
"drat": [   2.93 ],
"wt": [   5.25 ],
"qsec": [  17.98 ],
"vs": [      0 ],
"am": [      0 ],
"gear": [      3 ],
"carb": [      4 ]
},
{
 "rows": [ "Lincoln Continental" ],
"mpg": [   10.4 ],
"cyl": [      8 ],
"disp": [    460 ],
"hp": [    215 ],
"drat": [      3 ],
"wt": [  5.424 ],
"qsec": [  17.82 ],
"vs": [      0 ],
"am": [      0 ],
"gear": [      3 ],
"carb": [      4 ]
},
{
 "rows": [ "Chrysler Imperial" ],
"mpg": [   14.7 ],
"cyl": [      8 ],
"disp": [    440 ],
"hp": [    230 ],
"drat": [   3.23 ],
"wt": [  5.345 ],
"qsec": [  17.42 ],
"vs": [      0 ],
"am": [      0 ],
"gear": [      3 ],
"carb": [      4 ]
},
{
 "rows": [ "Fiat 128" ],
"mpg": [   32.4 ],
"cyl": [      4 ],
"disp": [   78.7 ],
"hp": [     66 ],
"drat": [   4.08 ],
"wt": [    2.2 ],
"qsec": [  19.47 ],
"vs": [      1 ],
"am": [      1 ],
"gear": [      4 ],
"carb": [      1 ]
},
{
 "rows": [ "Honda Civic" ],
"mpg": [   30.4 ],
"cyl": [      4 ],
"disp": [   75.7 ],
"hp": [     52 ],
"drat": [   4.93 ],
"wt": [  1.615 ],
"qsec": [  18.52 ],
"vs": [      1 ],
"am": [      1 ],
"gear": [      4 ],
"carb": [      2 ]
},
{
 "rows": [ "Toyota Corolla" ],
"mpg": [   33.9 ],
"cyl": [      4 ],
"disp": [   71.1 ],
"hp": [     65 ],
"drat": [   4.22 ],
"wt": [  1.835 ],
"qsec": [   19.9 ],
"vs": [      1 ],
"am": [      1 ],
"gear": [      4 ],
"carb": [      1 ]
},
{
 "rows": [ "Toyota Corona" ],
"mpg": [   21.5 ],
"cyl": [      4 ],
"disp": [  120.1 ],
"hp": [     97 ],
"drat": [    3.7 ],
"wt": [  2.465 ],
"qsec": [  20.01 ],
"vs": [      1 ],
"am": [      0 ],
"gear": [      3 ],
"carb": [      1 ]
},
{
 "rows": [ "Dodge Challenger" ],
"mpg": [   15.5 ],
"cyl": [      8 ],
"disp": [    318 ],
"hp": [    150 ],
"drat": [   2.76 ],
"wt": [   3.52 ],
"qsec": [  16.87 ],
"vs": [      0 ],
"am": [      0 ],
"gear": [      3 ],
"carb": [      2 ]
},
{
 "rows": [ "AMC Javelin" ],
"mpg": [   15.2 ],
"cyl": [      8 ],
"disp": [    304 ],
"hp": [    150 ],
"drat": [   3.15 ],
"wt": [  3.435 ],
"qsec": [   17.3 ],
"vs": [      0 ],
"am": [      0 ],
"gear": [      3 ],
"carb": [      2 ]
},
{
 "rows": [ "Camaro Z28" ],
"mpg": [   13.3 ],
"cyl": [      8 ],
"disp": [    350 ],
"hp": [    245 ],
"drat": [   3.73 ],
"wt": [   3.84 ],
"qsec": [  15.41 ],
"vs": [      0 ],
"am": [      0 ],
"gear": [      3 ],
"carb": [      4 ]
},
{
 "rows": [ "Pontiac Firebird" ],
"mpg": [   19.2 ],
"cyl": [      8 ],
"disp": [    400 ],
"hp": [    175 ],
"drat": [   3.08 ],
"wt": [  3.845 ],
"qsec": [  17.05 ],
"vs": [      0 ],
"am": [      0 ],
"gear": [      3 ],
"carb": [      2 ]
},
{
 "rows": [ "Fiat X1-9" ],
"mpg": [   27.3 ],
"cyl": [      4 ],
"disp": [     79 ],
"hp": [     66 ],
"drat": [   4.08 ],
"wt": [  1.935 ],
"qsec": [   18.9 ],
"vs": [      1 ],
"am": [      1 ],
"gear": [      4 ],
"carb": [      1 ]
},
{
 "rows": [ "Porsche 914-2" ],
"mpg": [     26 ],
"cyl": [      4 ],
"disp": [  120.3 ],
"hp": [     91 ],
"drat": [   4.43 ],
"wt": [   2.14 ],
"qsec": [   16.7 ],
"vs": [      0 ],
"am": [      1 ],
"gear": [      5 ],
"carb": [      2 ]
},
{
 "rows": [ "Lotus Europa" ],
"mpg": [   30.4 ],
"cyl": [      4 ],
"disp": [   95.1 ],
"hp": [    113 ],
"drat": [   3.77 ],
"wt": [  1.513 ],
"qsec": [   16.9 ],
"vs": [      1 ],
"am": [      1 ],
"gear": [      5 ],
"carb": [      2 ]
},
{
 "rows": [ "Ford Pantera L" ],
"mpg": [   15.8 ],
"cyl": [      8 ],
"disp": [    351 ],
"hp": [    264 ],
"drat": [   4.22 ],
"wt": [   3.17 ],
"qsec": [   14.5 ],
"vs": [      0 ],
"am": [      1 ],
"gear": [      5 ],
"carb": [      4 ]
},
{
 "rows": [ "Ferrari Dino" ],
"mpg": [   19.7 ],
"cyl": [      6 ],
"disp": [    145 ],
"hp": [    175 ],
"drat": [   3.62 ],
"wt": [   2.77 ],
"qsec": [   15.5 ],
"vs": [      0 ],
"am": [      1 ],
"gear": [      5 ],
"carb": [      6 ]
},
{
 "rows": [ "Maserati Bora" ],
"mpg": [     15 ],
"cyl": [      8 ],
"disp": [    301 ],
"hp": [    335 ],
"drat": [   3.54 ],
"wt": [   3.57 ],
"qsec": [   14.6 ],
"vs": [      0 ],
"am": [      1 ],
"gear": [      5 ],
"carb": [      8 ]
},
{
 "rows": [ "Volvo 142E" ],
"mpg": [   21.4 ],
"cyl": [      4 ],
"disp": [    121 ],
"hp": [    109 ],
"drat": [   4.11 ],
"wt": [   2.78 ],
"qsec": [   18.6 ],
"vs": [      1 ],
"am": [      1 ],
"gear": [      4 ],
"carb": [      2 ]
}
]'
json_file <- rjson::fromJSON(json_file)

json_file <- lapply(json_file, function(x) {
  x[sapply(x, is.null)] <- NA
  unlist(x)
})

data <- do.call("rbind", json_file)
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

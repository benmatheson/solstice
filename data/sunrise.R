library(tidyverse)
library(jsonlite)
library(readxl)
library(lubridate)

setwd("projects/sunrise/data")
getwd()

sunriseRaw <- read_csv("sunrise.csv")
sunriseRawExcel <- read_excel("sunrise_clean.xlsx")


View(sunriseRawExcel)
sunriseData <- sunriseRawExcel[1:20,1:3]
sunriseData <-sunriseData  %>%  mutate(sunriseTime =  hms::as.hms(sunrise))
sunriseData <-sunriseData  %>%  mutate(sunsetTime =  hms::as.hms(sunset))


View(sunriseData)

write_csv(sunriseData, "sunrise_export.csv")



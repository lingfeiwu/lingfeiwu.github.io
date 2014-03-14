---
layout: post
title: "Recoding in R"
date: 2013-08-14 14:23
comments: true
categories: 
- R
tags:
- encoding
---

Recoding variables is fairly easy in R. Here I summarize three appoaches and recommend the first one to you. 


![](http://farm4.staticflickr.com/3710/9508687722_545101d405.jpg)

##1.List slicing

The method of list slicing is the most convenient way to recode a variable. 

    	x = 1:10
    	x[x == 1] = 0
    	x[x > 1 & x < 6] = 1
    	x[x >= 6] = 3
     
    	> x
    	> [1] 0 1 1 1 1 3 3 3 3 3
    
    	x[x == 1 | x == 0] = 4
    
    	> x
    	> [1] 4 4 4 4 4 3 3 3 3 3


Here is another example to create 3 age categories 

	attach(mydata)
	mydata$agecat[age > 75] <- "Elder"
	mydata$agecat[age > 45 & age <= 75] <- "Middle Aged"
	mydata$agecat[age <= 45] <- "Young"
	detach(mydata)
    
##2.ifelse
For dummy coding, ifelse function could be easily employed. 


    top$sportsEtc<-ifelse(top$category=="Animals"
	|top$category=="Autos"
	|top$category=="Games"
	|top$category=="People"
	|top$category=="Sports"
	|top$category=="Travel",
	 1, 0)


##3. Using the recode function in the car library

Taking the example from recode in the car package

	library(car)

	x <- rep(1:3, 3)
	> x
	[1] 1 2 3 1 2 3 1 2 3

	newx <- recode(x, "c(1,2)='A'; else='B'")
	> newx
	[1] "A" "A" "B" "A" "A" "B" "A" "A" "B"
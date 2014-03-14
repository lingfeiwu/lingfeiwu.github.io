---
layout: post
title: "Plot regression coefficient with R"
date: 2013-08-16 18:14
comments: true
categories: R
---


To visualize the regression coefficient is very useful. There are at least to packages (arm, coefplot) devoted to this purpose. However, both them are not beautiful enough, compared with the effect of boxplot. 


I refer to the R script written by [Carlisle Rainey](http://www.carlislerainey.com/2012/06/30/coefficient-plots-in-r/). What I do is to add rectangles and vertical line into the plot made by Carlisle Rainey.Please refer to this post for more information: [http://www.carlislerainey.com/2012/06/30/coefficient-plots-in-r/](http://www.carlislerainey.com/2012/06/30/coefficient-plots-in-r/)


![](http://farm4.staticflickr.com/3737/9520667493_576a8525c7_z.jpg)

Figure 1 Plot with rectangles and vertical lines


Here is the R script:

	library(arm)
	library(alr3) # load the alr3 package (contains data set for illustration)
	data(highway) # load the highway data set from alr3
	d <- highway  # call the data set d for convenience
	
	m <- lm(Rate ~ Lwid + Shld + Lane + Len + ADT + Trks, data = d)  # estimate the normal linear model
	
	## create a vector to store the variable names
	var.names <- c("lane width, in feet", "width in feet of outer\nshoulder on the roadway",
	  "total number of lanes\nof traffic", "length of the highway\nsegment in miles",
	  "average daily traffic\ncount in thousands", "truck volume as a percent\nof the total volume")
	
	## set up the plot region:
	plot(c(100, 250), c(300, 450), type = "n")
	rect(120,300, 180, 305, col=rainbow(11, start=.7,end=.1))
	
	## Plot Labels outside graph
	
	# set the graphical parameters
	par(
	  family = "serif",  # I don't plot in anything but serif
	  oma = c(0,0,0,0),  # Since it is a single plot, I set the outer margins to zero.
	  mar = c(5,10,4,2)  # Inner margins are set through a little trial and error.
	  )
	
	# create an empty plot for total customization
	plot(NULL,                              # create empty plot
	  xlim = c(-2, 2),                      # set xlim by guessing
	  ylim = c(.7, length(var.names) + .3), # set ylim by the number of variables
	  axes = F, xlab = NA, ylab = NA)       # turn off axes and labels
	
	# add the data
	est <- coef(m)[-1]              # conveniently store the estimates (minus the constant)
	se <- sqrt(diag(vcov(m)))[-1]   # conveniently store the std. errors (minus the constant)
	for (i in 1:length(est)) {                # loop over a counter the length of the estimate vector
	  points(est[i], i, pch = 3, cex = .5)     # add the points to the plot
	  points(est[i]+ 1.64*se[i], i, pch = "|", cex = 1.5) ## add the verticle lines
	  points(est[i]- 1.64*se[i], i, pch = "|", cex = 1.5) ## add the verticle lines
	  lines(c(est[i] + 1.64*se[i], est[i] - 1.64*se[i]), c(i, i), )         # add the 90% confidence intervals
	  rect(est[i] + .67*se[i],i-0.1, est[i]- .67*se[i], i+0.1, col="#0000ff22") ## add rectancles to present 50% confidence intervals
	  text(-2.9, i, var.names[i], xpd = T, cex = .8)                      # add the variable names
	}
	
	# add axes and labels
	axis(side = 1)                                                                                          # add bottom axis
	abline(v = 0, lty = 3, col = "grey")                                                                    # add verticle line
	mtext(side = 1, "Linear Regression Coefficient", line = 3)                                              # label bottom axis
	mtext(side = 3, "Linear Regression Model of\n the Accident Rate per Million Vehicle Miles", line = 1)   # add title
	box() 
{:lang="ruby"}
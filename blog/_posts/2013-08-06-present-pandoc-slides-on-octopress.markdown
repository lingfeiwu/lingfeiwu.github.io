---
layout: post
title: "Hosting pandoc slides on Octopress"
date: 2013-08-06 18:50
comments: true
categories: octopress
---

## 

I have made a dzslides from a markdown file using pandoc, and then I want to archive and present it on octopress. Check the result to learn about how to make simple slides using pandoc [here](http://chengjun.github.io/slides/pandoc-slides).

The mechanism of octopress is a little bit inflexible. 

![](http://farm8.staticflickr.com/7340/9450821728_ac4f8c375e_o.png)

Basicially, we generate markdown files in the directory of _posts:

	rake new_post["the title of your post"]

and then we transform the markdown files to html placed in the dirctory of public. 

	rake generate

After that, we deploy the html files to the server. 

	rake deploy

Thus, accordingly, the solution is given as following:

First, we make a slides folder in the source directory, e.g., "octopress/source/slides/", and put the html of slide into this folder. 

Second, we generate the file to the public folder and deploy the html file to the server.
	
	rake generate
	rake deploy

You can open the slides directly with the url: http://chengjun.github.io/slides/pandoc-slides
	

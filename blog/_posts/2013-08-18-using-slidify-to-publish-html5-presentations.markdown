---
layout: post
title: "Using slidify to publish HTML5 presentations"
date: 2013-08-18 00:30
comments: true
categories: R Pandoc Markdown Reveal.js
---

I am inspired to use markdown to make HTML5 slides, However the specification is too hard. Actually, I don't know how to make it less ugly, especilly for the first page of the slides. 

By chance, I find Torres's slides ([Click here](http://lcolladotor.github.io/Rmd-intro/)), it is made through R using the slidify package. Of course, you also need to write R markdown using Rstudio and Knitr. 

# Install slidify package in Rstudio

	install_github('slidify', 'ramnathv')
	install_github('slidifyLibraries', 'ramnathv')
{:lang="ruby"}

However, to install R packages host on Github is very painful. I failed in installing the slidifyLibrairies package. 

Following thie post [installing-slidify-on-a-windows-machine](http://thiagosilva.wordpress.com/2013/02/17/installing-slidify-on-a-windows-machine/). Althought I have tried R CMD INSTALL, but failed. I don't know why :<, however, I use the alternative method to install R packages on local computers.

First, download slidifyLibraries from [github](https://github.com/ramnathv/slidifyLibraries) to your local directory, e.g., "D:/github/".

Second, extract it and rename it as "slidifyLibraries".

Third, build it with this R script: 

	build("D:/github/slidifyLibraries/", binary=FALSE)
{:lang="ruby"}

Fourth, install the tar.gz file following this R script:

	install.packages("D:/github/slidifyLibraries_0.1.tar.gz", repos = NULL, type = "source")
{:lang="ruby"}

# Using slidify to write R markdown

initialize a presentation following this introduction about [slidify](https://github.com/ramnathv/slidify). 

	library(slidify)
	author('mydeck')
{:lang="ruby"}


# Write markdown files


<iframe width="420" height="315" src="//www.youtube.com/embed/I95GOmLc7TA" frameborder="0" allowfullscreen></iframe>

    <iframe width="420" 
	height="315" src="//www.youtube.com/embed/I95GOmLc7TA" 
	frameborder="0" allowfullscreen></iframe>
{:lang="ruby"}


Check my first slidify HTML5 slides here: chengjun.github.io/slides/computational-communication.html

Click [here](http://chengjun.github.io/slides/computational-communication.html) to see it.  

![](http://gifs.gifbin.com/1236681924_snail_transformers.gif)

The markdown file is given below (I choose "standalone" as the mode):

	---
	title       : The Way to Computational Communication
	subtitle    : 
	author      : Cheng-Jun Wang
	job         : Web Mining Web, City University of Hong Kong
	framework   : io2012        # {io2012, html5slides, shower, dzslides, ...}
	highlighter : highlight.js  # {highlight.js, prettify, highlight}
	hitheme     : tomorrow      # 
	widgets     : []            # {mathjax, quiz, bootstrap}
	mode        : standalone # {standalone, draft, selfcontained}
	---
	
	## Three metaphors of theory
	>Immanuel Kant: All our knowledge begins with the senses, proceeds then to the understanding, and ends with reason. There is nothing higher than reason.
	
	![](http://farm8.staticflickr.com/7379/9532736494_99b95287a2_z.jpg)
	
	--- .class #id 
	
	## Sandglass of generalization
	
	![](http://farm8.staticflickr.com/7366/9529954881_53a00fe15b_z.jpg)
	
	---
	## Five levels of Research
	
	![](http://farm3.staticflickr.com/2819/9529954801_e6d59c8eba_z.jpg)
	
	---
	## Computational Thinking
	
	![](http://farm4.staticflickr.com/3669/9529954763_06a6c95970_z.jpg)
	
	---
	## The Way to Computational Communication
	
	![](http://farm6.staticflickr.com/5540/9529954731_4cbf032b06_z.jpg)
	
	---
	
	## Network Science
	
	![](http://farm8.staticflickr.com/7353/9529954585_94686e3aa4_z.jpg)
	
	--- .class1 #id1 bg:yellow
	
	
	## What should we do?
	
	
	- Network science
	- Statistical linguistics
	- Human dynamics
	- Big data& digital traces
	- Digital media
	- Data journalism
	- Computational advertising
	
	![](http://gifs.gifbin.com/1236681924_snail_transformers.gif)
	
	---
	
	## Thank you for your attention!
	
	## wangchj04@gmail.com
	
	![](http://farm3.staticflickr.com/2840/9508319890_2cbaa2c4d4_n.jpg)
{:lang="ruby"}


# How to host your slidify HTML5 presentations on github

I failed in publish it directly to github following the the way introduced by slidify website. I am not sure why it does not work. However, I figured out my solutions.

![](http://farm6.staticflickr.com/5460/9533395543_6747795221_o.png )

You can still do it very easily. But, first, you should know the structure of github repository. Assume you have a github repo named "slidify". We can work at different branches: "master" or "gh-pages". You can generate your gh-pages branch following the figure on the right. gh-pages is a very special branch of github repository. The branch of gh-pages are acturally a website host by Github.The files in slidify/test/index.html on the branch of gh-pages could be displayed by your default github website. e.g., chengjun.github.io/slidify/test. So the first move is to make a gh-pages, and upload your slidify stuff to this branch.

You can generate new sub-branch too. e.g., slidify/computational-communication. See two examples:

[http://chengjun.github.io/slides/slidify/](http://chengjun.github.io/slides/slidify/)

[http://chengjun.github.io/slides/slidify/computational-communication](http://chengjun.github.io/slides/slidify/computational-communication)

If your markdown file is 'selfcontained'{:lang="ruby"} , it will not turn to https://code.google.com/p/slidifylibraries/ for the font and theme information (but it still needs to refer to the other websites where your insert your pictures into your slides). So theoretically, self-contained file is a little little little bit faster than 'standalone'{:lang="ruby"} files. However, you can almost not detect it if the internet access is good. Check this standalone HTML in the following link and compare it with the two selfcontained ones on the above:

[http://chengjun.github.io/slides/computational-communication](http://chengjun.github.io/slides/computational-communication)

In you sub-directory, you have to have everything the selfcontained html needs, it is not clever enough to scan the upper-directory. Anyway, enjoy your HTML5 slides host on github!

# Afterwords

I have also tried to use pandoc and reveal.js to make slides.

Using reveal.js, I have reproduced the slides of computational communication on slid.es.

<iframe src="http://slid.es/cheng-junwang/cc/embed" width="576" height="420" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

However, using pandoc and markdown, it seems to be quite limited to set the slides, here is the result:[chengjun.github.io/slides/reveal.js/cc](chengjun.github.io/slides/reveal.js/cc)

The method is briefly introduced here: [chengjun.github.io/slides/reveal.js/pandoc-revealjs-slides](chengjun.github.io/slides/reveal.js/pandoc-revealjs-slides)




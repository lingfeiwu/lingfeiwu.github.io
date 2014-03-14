My blog 
==
This template is copied from [Frank's github](http://chenjun.github.io). I appreciate his help in setting up my own version of github blog. The following notes are also copied from him.


##  Set up the Headers
However, to use it, you have to set the headers of markdown formally. When you write the md file, you have to define the headers. When you mark the categories and tags, do forget to put a blank space between  "-" and your categories or tags. For example: https://raw.github.com/chengjun/cn/gh-pages/_posts/2013-09-07-part-of-speech-analysis-with-opennlp.markdown

        ---
        layout: post
        title: "Simulating network diffusion with R"
        date: 2014-03-09 10:41
        comments: true
        categories: 
        - network
        tags:
        - information diffusion
        - R
        ---        

## Using MathJax on Github:Pages 

http://christopherpoole.github.io/using-mathjax-on-github-pages/

1. modify your _config.yml by setting markdown: kramdown
2. add the following script to default.html in the layout folder


	    <!--mathjax start-->
	    <script type="text/javascript"
	    src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
	    </script>
	    <!--mathjax end-->

## highlight.js 

There are many styles of highlighting to choose, click [here](http://chengjun.github.io/highlight.js/src/test.html) to decide. 

1. download highlight.pack.js together with styles,languages from [here](http://highlightjs.org/download/), and upload to your folder of js. 
2. modify the layout by adding the following code to default.html

	    <!--highlight.js Start-->
	    <link rel="stylesheet" title="Default" href="/media/js/styles/tomorrow-night-blue.css">
	    <script type="text/javascript" src="/media/js/highlight.pack.js"></script>
	    <script>
	    hljs.configure({tabReplace: '    '});
	    hljs.initHighlightingOnLoad();
	    </script>
	    <!--highlight.js End-->

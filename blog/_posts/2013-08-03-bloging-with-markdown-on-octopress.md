---
layout: post
title: "Blogging with markdown on Octopress"
date: 2013-08-03 23:23
comments: true
categories: octopress
---

### Set up Octopress

I refer to this [blog](http://www.yanjiuyanjiu.com/blog/20130401/) and this [blog](http://zerodie.github.io/blog/2012/01/19/octopress-github-pages/) to setup octopress. It's very helpful for windows users.

### For encoding errors

Most chinese windows users encounter the problem of encoding error, such as [this one](http://www.v2ex.com/t/26027): invalid byte sequence in GBK. I handle it following three suggestions:

1.Modify the file located at C:\Ruby193\lib\ruby\gems\1.9.1\gems\jekyll-0.11.2\lib\jekyll\convertible.rb, to change:

    self.content = File.read(File.join(base, name))


into:

    self.content = File.read(File.join(base, name), :encoding => "utf-8")


 
2.Make sure the markdown file is encoded with utf-8 without BOM

3.Set the language in the git bash:
    
	set LANG=zh_CN.UTF-8
    
	set LC_ALL=zh_CN.UTF-8



### Writing markdown post with MarkdownPad

Using MarkdownPad, you can instantly see what your Markdown documents look like in HTML. While you type, LivePreview will automatically scroll to the current location you’re editing.

### Understanding the git flow of Octopress blogs

![](http://systeminterrupt.me/images/2013-06-16/Octopress_Deployment_Chain.png)

First, we operate at the local, and then we push the changes to the server of github.

For the local files, there are two parts: sources & public. We first write post to the directory of "_posts"; Second, we copy the file to the public file (rake generate), and at the moment, you can preview the local files (rake preview); Third, you can publish/push the local files to the server (rake deploy).

On the server, there are two parts: master & source. In the source part of the server, we can archive the local files. 

If you undertand the logic above well, you know clearly how to modify one post.  

### Modifying a post

After you have publish a post, you may need to modify the content: First, to find the post in the directory of "octopress/source/_posts"; Second, to modify it with MarkdownPad; Third, to publish the modified post:

    rake generate
    rake preview
    rake deploy

Click here to preview [http://localhost:4000](http://localhost:4000]) 

Copy the changes to the source for memory.

	git add .
	git commit -m 'your message'
	git push origin source

### Clone Your Octopress to Blog From Two Places
Refer to this post: [http://blog.zerosharp.com/clone-your-octopress-to-blog-from-two-places/](http://blog.zerosharp.com/clone-your-octopress-to-blog-from-two-places/)

### Add mathjax to write eqations

Refer to this post: [http://www.yanjiuyanjiu.com/blog/20130402/](http://www.yanjiuyanjiu.com/blog/20130402/)

$$
logit(Y_{ij} = 1) = ln(\frac{p_{ij}}{1-p_{ij}}) = {\theta }^{T} \mathbf{\delta} [g(\mathbf{y}, \mathbf{X})]_{ij}
$$


以上公式当中，定义$$Y_{ij}$$为节点i和j之间形成链接的一个随机变量。当$$y_{ij}$$取值由0变为1的时候，所带来的$$g(\mathbf{y},\mathbf{X})$$的变化表示为$$\mathbf{\delta} [g(\mathbf{y}, \mathbf{X})]_{ij}$$。

Using kramdown, you can also present the tables on octopress.[^1]. Other text.[^footnote]. One example:

	|-----------------+------------+-----------------+----------------|
	| Default aligned |Left aligned| Center aligned  | Right aligned  |
	|-----------------|:-----------|:---------------:|---------------:|
	| First body part |Second cell | Third cell      | fourth cell    |
	| Second line     |foo         | **strong**      | baz            |
	| Third line      |quux        | baz             | bar            |
	|-----------------+------------+-----------------+----------------|

Check the result here:

|-----------------+------------+-----------------+----------------|
| Default aligned |Left aligned| Center aligned  | Right aligned  |
|-----------------|:-----------|:---------------:|---------------:|
| First body part |Second cell | Third cell      | fourth cell    |
| Second line     |foo         | **strong**      | baz            |
| Third line      |quux        | baz             | bar            |
|-----------------+------------+-----------------+----------------|

### Gist Embedding

Refer to this post: [http://octopress.org/docs/blogging/code/](http://octopress.org/docs/blogging/code/)


### Insert photos and modify the size 

Refer to this link: [http://octopress.org/docs/plugins/image-tag/](http://octopress.org/docs/plugins/image-tag/)

![]( https://lh4.googleusercontent.com/-Hipwe3gjPn8/UUZW6a_Y1_I/AAAAAAAAAys/9QbECNQCUAA/s1267-fcrop64=1,015a0000fb7bd34c/optimus%2Bprime.jpg)  

> I am Optimus Prime, and I send this message to any surviving Autobots taking refuge among the stars: we are here, we are waiting.

###  Use the Twilight Color Scheme

    def hello
      puts "Hello!"
    end
{:lang="ruby"}

Just add {:lang ="ruby"} below your code block, and bear in mind that there is no indent for this line:

	    def hello
	      puts "Hello!"
	    end
	{:lang="ruby"}
{:lang="ruby"}


for thie inline script `def hello`{:lang="ruby"}, you can write in this way:

	for the inline script 'def hello'{:lang="ruby"}, you can write in this way:
{:lang="ruby"}

Refer to this link to use the twilight color scheme:[http://blog.alestanis.com/2013/02/04/octopress-and-the-twilight-color-scheme/](http://blog.alestanis.com/2013/02/04/octopress-and-the-twilight-color-scheme/)

However, this link is simpler: http://cabeca.github.io/blog/2013/06/09/putting-some-twilight-on-octopress/


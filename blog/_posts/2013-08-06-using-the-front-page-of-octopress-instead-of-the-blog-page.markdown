---
layout: post
title: "Using the front-page of Octopress instead of the blog page"
date: 2013-08-06 15:25
categories: octopress
tags:
- Landing page
- Navigation
---

## Using a Landing Page rather than the Blog Page

It's annoying to find that users are directed to your blog page directly. In my point of view, octopress is not just a personal blog. It is your website, your home online, where you can present yourself easily, rather than limiting yourself to the blog posts.

![](http://farm8.staticflickr.com/7387/9450821960_84d5be16c9.jpg)

I have made a "Home" page before. However, the home page is not directed as the landing page. 

To have a look at the navigation method used in my navigation.html:

    <ul class="main-navigation">
      <li><a href="{{ root_url }}/home">Home</a></li>
      <li><a href="{{ root_url }}/cv">CV</a></li>
      <li><a href="{{ root_url }}/">Blog</a></li>
      <li><a href="{{ root_url }}/blog/archives">Archives</a></li>
    </ul>
    
You will find that the root_url is directed to the blog page！ How to change it? Bear in mind that octopress orgainze the pages by index page. There is a index page for any pages, e.g, an index page for the blog page, an index page for the archives page, an index page for the home page. Thus, we can think in another way, why not make a index page for the root_url? This can solve the problem. 


First, Of course, we should move the index page to the blog directory first.By default Octopress generates your blog’s post index at your site’s root directory. If you’d rather publish your blog index somewhere else like blog/index.html do this in your terminal.


	mv source/index.html source/blog/index.html

Second,we can make an index page for the root_url of the source.

	rake new_page[index.html]


Third, you’ll want to update your Rakefile to be sure your new blog index is preserved when you update Octopress. This tells the octopress that your index page for the blog is moved to the directory of "source/blog".


	blog_index_dir = 'source/blog'

Fourth, remember to update the main navigation for your site(octopress/source/_includes/custom/navigation.html), since currently the blog link points to /. Skip down to the section on changing navigation, add a ‘home’ link and update the ‘blog’ link to point to /blog/.

    <ul class="main-navigation">
      <li><a href="{{ root_url }}/home">Home</a></li>
      <li><a href="{{ root_url }}/cv">CV</a></li>
      <li><a href="{{ root_url }}/blog">Blog</a></li>
      <li><a href="{{ root_url }}/blog/archives">Archives</a></li>
    </ul>

Finally, source/index.html can become the landing page of your "wildest dreams". My dream is fairly small: to let the index page of the source be directed to the index page of the Home page (I have make a home page before). The bad news is I have no prior knowledge of html language, if you know how to do it, tell me please. The good news is I can copy and paste the index page of the Home directly ("octopress/public/home/index.html").


#### References
Landing Page vs. Blog Index. http://octopress.org/docs/theme/template/



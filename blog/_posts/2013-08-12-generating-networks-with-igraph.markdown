---
layout: post
title: "Generating networks with igraph"
date: 2013-08-12 16:23
comments: true
categories: network
---

We know that the most simple network is the regular network, such as the ring network. If all the edges in a network are generated randomly, we can get a random graph or Erdos-Renyi network (ER network). 

## Erdős–Rényi Random Graph model


> The Erdős–Rényi model, named for Paul Erdős and Alfréd Rényi, is used for generating random graphs in which edges are set between nodes with equal probabilities.

There is a continuous shift between randomness and regularity. What are the networks between random network and regular networks?

## Watts-Strogatz Small World model


> The Watts and Strogatz model is a random graph generation model that produces graphs with small-world properties.
> An initial lattice structure is used to generate a Watts-Strogatz model. Each node in the network is initially linked to its k closest neighbors. Another parameter is specified as the rewiring probability. Each edge has a probability p that it will be rewired to the graph as a random edge. 


## Barabási–Albert (BA) Preferential Attachment model

> The Barabási–Albert model is a random network model used to demonstrate a preferential attachment or a "rich-get-richer" effect. In this model, an edge is most likely to attach to nodes with higher degrees. The network begins with an initial network of m nodes. m ≥ 2 and the degree of each node in the initial network should be at least 1, otherwise it will always remain disconnected from the rest of the network.
> 
> In the BA model, new nodes are added to the network one at a time. Each new node is connected to m existing nodes with a probability that is proportional to the number of links that the existing nodes already have. 
> 

We can use igraph to play the network games, and explore the properties of generated networks.

> igraph is an open source C library for the analysis of large-scale complex networks, with interfaces to R, Python and Ruby.

Here is the R script for generating and visualizing networks. 

	library(igraph)
	g1 <- graph.ring(500)
	g2 <- erdos.renyi.game(500, 0.0035)
	g3 <- rewire.edges( g1, prob = 0.5 )
	g4 <- barabasi.game(500)	
	# 保存图片格式
	png("d:/network_game.png", 
		width=5, height=5, 
		units="in", res=700)
	# 绘制图片
	par(mfrow=c(2,2))
	plot(g1, vertex.label= NA, edge.arrow.size=0.02,vertex.size = 0.5, xlab = "Ring Network")
	plot(g2, vertex.label= NA, edge.arrow.size=0.02,vertex.size = 0.5, xlab = "Random Network")
	plot(g3, vertex.label= NA, edge.arrow.size=0.02,vertex.size = 0.5, xlab = "Small World Network")
	plot(g4, vertex.label= NA, edge.arrow.size=0.02,vertex.size = 0.5, xlab = "Scale-free Network")
	# 结束保存图片
	dev.off()
	
![](http://farm3.staticflickr.com/2875/9490993155_0787ab3832_c.jpg)

Of courese, there are other network games in the library of igraph, such as the game of forest fire.
	
	g5 <- forest.fire.game(200, fw.prob=0.37, bw.factor=0.32/0.37)
	plot(g5, vertex.label= NA, edge.arrow.size=0.02,vertex.size = 0.5)
	
	
**References**

http://en.wikipedia.org/wiki/Network_science#Network_models

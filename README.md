# Microservices Blog

This is a simple blog application that shows the benefits of microservicing out infrastructure. There is very minimal styling, just enough to get it looking ok. It uses Docker and Kuberetes to create images and deploy pods. In order to get it up and running you will need to install Docker and modify your host file. If you don't know how to use Kubernetes or Docker, or you can't modify your host file (you really shouldn't modify this) then please just have a look through the js files as thats what you are really here for.

# Getting the code to run

Open up terminal and change directory to each of the following folders inside of blog:

1. client
2. comments
3. event-bus
4. moderation
5. posts
6. query

Inside of each of those folders (inside the terminal) run:

```
npm install

```

This will install the neccessary packages needed to run the applications. Make sure to do this for the folders listed above, each one is it's own application

You will also need to install Docker Desktop and enable Kuberneates inside of system preferences for Docker Desktop. Once that is done you can move on to creating the docker images for each folder

## Docker Images

Inside of each folders mentioned above (client, comments, etc) you will find a document called Dockerfile . These are used to create images for Kubernetes to create pods/deployments from.

Inside of terminal in the folders mentioned above you will type out the following to create docker images:

```
Client folder in terminal:
------------------------

1. docker build -t yourdockeraccountname/client .
2. docker push yourdockeraccountname/client
```

Do this for all of the dockerfiles in each folder mentioned above

## Kuberneates Deployments

After creating the images you can create kubernete deployments to get everything up and running. Inside of the blog/infrastructure/k8 folder in terminal type the following:

```
1. kubectl apply -f client-depl.yaml
2. kubectl rollout restart deployment client-depl.yaml
```

Make sure to do this for all the deployment files: client-depl.yaml, comments-depl.yaml, ...etc.

## Hosts file

Modify your hosts file to point 127.0.0.1 to point to posts.com. Once your deployments are up and running you can just type in posts.com to get to the sight. If you change this, make sure you remove it later. You should only mess with the hosts file if you know what you are doing

## Hard part is over

Ok, the hard part is over. Now all you have to do is open up several terminal windows. You will need a window for every folder that was mentioned in the beginning. What you are going to do is change directory to those folders and run 'npm start'. After that just leave the window open and move to the next folder in another terminal window.

Finally inside of your web browser go to posts.com, you should be able to use the website. If something isn't working as planned make sure you have run 'npm start' inside of each of the folders and left them open.

## Finally

If none of this worked, please look through the JS files to check out my code. Microservices is a fickle mistress. I'll be adding onto this as I go. Thank you for taking the time to look through it.

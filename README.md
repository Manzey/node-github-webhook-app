# dl222is-examination-3

## What is the address to your application?  
https://159.65.81.22/ or http://159.65.81.22  
Redirecting is on so it will end up using https anyways.

## Describe what you have done to make your application secure, both in code and when configuring your application server
As we're working with webhooks we listen to incoming POST-requests and that means that literally anyone can send requests to my server and that wouldn't be good.
So in order to prevent that I have used a middleware-module to confirm that the POST comes from Github and no other place. If POST is from other place than github it will not process the POST and will send back an error message instead.  
And since the application only takes input from Github and no user input there is no need to protect myself from XSS or CSRF-attacks. Since I am not using a login-system or similar. The only possible weakness I could think of would be malicious titles or usernames coming from Github, but using the secure version of handlebars it does not render HTML from input unless I specify it to do, and I have not.  
  
As for the application server, I am using NGINX to route all incoming requests to my application. So the people visiting my website does not send its requests directly to my application. And I also have the firewall up and running and it is configured to only accept requests on port 22, 80 and 443. And my application is running locally on port 8080, so it is out of harms way.  
The application server also only runs HTTPS and does not allow any HTTP requests. Everything that gets sent to port 80 is redirected to port 443.
  
## Describe the following parts, how you are using them and what their purpose is
### Reversed proxy
A reversed proxy is a tool to create more abstraction between the client and your server. All incoming requests goes through the reversed proxy and then the proxy routes the requests to wherever they need to go. This allows for making sure requests arrive as they should and where you want them to go. It creates a secure way for people to utilize your application as it is often used to encrypt traffic aswell which saves your web server the trouble of doing that, which means it will get an increase in performance.  
A reversed proxy can also work as a load balancing tool if you require such measures. It can distribute incoming requests over a series of servers to maximize the speed of the applications to avoid them getting overloaded. This also creates redundancy, since if one server goes down, your traffic will just be sent elsewhere. 
I use a reverse proxy as described above, minus the load balancer. I route all incoming requests to port 443 towards my application. And if any requests come in through port 80, they are redirected to port 443 instead, to keep all traffic secure.   

### Process manager
A process manager is a program that helps you with managing your applications. It helps you with various tasks such as start, stop, restart. It can also display information about the application. Information such as how much CPU the application is using, or when and how many restarts have occured. Process managers usually have a function to keep the application running aswell, which means that it will automatically restart the application if it crashes. This would mean that the application would not have to be manually restarted everytime it crashes, so it increases uptime.  
I myself am using PM2 in the most basic way, simply to keep my application running.

### TLS certificates
TLS certificates are used for HTTPS, which encrypts the connection between the client and the server.  There are difference types of certificates, there are trusted and then there's non-trusted. Trusted means that they are signed by a CA(Certificate Authority). And then there are non-trusted, self signed certificates. These are not prefered and generally should not be used in production. I myself are using a self-sigend certificate, simply because I do not have a domain name so I can't verify my certificate. Although some organizations can possibly do that.

### Environment variables
It is an object that stores variables that can be referenced in your application. This is used to avoid having secrets hardcoded in your application for others to see. Instead you put them in a environment file which is read by your application. You can also specifiy environmental variables as an argument when running. But it is better for long time use to store them in a file.  
I use these variables to store my Github token & secret, as well as telling the application to be running in production mode.

## What differs in your application when running it in development from running it in production?
In my application there are not much functionality difference between the two. The only real difference is that I use PM2 for process managing rather than nodemon.  

## Which extra modules did you use in the assignment? Motivate the use of them and how you have make sure that they are secure enough for production  
As for extra modules, I assume we're talking about other modules than specified in the exam3-info, I am using Octonode which is a way for my application to access the Github API aswell as sending along tokens for verification.  
It is well documented and it is frequently updated and contributed to. Plus it was recommended by the course-leaders.

I am also using dotenv for reading environmental files. This is a rather large module that have around 100-200 thousand downloads daily. It is well documented and feedback overall is great and no open issues that is concerning or no complaints.  

And for verifying Github posts I use "github-express-webhook-verifying", which checks all POSTs and if they're not from github, they are rejected.  
This is a very small module, meaning that it does not have many users. So I had to go into the source code and review to made sure nothing shady was going on. I read the source code and understood what it was doing and that it wasn't hijacking data or whatever.  

And I also use two modules for dateformating - one is moment, which I use to format dates in the client-script for notifications etc. And then I am using a module for handlebars, which adds functionality to format the date in the template-file.  
Moment is a very larger module that is heavily used with over 17 million downloads this month, it is worked on alot with alot of traffic. And the handlebars module simply allows for Moment usage in the template file.  
  
I have also run the nps module to check for vulnerabilities and it the known vulnerabilities did not concern me as much as I do not deal with alot of user input. The user input I take is made into a string and not rendered as HTML.

## Have you implemented any extra features (see below)? If so, describe them. 
N/A

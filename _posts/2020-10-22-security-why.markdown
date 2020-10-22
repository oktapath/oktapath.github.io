---
layout: post
title:  "Security, why we need it, from a mile high view"
date:   2020-10-01 14:00:00 +0000
categories: .net api code
author: hughM
tags: Security coding bestpractice
---

{% assign author = site.data.people[page.author] %}
<a rel="author"
  href="https://github.com/{{ author.twitter }}"
  title="{{ author.name }}">
   <span class="fa fa-github">
    {{ author.name }}
    </span>
</a>

I am hoping to give a brief overview of security in the cloud and why we need it. We will outline when we should plan for it, how we design it and how it should work for us. So, how do I explain some of the abstract concepts in simple English, that's not too techie and that will be easy to understand. I started by trying to write this document in layman terms but soon fell foul of explaining technical aspects that were not easy to explain. After several attempts I decided to describe it in terms of automobile safety. I hopefully do a good job, but I would love feedback.

**Automobiles**

 So starting off, when you look at an automobile can you tell what safety systems it has and what safety options there are in the vehicle? The simple answer is no! 
> Why is that?
Simply put, the decisions on safety were taken while they were designing the car. No manufacturer tries to bolt safety systems onto a finished car. Imagine airbags glued to the dashboard, or sensors poking out in all direction from the exterior and engine. It just wouldn't work, they would be too prone to failing or just not functioning, or worse, falling off unnoticed, until you really need them, and find out they are not there.
> Would you drive your kids around in a car where the seatbelts were an afterthought?
So the first principle of security is you need to plan and design it up front. You don't have to get it perfect! Remember, car manufactures crash test their cars all the time to make sure their safety systems are working, and they look at the feedback and make changes, then test again, until they are happy.

__Equipment__ Safety equipment in a car is fundamental. You just expect it. Would you buy a cheap car that had no safety equipment! I know I wouldn't. Our software should be the same, why allow you teams to build applications that have no safety or security built into them. There is noting wrong with asking your technology department to prove that the software they produce and the infrastructure they run on are secured. And here is the kicker, demand proof. If you are presented with a threat assessment on a piece of paper or in a document or even a completed pen test, you should be nervous. That's like asking for a safety rating such as NCAP or NHTSA, by only allowing the tester to walk around the vehicle and check the door handles and tap on the windows. In order to get a high rating you have to crash the car, only then can you prove that your theory in the design phase actually works. You don't want to find that out during a hack or an attempted breach.

__Sensors__ When driving my car, I know that it is aware of my surroundings and how I am driving. It might sense the road surface, and even understand the temperature and climate around the car. All this data allows the car to make decisions. So what happens if you don't have sensors. Are you still safe? Well depending on how you drive and where you drive, some of these sensors are more important than others. If I live in an area of extreme weather, I would like ABS and traction control, but these are only useful if I detect that I need them. Am I more likely to crash with or without them, that's subjective, but they certainly help, and sometimes they can react quicker. So your technical department should have these sensors in their code and their infrastructure. One sensor blinking on its own may not mean much but several might point to an issue and will allow you to take action. Consider a feature such as lane assist in your car, when you hear the beeping sound your attention is drawn back to the road and you can make a correct if needed. Software sensors should operate the same way. And remember we don't want them bolted on afterwards, they should be designed in up front.

__The brains__ Every car nowadays has a processor that analyses the data it gets from the sensors around the vehicle and takes an action. On a snowy day, your car will detect that the driving surface is slippery and apply "all wheel drive" or "traction control". If you slam your foot on the brake hard, the car will apply ABS. We take this almost for granted. So why do we not take the same approach to our software? If I notice that one of my sensors is telling me something is wrong, I should take action, by blocking traffic, or alerting support teams. Having sensors and safety equipment is only useful if I monitor them and have actions plans to deal with them, when and if, they go off. The best plans of course are automated, "if I see this then do that automatically" like ABS. An example, I might detect large volumes of data moving out of my network, coming from my database! Action, block traffic immediately. If its a false alarm, then i tweat my alert, if not, I may have saved my company.

__Assembly Line__  How do you know your software engineers understand security and are applying proper techniques? You don't! So train them, take it seriously, and give them a framework where you can prove that the software they are producing is secure.
This is the SDLC lifecycle and how security is important in it.
In our car analogy, image you are a car designer for a big automobile company, and you want to use a new airbag in your automobile. Firstly you would look for proof that the airbag actually works. They would check that it fits in the dash board or steeling wheel. Then you would install one and test it again. Then you would create crash tests to see how it behaves in a real world scenario. When you are happy , you would amend your production line, and train your staff on how to install the new air bag. You would then validate that everything it rolling off the assemble line correctly, but apply rigours QA to he new component. Your assembly line are instructed in how to install the new airbag, they cannot deviate, because the line doesn't allow it! There are checks and balances.
> Imagine this scenario!
You have hired a new junior engineer. He write 3 lines of code on a Friday and commits them. You build release process, sends that new code to production, and without realising it, you have created an exploitable weakness.
> The Fix!
Your junior developer checks in some code, just 3 lines. After it has been built, we run some tests on it, they all pass in this case. Then we deploy it to a staging location, and we test it more, all those tests pass. Then we deploy it to a testing environment, and we run a scan on the working code looking for vulnerabilities, we detect the mistake the developer made and we stop the deployment (halt the assembly line) then we notify the dev team of the issue, and we stop them from deploying again until the issue is fixed. When fixed we restart the whole process from the beginning. If on this pass, there is now no issue, we will deploy it all the way to production. While all this is happening, we have run a scan on the source code inside its repository. Here we also detect the mistake the developer made, and we notify the testing team to ensure that this issue is more actively scanned for and blocked earlier in the process. As such our process is always getting better and more robust as we detect/fix and then remember the mistakes of the past.

Do your software engineers take the same precautions when introducing a new service or software package? They probably don't, or don't even know that they should follow a process, so make one that they cant circumvent. In a proper delivery lifecycle,  you can spot these problems before they every get to the assembly line.

__Crash testing__ To drive a vehicle today in most countries you have to have insurance, and a driving license. These usually prove that the vehicle is in good working order (through an NCT test or similar) and that I have shown competency in driving. We usually don't have an equivalent approach in our technology departments. We don't know how well our teams understand security. We have to take their word for it. The testing departments of some countries don't believe the car companies when they tell them their car is "5 star" rated. They say, "prove it"! And so they crash a car into a wall and the measure the impact and the consequences of the collision. This allows them to determine how the crash could affect their passenger safety. In the software world, you can achieve the same things though blue/green testing.

__Culture__ In the late 70's and early 80's one car company surpassed the safety ratings of their customer countries at that time. They did it by creating a culture of safety and building their brand around it. They were so good that they forced countries to raise their bar in terms of safety, and they lifted all the other car companies around them, as they all strive to complete and keep up. Volvo, may be somewhat extreme in this example, but you can create a culture like this in your own organizations. Your teams will then manage themselves and by osmosis the culture spreads to all employees. So when the new junior developer sits at his desk on his first day, he knows to take security seriously and that he he is one of the pieces that holds the whole security picture together. He doesn't want to be the weak link, and so when or if he is not sure, instead of committing his  lines of code he may ask a peer, "does this look OK to you"!

## Conclusion

A security mindset should be a living breathing culture in your business. Where decisions are though of on the drawing board and tested before they ever see the light of day. This will lead to delays and slow turn around I hear you quietly asking! Yes it may, but hat ware the benefit to behaving like this. That's something we will cover in our next blog post in the series.

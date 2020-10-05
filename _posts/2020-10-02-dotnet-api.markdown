---
layout: post
title:  ".Net|API Project Setup"
date:   2020-08-31 14:00:00 +0000
categories: .net api code
author: hughM
tags: tooling coding
---

{% assign author = site.data.people[page.author] %}
<a rel="author"
  href="https://github.com/{{ author.twitter }}"
  title="{{ author.name }}">
   <span class="fa fa-github">
    {{ author.name }}
    </span>
</a>

As a CEO I am not expected to normally write code, however last week I had to build a POC (Proof of concept) API for .NET Core 3.1, and I wasnt sure where to start or what way to go about this, and what the norms in the industry were at the time.

__Why is a good structure important?__ So starting off, what type of directory structuctre should I have? Where do I put the code and where do the project and solution files go?

> Luckily a call to our inhouse guru [David Rodrigues](https://github.com/djfr) and I had some of the answers I needed.

The below is some of the practical things we dicussed and reviewed, and why. I hope I do them justice and why they are actually important.

***

## Tips for a new Web API project

### Clone your repository first

This seems like common sense, but I think its easier to start with a source controlled directory at the very beginning. Dont create a project and then add it to your repository! Why? Well you will make decisions about the project initially that should be captured in source control and recorded. Cloning up front allows this. Just commit frequently and often, with good and concise commit messages. Commiting with a message of "work done" tells us nothing. However, commiting with the message "Folder structure defined" means much more and can help someone reviewing, to understand, how you came to your final solution and why.

***

### Git Ignore

OK, this is super important to do early on, before you create projects and start running builds.  There are numerous examples of igniore files on the web that will help you get started. Even if you are not sure, start with simple ones like; ignore the bin directory, or the `.vs` directory etc. This will save you loads of time later on when you start pushing and creating PRs.

Sample Ignores

User-specific files

- `*.suo`
- `*.user`
- `*.sln.docstates`

Build results

- `[Dd]ebug/`
- `[Rr]elease/`
- `x64/`
- `[Bb]in/`
- `[Oo]bj/`

[Git Ignore samples on GitHub](https://gist.github.com/kmorcinek/2710267)

***

### Folder structure

So I acknowledge that this is a favour, there is no right or wrong answer, but imagine someone looking at your repo with no idea of what the project is. Having twenty folders on the root all with different names and meaning can be hard to decipher. I would suggest a structure like this to start with, then change as you need:

***

### Naming rules

So what's in a name. Apparently quite a bit actually. Getting your naming right is important and can help your project in the long run. The standard I was following was the c# naming convention, which is Camel case, with "." seperators.

***

### C# Code

So the way you code and your syantx structre is a persional choice, but there are already definitions out there if you are not sure how you should go about it. A

- __[C# Coding Conventions](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/inside-a-program/coding-conventions)__ - useful guidines for coding preactices and a good place to start if you have no idea how what your style is.

***

### Project Setup

#### Adding references

So instead of using package manager in Visual Studio or some other third party tool, why not add them direclty. Just open your .csproj file in a text editor and put your referneces in direclty. Saves time and works a treat.

```xml
<ItemGroup>
    <PackageReference Include="Microsoft.Azure.KeyVault" Version="*" />
    <PackageReference Include="Microsoft.Azure.Services.AppAuthentication" Version="*" />
    <PackageReference Include="Microsoft.Extensions.Configuration.AzureKeyVault" Version="*" />
    ...
    ...
</ItemGroup>
```

Thats all you have to do, find the name of the package you need and just add it.

***

#### Package Versions

So, bumping packages can be time consuming and sometimes tricky to do, so here is a great tip, turn:

```xml
<ItemGroup>
    <PackageReference Include="Microsoft.Azure.KeyVault" Version="3.0.5" />
</ItemGroup>
```

Into a reference that always points to the latest version definied for that package.

```xml
<ItemGroup>
    <PackageReference Include="Microsoft.Azure.KeyVault" Version="*" />
</ItemGroup>
```

This means the package will be the latest version, evertime you build. *But* I hear you cry, what if we want to stick to a specific major version? Well just add in the following, not you will stick to the major version nnumber 3, but you will consume all minor versions.

```xml
<ItemGroup>
    <PackageReference Include="Microsoft.Azure.KeyVault" Version="3.*" />
</ItemGroup>
```

So how does this help me really, I hear you ask! Well, why not run a scheduled build once a week for projects that are not being worked on. You will have a build that will pull in the latest versions, that have reduced security surface and are more complaint. If the latest version doesn't work or breaks your build, you will know about and can take action.

***

## Code tips

### String Formatting

The latest version of C# has some great new features. One that we will all use is string formatting. In the previos versions we did

```csharp
var param1 = "parameter";
String.Format("Some sample text with a {0} string replacement",param1);
```

with the new string literal `$` this becomes much neater. Look at the following code blocks.

```csharp
var param1 = "parameter";
$"Some sample text with a {param1} string replacement";
```

Which is more readable do you think!

***

### Cancellation Token

Anyone that uses `async` in their code will benefit from this tip. For all methods that may be long running (more than a hundred milliseconds), or that use resources such as database stores or a network resources, should have a cancellation token. Why? Simple if the thread gets cancelled or the socket is closed, the method chain will be notified and can so avoid doing any additional work that is not needed. For example. You have a method that writes data to three different databases, but during the operation after writing to the first datatbase, the socket gets closed. In normal circumstances the action will try and finish by completing the last two database operations. But if the action has been cancelled, we shouldn't, we should stop, or possibly even have compensating logic to reverse any work we have already done. This will leave your app in a more consistent state and will reduce the workoad. For an app that takes 100 requests a second, this may not make too much difference, but an app servicing 100,000 requests per second is a different story.

```csharp
static async Task<int> SomeAsyncMethodInYourAPI(string url, HttpClient client, CancellationToken token)
{
    // pass the cancellation token to .GetAsync
    HttpResponseMessage response = await client.GetAsync(url, token);
    byte[] content = await response.Content.ReadAsByteArrayAsync();
    ...

    return content.Length;
}
```

***

### Comments

A great habit to get into to early on, is to decorate your methods with comments at the very beginning. Even if you dont know what the API may look like, you do know what its trying to do. So comment it. This will make you APIs more consumable and your Swagger specs more readable and informative.

```csharp
static async Task<int> SomeAsyncMethodInYourAPI(string url, HttpClient client, CancellationToken token)
{
    HttpResponseMessage response = await client.GetAsync(url, token);
    byte[] content = await response.Content.ReadAsByteArrayAsync();
    ...

    return content.Length;
}
```

### Response Codes

Understanding response codes is vital. Don be the guy who responss with a 200 OK and an error response in the payload.  #

- __[HTTP Response Codes](https://httpstatuses.com/)__ - knowingo what codes are reflective of you call. A good tbale to get information is found here.

### Telemetry

No matter what type of application you are building, you need telemnetry. Telemrey is your code telling you what it is doing and what issues if any it encountered. Try and avoid physical log files, and look to stream your telemetry into the cloud somewhere. A great place to start is Application Insights or Splunk or any alternative. Wiring this up initially saves a huge amount of hassle later on, and can help to investiage your application while you build it. Try to wire this up in your middleware so its available all throughout your applciation.

Add a reference to your project, dont forget the * for the version

```xml
<ItemGroup>
    <PackageReference Include="Microsoft.ApplicationInsights.AspNetCore" Version="*" />
</ItemGroup>
```

Then wire it up in your services.

```csharp
    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        // The following line enables Application Insights telemetry collection.
        services.AddApplicationInsightsTelemetry();

        // This code adds other services for your application.
        services.AddMvc();
    }
```

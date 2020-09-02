---
layout: post
title:  ".Net|Azure Tooling"
date:   2020-08-31 14:00:00 +0000
categories: .net tooling dotnet
---

__Why is tooling important?__ This is one of the most common questions we get asked. Our answer is this:

> good tooling and the right setup influence behaviour for the better.

Tooling helps to create a pattern of engagement and a mindset that can be very beneficial to a developer.

Consider a carpenter working with tools from a mechanic. His experience will be poor, and his quality of work will suffer greatly. This is a scenario that replays itself in alsmost every technology business.

We will cover a range of tools for working with .Net alongside with Azure and Azure DevOps.

## The Integrated Development Environment (IDE)

### Visual Studio

The main IDE we normally use is Visual Studio. There are 3 main distributions: [Community](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=Community&rel=16), [Professional](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=Professional&rel=16) and [Enterprise](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=Enterprise&rel=16). Community is a stripped down version, but Professional and Enterprise are close enough, the big difference being enterprise as the profilers, including Intellitrace, which can be very handy in certain debug scenarios.

Optionally you can use the [Visual Studio preview](https://visualstudio.microsoft.com/vs/preview/) that in return for giving the Visual Studio product teams feedback, you get to use any edition for free.

#### VS Extensions

Here's a list of the main extensions we use daily:

- __[R#](https://www.jetbrains.com/resharper/)__ - we buy the ultimate version, because it comes bundled with a set of profilers that are great for your toolkit
- __[The Essentials](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.BasicEssentials)__ - a collection of other extensions
- __[PowerShell Tools for Visual Studio](https://marketplace.visualstudio.com/items?itemName=AdamRDriscoll.PowerShellToolsforVisualStudio2017-18561)__ - essential if you're writing PowerShell modules
- __[Power Commands for Visual Studio](https://marketplace.visualstudio.com/items?itemName=VisualStudioPlatformTeam.PowerCommandsforVisualStudio)__ - set of usefull commands
- __[Productivity Power Tools](https://marketplace.visualstudio.com/items?itemName=VisualStudioPlatformTeam.PowerCommandsforVisualStudio)__ - another set of usefull addons
- __[Wakatime](https://wakatime.com/visual-studio)__ - best time tracker for Visual Studio, allows you to keep track of your hands-on time and through what languages are you spending your time on

### Visual Studio Code

Another IDE we use almost as often as Visual Studio side by side is [Visual Studio Code](https://code.visualstudio.com/download). Because it's the largest open source project in the world, it contains several extensions and features that make it a better IDE for certain coding tasks: Markdown, Azure ARM Templates, Terraform, etc. It's also of note that it's a free, open source, IDE.

#### VS Code Extensions

Here's our list of common extensions for VSCode:

- __[GitLens](https://github.com/eamodio/vscode-gitlens.git)__ - powerfull codelens extension for git information
- __[Markdown All in One](https://github.com/yzhang-gh/vscode-markdown)__ - a bundle of features that makes editing markdown a breeze
- __[Docker](https://github.com/microsoft/vscode-docker)__ - facilitates building docker containers and integrates with docker desktop
- __[PowerShell](https://github.com/PowerShell/vscode-powershell.git)__ - allows for developing PowerShell in VS Code
- __[Azure Tools](https://github.com/microsoft/vscode-node-azure-pack)__ - bundle of other extensions for working on Azure with VS Code

### Jetbrains Rider

Another option, that can reduce costs significantly, especially if the team is already using R#, is using the [Rider IDE](https://www.jetbrains.com/rider/), that now comes bundled in the R# ultimate package.

Like writing C# in VS Code, Rider will also come with a set of restrictions in some of the more exotic code | work that you can do.

## Git stack tools

We use mostly command line git tooling. The cost is a steeper learning curve, but there are good resources out there that can help you along this journey:

- __[git - the simple guide](http://rogerdudler.github.io/git-guide/)__
- __[Pro git book](http://rogerdudler.github.io/git-guide/)__

We use our prefered shell of choice: PowerShell. To get the latest version of PowerShell, just hit the [releases tab on their github page](https://github.com/PowerShell/powershell/releases). Have the latest [git client for windows](https://git-scm.com/download/win) installed and you are almost ready to go.

The latest step is to install a PowerShell module that integrates the git client very well with PowerShell, we use the [Posh-Git module](https://github.com/dahlbyk/posh-git) for this, you can install it by simply doing:

```powershell
Install-Module posh-git -Scope CurrentUser
Add-PoshGitToProfile
```

This will integrate the git client different output channels nicely with PowerShell, otherwise PowerShell will see stdwarn for example as an error channel and the git client gives you hints through that output channel so things show up in red as if they were problems. It will also give you an aditional helper after the folder name that tracks your current branch state vs the remote origin:

![Posh Git Shell](/assets/images/dotnet-tooling-git.png)

Finally is a little helper script, for you to put into your PowerShell profile, to edit your profile just do:

```powershell
code $profile
```

And dump this in so that you can simply type `pr` on a repo folder that belongs to Azure DevOps (sorry, this won't work with github _yet_!) to automatically create a PR:

```powershell
New-Alias -Name "pr" New-PullRequest

function New-PullRequest
{
    $branch = git branch --show-current
    $repo = git config --get remote.origin.url

    start "$repo/pullrequestcreate?sourceRef=$branch&targetRef=master"
}
```

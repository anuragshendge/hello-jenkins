# CSC 591/791 Milestone2 - Test + Analysis
## Team members
1. Krishna Teja Dinavahi (kdinava) 
2. Aneesh Kher (aakher)
3. Anurag Shendge (ashendg)
- - - 

## Project used to test the builds
For this milestone, we wrote a small JavaScript program to perform some basic arithmetic operations. This script is a standalone script with no library dependencies. We have included Unit tests, code coverage, static analysis, extended static analysis, and security checks as build steps in order to determine the success or failure of a build. Our project uses the following test and analysis components.

1. Unit Tests
2. Code Coverage
3. Static Analysis
4. Extended Static Analysis
5. Security Checks

- - - 


## Test Section
#### Test setup  
For this project, we have used Jenkins CI to run our build scripts, which consist of the scripts for unit tests, code coverage, static analysis and security checks. We have installed Jenkins on a remote server which we brought up through [DigitalOcean](https://www.digitalocean.com/).
#### Test Components
##### 1. Unit tests
We have used the `mocha` JavaScript framework for running our unit tests. A developer will write unit tests as per the return values of the functions. The mocha framework will execute those unit tests, and produce a report format based on the argument provided. In Jenkins, the unit test is run by executing `npm run unit-test` on the execute shell. The execution status is checked by the shell, and the build is failed unless all the unit tests pass. 

Here is a code snippet of the mocha unit tests
```javascript
describe('Basic addition', function() {
	it('Returns a positive number', function(done) {
		var answerPos = sample.addNumbers(34,45,56,67);
		expect(answerPos).to.equal(202);
		done();
	});

	it('Returns a negative number', function(done) {
		var answerNeg = sample.addNumbers(-3, -4, 4, -7);
		expect(answerNeg).to.equal(-10);
        done();
	});

	it('Returns an undefined value', function(done) {
		var undef = sample.addNumbers(-3, "GarbageString", 4, "Random");
		expect(undef).to.equal(undefined);
		done();
	});
});
```  
  
The unit test code listed above will perform unit tests for the `addNumbers` method in the `sample.js` project file that we have used.  
  

##### 2. Code Coverage
For code coverage, we used the tool introduced to us in [Homework 2](https://github.com/CSC-DevOps/Course/blob/master/HW/HW2.md), and extended it to cover branches and statements of our code. We have used `istanbul` to report our coverage, and have written a wrapper script in Perl to scrape the data and return a non zero exit code in case the coverage is below a threshold specified by us.  
Here is a sample of the output generated by the istanbul library for code coverage.  
<pre>
=============================== Coverage summary ===============================
Statements   : 72.41% ( 42/58 )
Branches     : 55.56% ( 20/36 )
Functions    : 100% ( 6/6 )
Lines        : 72.41% ( 42/58 )
================================================================================

</pre>  
  


- - -
  
  
## Analysis section
#### Analysis Components
##### 1. Static Analysis
For static analysis, we have used `JSHint` on our source file. The JSHint tool shows various types static errors like, semicolon not present, function library not imported, and so on. These errors can be configured using the `.jshintrc` file to suite your requirements. For example, to force the programmer to include all libraries, the `undef` flag can be set in the .jshintrc file, which will produce an error if the libraries of which functions are being used, aren't required. The build will fail in case the static analysis check is not successful.  
  
Here are some of the errors that `jshint` will report.  
<pre>
sample.js: line 21, col 2, Unnecessary semicolon.
sample.js: line 31, col 13, Expected '===' and instead saw '=='.
sample.js: line 35, col 13, Expected '===' and instead saw '=='.
sample.js: line 84, col 35, Expected '===' and instead saw '=='.
sample.js: line 95, col 2, Unnecessary semicolon.
sample.js: line 101, col 28, Expected '===' and instead saw '=='.

6 errors
</pre>  

##### 2. Extended Static Analysis
To extend the static analysis checks that are being run, we have developed a script which gives us the ratio of comments in a file to the actual lines of code in a file. If this ratio is below (or above) a certain threshold, the program will return a non zero exit status and hence the build will fail.


### Build Setup
>   We installed Tomcat, Jenkins, git, and maven on our local machine. We used the follwing plugins in Jenkins:   
	1. **Github Plugin**: The github plugin helps us to use our repo by specifying git clone url for build process    
	2. **Mailer Plugin**: The mailer plugin is used to send emails from Jenkins to notify about the build status



### Build section
>	***1. Ability to trigger a build in response to git commit via git post-commit hook***
>>	Post Commit contents:   We used a perl script in the post commit file to trigger the build on either 'dev' or 'release' branches


```perl
#!/usr/bin/perl
my $branch = `git rev-parse --abbrev-ref HEAD`;
chomp($branch);
print "Committing to branch $branch\n";

my $curlString;

if ($branch eq "release") {
	$curlString = 'curl -s "http://localhost:8080/jenkins/job/M1-release/buildWithParameters?token=build-release&branch=release"';
} elsif ($branch eq "dev") {
	$curlString = 'curl -s "http://localhost:8080/jenkins/job/M1-dev/buildWithParameters?token=build-dev&branch=dev"';
}
print "Sending curl string: $curlString\n";
`$curlString`;

```	

>	***2. The ability to execute a build job via a script or build manager (e.g., shell, maven), which ensures a clean build each time.***
>>	As jbehave is a Java application, we installed maven and integrated it with Jenkins to ensure a clean build each time. pom.xml was provided by Authors of jbehave.


>   ***3. The ability to determine failure or success of a build job and trigger an external event [email]***
>>	For this task, we configured the email plugin on Jenkins. Here are a few screenshots that demonstrate some of the configuration.   

![Screenshot1](https://github.com/aneeshkher/DevOpsMilestone1/blob/master/images/ExtendedEmailPlugin.png)   

>>  Another screenshot showing more configuration   

![Screenshot2](https://github.com/aneeshkher/DevOpsMilestone1/blob/master/images/EmailPlugin.png)   

>>	

>	***4. The ability to have multiple jobs corresponding to multiple branches in a repository***	
>>	We added one job in Jenkins which corresponds to each job in git. The post-commit git hook will get the current branch on which the commit is made and will trigger the respective job on Jenkins. Each job of jenkins is configured as a parameterized build, which will accept the build string from the git post-commit hook and run the build on the local repository according to that.   
   
>>  Here is a screenshot showing the 'parameterized' field enabled   

![Screenshot4](https://github.com/aneeshkher/DevOpsMilestone1/blob/master/images/M1-Release-config-1.png)   
   
>>  Another screenshot showing the build trigger configuration in Jenkins   
 
![Screenshot5](https://github.com/aneeshkher/DevOpsMilestone1/blob/master/images/M1-release-config-2.png)   

 

>	***5. The ability to track and display a history of past builds.***
>> 	The following code snippet helps us dispaly the history of past builds by making a GET request to the REST API provided by Jenkins

```javascript
var git = require('git-rev');
var needle = require("needle");

var brnc;

var client =
{
    listBuilds: function( onResponse )
    {
        git.branch(function (str) {
        if(str=="dev")
        	needle.get("http://localhost:8080/jenkins/job/M1-dev/api/json?pretty=true", onResponse)
        else if(str=="release")
         	needle.get("http://localhost:8080/jenkins/job/M1-release/api/json?pretty=true", onResponse)
		})
    },
}

client.listBuilds(function(error, response)
{
        var data = response.body;
        console.log(data['builds']);
});

```  
  
>>  Here is a screenshot of the list of the builds   

![Screenshot3](https://github.com/aneeshkher/DevOpsMilestone1/blob/master/images/BuildsList.png)


#Screencast   
###(Click the image below  and you will be redirected to YouTube)
[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/uwU8yQDhyNE/0.jpg)](https://youtu.be/uwU8yQDhyNE)


# monPlan
Plan out your degree with **monPlan** _Previously known as Monash Unit Planner_ . monPlan is designed to help you to choose your units for the coming semesters. And takes account into prerequisites as well as prohibitions

# Notice(s)
There are several notice(s) at the moment:
- We are currently holding on progamming/finding a solution for Course Verification, as we will be talking with _eSolutions_ regarding this matter.
- Our WebScraper has been Open-Sourced! View it at: https://github.com/MonashUnitPlanner/webScrape/
- We are also planning to expand! If you're a student from the University of Melbourne (UoM), Swinburne University, Deakin University or RMIT and you would like this at your university. Talk to us and lets see if we can get things rolling at your university.
- We will be conducting _Community Development Workshops (CDWs)_ over the coming months, register here: https://goo.gl/Vpgmld today

## Developers
Please note that we are using **Agile** for this project, each sprint will be 1-2 months, with each a meeting in **Slack** before the start of each week and the start/end of each sprint. Our Slack address is at: https://monplan.slack.com, please contact an admin to have access to our slack, our admins are currently are @lorderikir and @Joshua-Xavier

## To Do List
_See https://github.com/MonashUnitPlanner/monPlan/issues/72 for full to-do list_

# Dependancies List
- Semantic-ui
- npm

# Usage
## Initial Setup
To setup initially, please run the following
```
npm install
npm install grunt-cli
```

| Instruction | Executes |
| ----------- | -------- |
| `grunt bar-dev` | runs an instance in the address http://localhost:8080 |
| `grunt test` | runs testing with eslint and htmlint |
| `grunt build` | builds the project to /build/*, this can copied onto a web server |

There is no need for rebuilding with `bar-dev`, we now used livereload.js to perform automatic updates

# License
MIT License

Copyright (c) 2016 monPlan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

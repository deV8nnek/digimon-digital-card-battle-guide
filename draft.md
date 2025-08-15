# Digimon Digital Card Battle Guide

A Game Guide for Digimon Digital Card Battle that shows card collection, card distribution, and predict card fusion.

~~A Game Guide for Digimon Digital Card Battle<del>, from the japanese website, https://www.y-gamelab.com/,</del> that shows card and deck collection, card distribution, and play with the deck guesser.~~

~~that extracts the card collection using a game data which is digimon digital card battle from a Japanese (this app language too) website then show card distribution of types, stats, (and infer some insights or trends) then simple battle simulator, create training and test dataset, and ai predict winner from new matchups.~~

## Disclaimer

This is a personal project for development purposes only and this draft focuses more on the goals and catching up with the latest technologies and may be informal.
As if the template is an existing codebase where I add new features.

## Notes

Where the tech is heading, feels like cloud computing has a place since scaling is important, demand for resources while AI which is like a race for now. Will save cloud computing later, for experience purposes the more stack first<br>
Offtopic reading about the AI will replace us, AI is already better and will get better, good luck, I will not compete with AI, I will try, adapt, and get better on my own pace as always, I am not perfect, I can make mistakes.

## Planning

- Objective: Create a game guide for Digimon Digital Card Battle<del>, from the japanese website, https://www.y-gamelab.com/,</del> that shows card collection, card distribution, and predict card fusion~~play with the deck guesser~~. - Specific: Help players browse card ~~and deck~~ information ~~and make deck counters (except deck guesser)~~, and card distribution insights, and know card fusion result - Measurable: 3 main features - Achievable: Within AI/ML, data analytics, web scraping - Relevant: Align with goals - Time-bound: None
  ~~- Show card collection- Show card or deck distribution- Use AI for card or deck guesser or 1v1 ai battle simulator or 1v1 predictions~~
  ~~Extracts the card collection using a game data which is digimon digital card battle from a Japanese (this app language too) website then show card distribution of types, stats, (and infer some insights or trends) then simple battle simulator, create training and test dataset, and ai predict winner from new matchups.~~

- Scope: Predict card fusion include basic (learn from data by ai not through the game fusion mechanics) and special fusion (may fixed results to ai) does not include partner, mutation; Functional and timely not perfect code including writing, not learn everything or deeply, unneccessary template deletion or merging is not required

- Goal:

  - Learn new tools and technologies
  - Study Japanese
  - Relate to an AI/ML, data analytics, web scraping, and game
  
  - To add, as early as possible

- Feasibility

  - Technical: see resource, started with template with some stack, and research for the rest
  - Economic: None
  - Operational: None

- Risk

  - Budget overruns: None
  - Tight deadlines: None
  - Technical challenges: Learning Time over Dev Time, ...
  - Compliance issues: None

- Resource
  - Human resources: Solo
  - Tools and technologies
    - Programming Languages: Python
    - Framework: FastAPI, React
    - Infrastructure (Software)
      - OS: Windows
      - DB: PostgreSQL
      - Web Server: Nginx
      - VCS: Git, GitHub
      - Containerization: Docker (single), Docker Compose (multiple)
      - Orchestration: Kubernetes
      - IaC: Terraform
      - CI/CD: Jenkins ~~GitHub Actions~~
        ~~- Cloud: NextCloud~~ ~~AWS ~~ //will learn cloud computing using AWS separately or maybe integrate in the future
    - Tools
      - AI Coding Assistant: GitHub Copilot, ChatGPT, Google Gemini
      - Design: Figma
  - Data:
    - [card collection and distribution data](https://wiki3.jp/digitalcardarena/page/7)
    - [card collection images](https://gamefaqs.gamespot.com/ps/526754-digimon-digital-card-battle/faqs/78563/100-card-collection-extra-notes)
    - [card fusion training data](https://gamefaqs.gamespot.com/ps/526754-digimon-digital-card-battle/faqs/24611)

Forgot to write why I choose FastAPI, React, etc.

## Analysis

- Requirements Gathering

  - Stakeholders: players
  - Methods:
    - Interview: None but as a player, lots of filter for card collection would be useful for deck creation
    - Survey and Questionnaires: None but as a player, knowing card fusion result helps me complete card collecting and not sure what the card distribution insight is~~deck collection can be useful for deck counter but not needed for me and deck guesser is not useful~~
    - Workshop: None
    - Observation: None but as a player, in game, creating deck requires filter by rank, filter by type, search card, then add to deck.

- Requirements Analysis: Card collection with filters, card distribution is unclear, predict card fusion is useful for card collection~~No need deck collection and deck guesser (for example only, will proceed)~~

- Requirements Documentation
  - Functional Requirements
    - The system must allow users to browse card
      ~~- The system must allow users to browse deck~~
    - The system must allow users to view card distribution
    - The system must allow users to fuse cards
    - The system must predict card fusion result
      ~~- The system must allow users to play with deck guesser~~
  - Non Functional Requirements
    - Portability: Can work on any OS
    - Security: None since no sensitive data and back-end read only database server
    - Maintainability: None since small scale and not much to maintain
    - Reliability: Reliable since small scale
    - Scalability: None since small scale project and not much to add
    - Performance: Work under 1 second
    - Availability: None since small scale
    - Compatibility: Can work with modern browsers
    - Usabilty: Easy to use even for first time users
    - Accuracy: Can predict card fusion with at least 70%
  - Use Cases: Skipped
  - User Stories: Skipped
  - Diagrams: Skipped
  - Requirements Traceability Matrix: Skipped
  - SRS: Skipped

## Design

Though coupled with different requirements/functions, the design is like a dashboard where everything is connected.

### Wireframe & Prototype

Final Draft
![Final Draft](/img/figma-draft-final-dashboard-2.png)

Cleaner, polished design<br>
~~Apply web design thinking box like inspector~~<br>
Since feels a waste to not use figma more when using it just like a paint

Q: Margin, Padding<br>
Auto Layout Frame<br>
Padding: Group 1 element, horizontal and vertical padding<br>
Margin: Group 2 Group 1, gap, horizontal and vertal padding<br>
Q: Group vs Frame<br>
Groups can nestle layers only<br>
Switching to Frame with more capabilities<br>
Q: Auto Layout flows right endlessly<br>
Wrap<br>
Q: scrolling not overlay when running<br>
Clip content<br>
Q: layout row to column if scaled small

Keeping retro design<br>
Layout Guide and Auto-Layout<br>
Grid layout<br>
Protoyping<br>
~~Variant~~~~ component property~~empty text space<br>
OK Card Info<br>
Placeholder Chart, not yet sure what visualization or plot type to use<br>
the idea where (a) subset from all data, and (b) all data by a category, ... which is difficult to design<br>
component property, variants, learn component sets<br>
prototype nightmare~~, deleting multiple exit points xD~~<br>
handling all interactivity slows figma

Q: prototype is slow<br>
focus on ideal path first

deleted template<br>
retain already created, separate ideal path from others, use back for some<br>
instant animation, uncreated path clickabe but placeholder close overlay<br>
use back properly<br>
OK Chart

variant animate<br>
overlay<br>
OK Predict Fusion, enough is enough<br>
add disclaimer ai/ml result could be wrong

2nd Draft
![2nd Draft](/img/figma-draft-2-wireframe.png)

Q: Figma basics or beginner<br>
understanding low-level wireframe<br>
mostly use rectangle or text<br>
don't focus too much on the details, do minimal alignment, sizing, basic colors, etc.<br>
using pen tools for drawing imperfect icons<br>
organizing layer names if necessary, group if duplicate or not children<br>
Q: border-left<br>
~~drop shadow - in shadow - x 1 y 0~~<br>
use line<br>
Q: card increment number in list<br>
not variables<br>
google sheet sync plugin<br>
Q: reuse element<br>
use component<br>
adjust original like sizing, alignment, constraints

1st Draft
![1st Draft](/img/figma-draft-1-wireframe-dashboard.png)
Feels like misusing components<br>
groups vs components?<br>
recreating cards, easy way?<br>
should i design like in web like an inspector, boxes<br>
what is the unified design for image, text, buttons, etc.<br>
layers organized but best naming convention?

### Mockup~~Prototype~~

As much as I want to design in more detail, I want to start the development, will play with Figma to make a response web design in the end maybe</del>

## Development

### Web Scraping

Choosing scrapy framework over selenium<br>
create icons<br>
scrape type: text, image

write on ~~csv, ~~db using pipeline in 1 commit if not exist init separately once from backend<br>
~~write on db if not exist~~

Q: combining model and item to avoid boilerplate<br>
basemodel and inheritance model

Q: how to access by index the filtered xpath<br>
let's say the result is 1000 elements in an array from the xpath not node/element with groups of 10 of 100s which I will term end array of xpath<br>
at the end of xpath inserting by index will give the 1-10 of 100s<br>
so to answer, wrap the xpath by () within the quotes then access normally by index within the quotes

not normalizing any further since the card size is fixed, small, simple and use one table for both digimon and option cards for performance<br>
where it can be further omptimized by caching<br>
no need index - small read only fixed, materialized views - simple, denormalization - as said above, vertical scaling - small scale, replicatiom sharding - no users xD<br>
fusion prediction will probably just in file

<del>OK scrapy<br>
OK models<br>
OK project env<br>
OK postgres<br>
OK README</del>

note always run/debug first even simple app rather than complete code then run to fix environment or config errors<br>
japanese characters<br>
cleaning data<br>
checking styles in advance<br>
just notice the bookmark from stackoverflow can't upvote<br>
more environment setup<br>
<del>OK debug</del>

30% code and debug code 70% debug scrapy and setup<br>
OK web scraping

git reflog, rebase
git amend

![web scraping](/img/web-scraping.png)
![web scraping db](/img/web-scraping-db.png)

### Data Analytics

backend logic not yet fastapi web backend
backtracking run the web scraping module not found issue
~~pyproject.toml > setup.py~~
run bash script to change cwd instead of in program

researching about project structure<br>
trying to understand why this template uses this project structure<br>
```text
backend
|-.venv //OK for self explanatory
|- app //or src
  |- alembic //OK
  |- api
    |-routes
      deps.py //referenced by routes
      main.py //fast api route
  |- core
  |- email-templates //ignored
  |- tests //OK
  ... //ignored
  main.py //fast api, api.routes.main
  crud.py //or repository or dao, db folder
  models.py //but more models, by model will be more manageable, by route but not by model? SQLMoedel docs did group to one
  utils.py //ok but prefer having common folder
|- scripts //OK like to run from backend 
top level config and others...
```

Q: project structure examples for each software architectural patterns, no need to explain
modifying ai response
fastapi bigger applications file structure
```text
backend/src
| main.py
├── config/
├── common/
|     | dependencies.py 
├── resources/
|     ├── data
|     ├── img
├── database/           # repo, dao, crud
├── domain/             # Entities, Value Objects or models
├── profile/            # like admin
├── router/
├── service/            # Application Services, Use  Cases, business logic

backend/test/
```

it's annoying to type `<br>` often

```text
Importing * From a Package

Just noting,
Excel & PowerQuery- SQL - PowerBI, Tableau, d3js - Python
dbeaver

git reset, merge, pull request

Though I want to explore more about the data, other tools
Initially, I already have the idea on what to use as visualization
Exploring further is nice to have but my goal is to use python, pandas, numpy for data analysis and as early as possible

Complexity isn't the goal
301 cards is the current data, ml will have more than that as there are many combinations for card fusion 

Pretty much the data is already cleaned as scraped
Though the advanced styling was a mistake, creating own problems
at least there is something to clean, but will still clean regardless since it's a standard before working on the data
including handling missing data, removing duplicates, finding outliers just to show the process

so what I wanted to write in advance in this section is more into the analysis aspect

how strong is a digimon
there could be top 10 ranking overall, statswise, in their type, or in their lv
if the dataset is battle data, how often a digimon is used, to what enemies, in what combos, even certain effects which are not numerical are overpowered, but there could be different factors not just stats
for now, since the dataset is just card
initially, a radar/radial chart for the numerical stats for a digimon across types (lv can be added or more analysis in the future)
as per design, the digimon can be compared side by side
nothing fancy, even a table is enough
imagine players seeing a bell curve for standard deviation or variance (but just for exploration in the future)

not just card information,
data question
how stats affect win rate
how effect affect win rate
how combos affect win rate
why certain digimon are likely used than others
why certain option are likely used than others
why this card
why thi digimon
why this option 
how are digimon stats distributed by type, class
how are digimon effects distributed by type class
~~data question (for analyzing, for game nerds could be, patterns, data to data)
how are digimon stats distributed
how are digimon effects distributed
how are digimon used
how are option used
how are card combos used 
how digimon win or lose
why this digimon
idk why i change what to how and why, something unkown/vague or understanding the data makes some sense if not a player~~

game-related data question (for a guide, what provides value or useful info)
how strong is a digimon
how to counter this digimon
how to build a deck
what are the best digimon
what digimon type is the best
what option is the best
what card combo is popular
who to pick as a partner digimon
```

![data-analytics-stat-chart](/img/data-analytics-stat-chart.png)
![data-analytics-describe](/img/data-analytics-describe.png)
![data-analytics](/img/data-analytics.png)

### AI/Machine Learning

```text
predict card fusion
what: card A + card B = card C
where: https://gamefaqs.gamespot.com/ps/526754-digimon-digital-card-battle/faqs/24611
how: train and test

train
feed the model
test 
feed some training for the test
correct the model
repeat
any lower than that is just code how
note, accuracy at least 70%
it is quite simplistic or classical
trial and error, learn as it goes
navigating through a bunch of concepts will take a long time
defining or completely understanding every ML concept, or going to deep learning is not the goal

before forgetting again
pytorch or tensorflow
stackoverflow survey 2024 show pytorch and tensorflow equally desired but pytorch was more desired
and basic sample code comparison so pytorch for now

also
Q: what programming language and libraries are you developed from
ChatGPT: 
...
PyTorch – The primary deep learning framework used for training and running large models like GPT.
TensorFlow – Sometimes used in other parts of the pipeline or research, though PyTorch is dominant for GPT models.
...
Gemini: 
... 
TensorFlow: This is Google's flagship open-source machine learning framework, and it's undoubtedly a core component. Gemini is built upon and likely utilizes advanced features of TensorFlow, including its capabilities for distributed training and deployment on custom hardware.
...

card A + card B 
card: number~~, name~~, type, lv //variables to make Card C

rethinking about goals
nothing fancy but a simple model then try other complex algorithms in the future
supervised learning - classification - linear regression
offtopic heard of naive bayes much in school, but the school restricted to use it due to commonality in thesis
anyways starting from the simplest
idk why but i kind of leaning to support vector machine (svm) and 
semi-supervised learning for both unsupervised and supervised though the use case is leaning more on supervised

In game mechanics, card fusion is based on hidden composite and material value of a card, fixed pairs to generate result card
not goal but aiming the model to learn before all data is fed  

after understanding the code somewhat, might explore diffent algorithms if it's ~~encapsulated~~highly abstracted why not?

Will use neural networks
Will start with 1 hidden layer, ... n hidden layers
Will choose between linear regression, and other algorithms, mix and match
Noting topics, activation, cost function, loss optimizers, gradients
So basically instead of a classical approach, will be able to explore these other algorithms in neural networks
Reminder: take a screenshot of each result
```

![machine-learning](/img/machine-learning.png)

### Back-end

```text
For now, expecting 3 API routes is necessary for the backend
Will add more if needed in frontend

Added some async
```

![request-get-card](/img/request-get-card.png)
![request-get-card-stat-chart](/img/request-get-card-stat-chart.png)
![request-get-card-fusion](/img/request-get-card-fusion.png)

### Front-end

#### TODO

- [x] Initialize Nextjs
- [x] Copy Figma to Shadcn, Tailwind, Nextjs code
- [ ] Overall Layout (Box is fine, try tailwind)
- [ ] Each Component High to Low
- [ ] Integrate with back-end

#### Nice-to-Have

- [ ] Try Responsive Design
- [ ] Animate

```text

Instead of the template 
Change to

Next.js/React (Front-end only)
Tailwindcss
```

![dashboard](/img/dashboard.png)

## Maintenance

- search
- composite, result value for fusion
- english
- ~~dynamic web scraper~~ refine ~~web scaper~~ scrapymon
- refine pandasmon
- refine pytorchmon

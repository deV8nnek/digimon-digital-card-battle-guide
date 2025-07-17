# Digimon Digital Card Battle Guide

A Game Guide for Digimon Digital Card Battle<del>, from the japanese website, https://www.y-gamelab.com/,</del> that shows card and deck collection, card distribution, and play with the deck guesser.

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
![Final Draft](/img/[Final%20Draft]%20Dashboard%202.png)

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
![2nd Draft](/img/[Draft%202]%20Wireframe.png)

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
![1st Draft](/img/[Draft%201]%20Wireframe%20-%20Dashboard.png)
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
no need index	- small read only fixed, materialized views - simple, denormalization - as said above, vertical scaling - small scale, replicatiom sharding - no users xD<br>
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


OK web scraping


### Data Analytics

### AI/Machine Learning

## Maintenance

- search
- composite, result value for fusion
- english
~~- dynamic web scraper~~
- refine web scaper

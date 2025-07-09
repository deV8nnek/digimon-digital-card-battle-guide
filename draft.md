# Digimon Digital Card Battle Guide
A Game Guide for Digimon Digital Card Battle, from the japanese website, https://www.y-gamelab.com/, that shows card and deck collection, card distribution, and play with the deck guesser.

~~that extracts the card collection using a game data which is digimon digital card battle from a Japanese (this app language too) website then show card distribution of types, stats, (and infer some insights or trends) then simple battle simulator, create training and test dataset, and ai predict winner from new matchups.~~

## Disclaimer
This is a personal project for development purposes only and this draft focuses more on the goals and catching up with the latest technologies and may be informal. 

## Notes
Where the tech is heading, feels like cloud computing has a place since scaling is important, demand for resources while AI which is like a race for now. Will save cloud computing later, for experience purposes the more stack first<br>
Offtopic reading about the AI will replace us, AI is already better and will get better, good luck, I will not compete with AI, I will try, adapt, and get better on my own pace as always, I am not perfect, I can make mistakes.

## Planning

- Objective: Create a game guide for Digimon Digital Card Battle~~, from the japanese website, https://www.y-gamelab.com/~~ that shows card collection, card distribution, and predict card fusion~~play with the deck guesser~~.
    - Specific: Help players browse card ~~and deck~~ information ~~and make deck counters (except deck guesser)~~, and card distribution insights, and know card fusion result
    - Measurable: 3 main features
    - Achievable: Within AI/ML, data analytics, web scraping 
    - Relevant: Align with goals
    - Time-bound: None
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

Wireframe
In Progress using Figma

Prototype
As much as I want to design in more detail, I want to start the development, will play with Figma to make these response web design in the end

## Maintenance

- English version
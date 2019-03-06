Lap Counter
===========

An application for lap counting during races (specifically aimed at track
races). In races where many athletes are lapped (e.g. an indoor 5k) it can get
very difficult to keep track of how many laps everyone has to go. A mistake will
result in athletes running an extra lap, or finishing a lap early. In the 2015
NCAA DIII Women's 5k indoor national championship the officials undercounted the
laps for the leaders, causing mass confusion and likely changing the outcome.
After watching this I thought there had to be a better way, and this is my
resulting experiment.

The concept is that we present a list of athletes and the user taps each athlete
as they complete a lap, moving them to the bottom of the list. This results in a
list sorted in descending order by the time since each athlete last completed a
lap. When an athlete completes a lap they are therefore likely to be near the
top of the list, so it should be easy for the user to find them.

Pre-race: 
1. Select the race distance and number of laps.
2. Input a list of the competitors names, hip numbers, and seed times.
  (eventually this should be done just by importing a performance list)

Race:
1. Tap "Start" approximately when the race starts (could use mic to pick up gun eventually).
2. Tap each competitor's name as they pass the start line each time.

The leader is shown in green. If an athlete is lapped they are shown in red.

## Setup

Code is kept in `src/` and is bundled into `dist/bundle.js` with webpack.

For development:
```
make
```

For production:
```
make optimized
```

Open `dist/index.html`.

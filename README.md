# HabitForge Client

## Running the app

The app expects to be able to reach API at http://localhost:8080 (https://github.com/Bberky/habitforge-server)

The app runs on port 3000 by default (can be changed using docker) and is
accessible at http://localhost:3000

```sh
$ docker build -t habitforge-client .
$ docker run -p"3000:3000" habitforge-client
```

## Using the app

First you must create an account and then sign in, if you're not signed in,
the app won't let you anywhere else except auth pages.

On the home page, you will see two buttons, _New Tag_ which opens a modal
where new tag can be created (and later assigned to habit) and _New Habit_.
The latter will open a modal where you can either choose from a list of
already created habits, or click on _+_ to create a new habit. Then, if
applicable, you will fill out fields for the new habit, as well as fields for
the record between you as an user and habit you want to track. These are
goal interval, which means how often a goal should be achieved and goal
thershold, which represent the target value to reach the goal. For example,
you want to run 50km weekly, you will create running habit with km as unit,
set goal interval to weekly and goal threshold to 50.

On the home page you will also see all your tracked habits. On each card there
are four buttons. By clicking on the first one, you can create a new entry (e.g.
you ran *5*km). By clicking on the second one, you can assign tags to a habit (
beware that tags are assigned to the habit, not just your track relation). By
clicking on the third one, you can visit the detail page where you can see all your
entries for that specific user habit relation. By clicking on the fourth one,
you can delete your tracking of that specific habit.

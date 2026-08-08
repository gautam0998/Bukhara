# Bukhara Scores

A scorekeeper for the card game Bukhara. Two teams, one score each per round,
running totals, and a flag when a team reaches 1000 and has to change their game.

Plain HTML, CSS and JavaScript. No build step, no framework, no backend.

**Live:** https://gautam0998.github.io/Bukhara/ (once Pages is switched on, below)

Note the capital B. GitHub Pages URLs are case-sensitive in the path, and this repo
is called `Bukhara`.

## Turn on Pages

The files are already here. One switch is left:

**Settings** → **Pages** → under *Build and deployment*, set **Source** to
*Deploy from a branch*, branch **main**, folder **/ (root)**. Save.

Wait about a minute. The URL appears on that same page.

That link is shareable - WhatsApp, anywhere. Anyone can open it, no account needed.

Everything is served from the repo root with relative paths, so it works from a
project subpath like `/Bukhara/` without any configuration.

## Install it on your phone

Open the URL in Safari → Share → **Add to Home Screen**. It launches fullscreen with
no browser chrome and works offline, including at a table with no signal.

Chrome on Android offers **Install app** in the menu.

## How scores are stored

Scores live in `localStorage` on the device that entered them. Nothing is uploaded
anywhere and there is no account.

That means **each phone keeps its own scores**. Sharing the link lets other people use
the app; it does not show them your game. A shared live scoreboard would need a backend
such as Supabase.

## Sharing vs backing up

These are two different jobs and the app treats them separately.

**Sharing** uses **Share scoreboard image**, which draws a PNG poster: both totals with
their rails, a running-totals chart, the round-by-round table, and - once games are
logged - the series record, per-team stats, and past results.
Photos appear straight in a WhatsApp chat, so nobody has to tap or open anything. On a
phone this opens the share sheet directly; on a desktop it downloads the image.

A picture cannot be read back in. WhatsApp recompresses images and strips metadata, so
anything hidden inside the file is destroyed. Never treat a screenshot as a backup.

## Backup

| | What it does | Survives |
|---|---|---|
| **Download backup file** | Saves a `.json` file. On iPhone, save to Files or send it to yourself. | A lost or wiped phone |
| **Load a file** | Reads a backup file back in | - |
| **Restore points** | The last 20 states, kept automatically | Accidental deletes and bad edits |
| **Copy & paste** | Backup as text | Moving between devices quickly |

All of it lives under **Backup and restore** in the ⋯ menu.

Restore points are stored on the same device, so they don't protect against losing the
phone. Download a file every so often - the status line reminds you after a month.

**Clearing your browser's site data erases everything.** So does deleting the home-screen
app on iOS in some cases. The downloaded file is the only real backup.

## Negative rounds

Each score box has a `+` / `−` picker to its left, defaulting to `+`. Tap it to enter a
penalty. Negative numbers show in orange throughout, including running totals that dip
below zero.

The 1000 flag tracks where a team stands right now. If penalties drag them back under
1000 the flag clears and the acknowledgement resets, so crossing again prompts afresh.

## Dates

Each game carries a date, defaulting to the day it was played. Tap the date on the entry
panel to change it. Logged games have their own editable date in the History tab, useful
when you record a game the morning after.

## The two screens

**Play** is the game in front of you and nothing else: the two names, the two totals,
a rail each, and the round-by-round list. No chart, no statistics. The list is meant to
be readable without scrolling past anything.

**History** is where you go to look at things. The running-totals chart for the game
currently on the board sits at the top under *This game*, then the series record,
per-team stats, and past results.

## The rails

The two bars under the team names are the app icon, made live. Each bar grows toward the
orange 1000 line, which sits at 70% of the track so there is visible room to overshoot.
A team past the line keeps a "Changed game" tag until a penalty drags them back under.

## Changing the rules

Everything is in `index.html`:

- Target score: `var TARGET = 1000;` near the top of the script.
- Where the 1000 line sits on the rail: `var RAIL_TICK = 0.70;`
- Share image width: `var W = 1080` inside `drawCard()`.
- Past games shown on the share image: `arch.slice(-6)` in `drawCard()`.
- Team names: editable in the app, tap them.
- Number of restore points: `var MAXSNAP = 20;`

After editing, bump the cache name in `sw.js` (`bukhara-v5` → `bukhara-v6`) so phones
pick up the new version instead of serving the cached old one.

## Colours

Four, all taken from the icon so the home-screen tile and the app are the same object.

| | | |
|---|---|---|
| `#0E1A18` | ground | the dark green everything sits on |
| `#E8B04B` | amber | team one |
| `#57C4B0` | teal | team two |
| `#E8734A` | orange | the 1000 line, and every negative number |

Team one and team two stay distinguishable under protanopia and deuteranopia, and each
line on the chart is labelled with its own total, so nothing depends on colour alone.

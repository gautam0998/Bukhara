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

Everything uses relative paths, so it works from a project subpath like `/Bukhara/`
with no configuration.

## Install it on your phone

Open the URL in Safari → Share → **Add to Home Screen**. It launches fullscreen with
no browser chrome and works offline, including at a table with no signal.

Chrome on Android offers **Install app** in the menu.

⚠️ **Offline needs all six files present.** `sw.js` installs by calling
`cache.addAll(ASSETS)`, and that call rejects as a whole if a single file 404s, which
silently means no service worker and no offline at all. `icon-512.png` is on that list,
so it has to exist even though nothing on the page displays it. Verified: serving the
app without it leaves zero caches and no registration; with it, six entries and an
active worker.

## How scores are stored

Scores live in `localStorage` on the device that entered them. Nothing is uploaded
anywhere and there is no account.

That means **each phone keeps its own scores**. Sharing the link lets other people use
the app; it does not show them your game. A shared live scoreboard would need a backend
such as Supabase.

## Sharing vs backing up

These are two different jobs and the app treats them separately.

**Sharing** uses **Share scoreboard image**, which draws a PNG poster of the game just
played: both team cards with their rails, a running-totals chart, and the round-by-round
table. Once games are logged it also carries the series win record, one line of context.
Photos appear straight in a WhatsApp chat, so nobody has to tap or open anything. On a
phone this opens the share sheet directly; on a desktop it downloads the image.

A picture cannot be read back in. WhatsApp recompresses images and strips metadata, so
anything hidden inside the file is destroyed. Never treat a screenshot as a backup.

## Backup

Everything below lives in the **Backup** tab.

| | What it does | Survives |
|---|---|---|
| **Download backup file** | Saves a `.json` file. On iPhone, save to Files or send it to yourself. | A lost or wiped phone |
| **Load a file** | Reads a backup file back in | - |
| **Restore points** | The last 20 states, kept automatically | Accidental deletes and bad edits |
| **Copy & paste** | Backup as text | Moving between devices quickly |

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

## Typefaces

Bricolage Grotesque for the wordmark, IBM Plex Sans for text, IBM Plex Mono for every
number. Loaded from Google Fonts with `display=swap`, so a cold offline start falls back
to the system stack rather than showing nothing. The service worker caches the font files
after the first online visit, which is why its fetch handler stores opaque cross-origin
responses as well as same-origin ones.

## Changing the rules

Everything is in `index.html`:

- Target score: `var TARGET = 1000;` near the top of the script.
- Share image width: `var W=1080` inside `drawCard()`.
- Team names: editable in the app, tap them.
- Number of restore points: `var MAXSNAP = 20;`

After editing, bump the cache name in `sw.js` (`bukhara-v7` → `bukhara-v8`) so phones
pick up the new version instead of serving the cached old one.

The poster used to end with four stat boxes and the last six games, controlled by
`arch.slice(-6)`. Both are gone: the picture is about the game just played, and the
series win record is the only carry-over. That knob no longer exists.

## Colours

Taken from the app icon, so the home-screen tile and the app are the same object.

| | | |
|---|---|---|
| `#0E1A18` | felt | the dark green everything sits on |
| `#E8B04B` | gold | team one |
| `#57C4B0` | jade | team two |
| `#E8734A` | flag | reaching 1000, and every negative number |

Gold and jade stay distinguishable under protanopia and deuteranopia, and both carry a
name label beside them, so nothing depends on colour alone.

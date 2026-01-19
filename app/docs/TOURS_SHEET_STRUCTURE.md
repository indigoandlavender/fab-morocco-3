# Fab Morocco - Tours Google Sheet Structure

## Sheet Name: Tours

Your existing Tours tab is correctly structured. Headers:

| Column | Header | Description | Example |
|--------|--------|-------------|---------|
| A | tour_id | Unique identifier | FAB-3DAY-01 |
| B | title | Tour name | 3-Day Sahara Desert Tour |
| C | slug | URL-friendly identifier | 3-day-sahara-desert-tour |
| D | hero_image_url | Cloudinary URL | https://res.cloudinary.com/... |
| E | short_description | One-line description | Cross the Atlas Mountains... |
| F | duration_days | Number of days | 3 |
| G | duration_nights | Number of nights | 2 |
| H | price_usd | Price in USD | 790 |
| I | price_eur | Price in EUR | 750 |
| J | start_city | Departure city | Marrakech |
| K | end_city | Ending city | Marrakech |
| L | destinations | Comma-separated list | Marrakech, Ait Benhaddou, Merzouga |
| M | highlights | Pipe-separated (|) | Camel ride at sunset|Night in desert camp |
| N | includes | Pipe-separated (|) | Private vehicle|Driver|Accommodation |
| O | excludes | Pipe-separated (|) | Flights|Travel insurance|Tips |
| P | category | Tour type | Desert, Classic, Grand |
| Q | featured | Show on homepage | TRUE/FALSE |
| R | published | Show on site | TRUE/FALSE |
| S | order | Sort order | 1, 2, 3... |

---

## Sheet Name: Tour_Itinerary

Day-by-day details for each tour. Headers:

| Column | Header | Description | Example |
|--------|--------|-------------|---------|
| A | tour_id | Links to Tours table | FAB-3DAY-01 |
| B | day_number | Day number | 1, 2, 3... |
| C | title | Day title (optional) | Marrakech to Merzouga |
| D | from_city | Departure city | Marrakech |
| E | to_city | Arrival city | Merzouga |
| F | description | Day description | Depart Marrakech early morning... |
| G | driving_hours | Drive time | 7 |
| H | meals | Meals included | Breakfast, Lunch, Dinner |
| I | accommodation | Where you stay | Desert Camp |
| J | image_url | Day image URL | https://res.cloudinary.com/... |
| K | **activities** | Main activity (NEW) | Camel trek, Hiking, Shopping |
| L | **difficulty** | Difficulty level (NEW) | Easy, Moderate, Active |

### Activity Keywords (for icons)

The site displays activity icons based on keywords:

| Keyword | Icon |
|---------|------|
| camel | 🐪 Camel icon |
| hik, trek | 🥾 Hiking icon |
| cook, tagine | 🍳 Cooking icon |
| hammam, spa | 🧖 Spa icon |
| souk, shop | 🛍️ Shopping icon |
| photo | 📷 Camera icon |
| mountain, atlas | ⛰️ Mountains icon |
| desert, dune, sahara | 🏜️ Desert icon |
| medina, old town | 🕌 Medina icon |
| 4x4, off-road | 🚙 4x4 icon |

---

## To Add New Tours

1. Add row to **Tours** tab with all details
2. Add corresponding rows to **Tour_Itinerary** for each day
3. Set `published` = TRUE
4. Images appear automatically (Cloudinary URLs)

## To Change Images

Just update the URL in `hero_image_url` or `image_url` columns. Site refreshes every 60 seconds.

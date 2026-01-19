# Fab Morocco Content System

## Architecture

Fab Morocco uses **Slow Morocco's Content_Library as single source of truth** for route content.

```
┌─────────────────────────────────────────────────────────────────┐
│                     SLOW MOROCCO SHEET                          │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Content_Library                                         │   │
│  │  - 151+ reusable route blocks                           │   │
│  │  - Images, descriptions, narratives                     │   │
│  │  - Travel times, activities, difficulty                 │   │
│  │  - Used by BOTH Slow Morocco and Fab Morocco            │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     FAB MOROCCO SHEET                           │
│  ┌─────────────────────┐    ┌───────────────────────────────┐  │
│  │  Tours              │    │  Tour_Itinerary                │  │
│  │  - tour_id          │    │  - tour_id                     │  │
│  │  - title, slug      │    │  - day_number                  │  │
│  │  - hero_image_url   │◄───│  - route_id  ────────────────────┼──► Slow Morocco
│  │  - price, duration  │    │  - day_title                   │  │   Content_Library
│  │  - highlights       │    │  - override_description        │  │
│  └─────────────────────┘    └───────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## How It Works

### 1. Fab Morocco Tours Tab
Contains tour metadata only:
- tour_id, title, slug
- hero_image_url, hero_image_prompt  
- duration_days, duration_nights
- price_usd, price_eur
- start_city, end_city, destinations
- highlights, includes, excludes (pipe-separated)
- category, featured, published, order

### 2. Fab Morocco Tour_Itinerary Tab
**Simplified structure** - just references:
| tour_id | day_number | route_id | day_title | override_description |
|---------|------------|----------|-----------|---------------------|
| FAB-3DAY-SAH | 1 | MAR-DAD-003 | Marrakech to Dades Valley | |
| FAB-3DAY-SAH | 2 | DAD-MER-116 | Dades to Merzouga | |
| FAB-3DAY-SAH | 3 | MER-MAR-007 | Merzouga to Marrakech | |

### 3. API Joins at Runtime
The `/api/tours/[slug]` endpoint:
1. Fetches tour from Fab Morocco Tours tab
2. Fetches day → route_id mappings from Tour_Itinerary
3. Fetches route details from **Slow Morocco's midjourney-day**
4. Merges and returns complete tour with itinerary

## Route ID Patterns

### Standard Routes
`{FROM}-{TO}-{NUMBER}` e.g., `MAR-DAD-003`, `FES-MER-009`

### Special Blocks
- `ARRIVAL_STANDARD` - Arrival day content
- `DEPARTURE_STANDARD` - Departure day content
- `STAY_MERZOUGA` - Full day in Merzouga
- `STAY_FES` - Full day in Fes
- `STAY_MARRAKECH` - Full day in Marrakech
- `STAY_ESSAOUIRA` - Full day in Essaouira
- `STAY_CHEFCHAOUEN` - Full day in Chefchaouen

### Override Description
If `override_description` is set in Tour_Itinerary, it replaces the Content_Library description.

## Adding New Routes

When a tour needs a route that doesn't exist:

1. **Add to Slow Morocco's Content_Library tab**
   - Use consistent Route_ID format
   - Include: Image_URL_1, From_City, To_City
   - Include: Travel_Time_Hours, Activities, Difficulty_Level
   - Include: Route_Description, Route_Narrative

2. **Reference in Fab Morocco Tour_Itinerary**
   - The route is now available for ANY tour

## Benefits

- **Single source of truth** - Update once, both sites get it
- **No duplication** - Same route content reused across tours
- **Easy maintenance** - Route narratives centralized
- **Consistent quality** - All routes follow same structure
- **Scalable** - Add new routes to warehouse, available everywhere

## Current Route Coverage

**Existing in Slow Morocco: 151 routes**
**Routes needed for Fab Morocco 17 tours: 34 unique**
**Already covered: 18**
**New routes to add: 16**

See `Content_Library_Add` tab in Excel export.

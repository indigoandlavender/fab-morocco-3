# Midjourney Prompts: Boutique Collection & Home Page

## BOUTIQUE LANDING PAGE (/tours/boutique)

### boutique-hero.jpg (Hero image)
```
Ultra photorealistic. National Geographic style. Cinematic. Marrakech riad interior courtyard morning light, zellige tile fountain, orange tree in center, brass lanterns, carved plaster walls, soft dappled light through latticework, Morocco, documentary editorial photography, luminous color, soft natural light, open shadows, low contrast, true color, quiet composition, negative space, film photography look, medium format camera, 35mm lens, f/4 --style raw --s 70 --ar 16:9
```

### boutique-philosophy.jpg (Philosophy section - light through screen)
```
Ultra photorealistic. National Geographic style. Cinematic. Morning light filtering through carved Moroccan plaster screen (moucharabieh), geometric shadow patterns on white wall, brass tea tray visible in corner, soft ethereal atmosphere, Morocco riad interior, documentary editorial photography, luminous color, soft natural light, open shadows, low contrast, true color, quiet composition, negative space, film photography look, medium format camera, 50mm lens, f/2.8 --style raw --s 70 --ar 1:1
```

### boutique-souks-style.jpg (Tour card - Souks & Style)
```
Ultra photorealistic. National Geographic style. Cinematic. Marrakech rooftop terrace breakfast scene, brass tea service, fresh orange juice, pastries, white tablecloth, view of medina rooftops and minarets in soft morning haze, potted plants, Morocco, documentary editorial photography, luminous color, soft natural light, open shadows, low contrast, true color, quiet composition, negative space, film photography look, medium format camera, 50mm lens, f/4 --style raw --s 70 --ar 4:5
```

### boutique-desert-design.jpg (Tour card - Desert & Design)
```
Ultra photorealistic. National Geographic style. Cinematic. Luxury Sahara desert tent interior at golden hour, Berber textiles and rugs, brass lanterns casting warm light, opening showing orange sand dunes outside, soft shadows, Morocco, documentary editorial photography, luminous color, soft natural light, open shadows, low contrast, true color, quiet composition, negative space, film photography look, medium format camera, 35mm lens, f/4 --style raw --s 70 --ar 4:5
```

### boutique-agafay.jpg (Tour card - Agafay)
```
Ultra photorealistic. National Geographic style. Cinematic. Agafay desert luxury camp at sunset, white canvas tents on rocky moonscape, pink and gold light on barren hills, Atlas Mountains silhouette on distant horizon, swimming pool reflecting sky, Morocco, documentary editorial photography, luminous color, soft natural light, open shadows, low contrast, true color, quiet composition, negative space, film photography look, medium format camera, 50mm lens, f/4 --style raw --s 70 --ar 4:5
```

---

## HOME PAGE

### boutique-home.jpg (Boutique Collection section on home page)
```
Ultra photorealistic. National Geographic style. Cinematic. Moroccan riad courtyard from above, zellige tile floor in geometric pattern, small fountain, orange trees, brass lanterns, morning light creating soft shadows, cream and terracotta colors, Morocco, documentary editorial photography, luminous color, soft natural light, open shadows, low contrast, true color, quiet composition, negative space, film photography look, medium format camera, 50mm lens, f/4 --style raw --s 70 --ar 4:5
```

### edit-medina.jpg (The Edit section - medina story)
```
Ultra photorealistic. National Geographic style. Cinematic. Narrow Fes medina alley, shaft of sunlight cutting through shadow, donkey carrying goods in distance, ancient wooden doors, carved plaster walls, Morocco, documentary editorial photography, luminous color, soft natural light, open shadows, low contrast, true color, quiet composition, negative space, film photography look, medium format camera, 35mm lens, f/4 --style raw --s 70 --ar 4:3
```

### edit-food.jpg (The Edit section - food story)
```
Ultra photorealistic. National Geographic style. Cinematic. Moroccan breakfast spread from above, msemen flatbread, amlou, honey, fresh mint tea being poured, hand-painted ceramic plates, zellige table, soft morning light, Morocco, documentary editorial photography, luminous color, soft natural light, open shadows, low contrast, true color, quiet composition, negative space, film photography look, medium format camera, 50mm lens, f/2.8 --style raw --s 70 --ar 4:3
```

### edit-desert.jpg (The Edit section - desert story)
```
Ultra photorealistic. National Geographic style. Cinematic. Sahara desert at blue hour, single figure in traditional clothing walking on dune ridge, footprints in sand, stars beginning to appear, Erg Chebbi Morocco, documentary editorial photography, luminous color, soft natural light, open shadows, low contrast, true color, quiet composition, negative space, film photography look, medium format camera, 85mm lens, f/2.8 --style raw --s 70 --ar 4:3
```

---

## SUMMARY TABLE

| Image Name | Location | Aspect Ratio |
|------------|----------|--------------|
| boutique-hero | /tours/boutique hero | 16:9 |
| boutique-philosophy | /tours/boutique philosophy section | 1:1 |
| boutique-souks-style | /tours/boutique tour card | 4:5 |
| boutique-desert-design | /tours/boutique tour card | 4:5 |
| boutique-agafay | /tours/boutique tour card | 4:5 |
| boutique-home | Home page boutique section | 4:5 |
| edit-medina | Home page The Edit section | 4:3 |
| edit-food | Home page The Edit section | 4:3 |
| edit-desert | Home page The Edit section | 4:3 |

---

## CLOUDINARY UPLOAD

After generating, upload to Cloudinary and update URLs in:
1. `/app/tours/boutique/page.tsx` - all boutique images
2. `/app/page.tsx` - boutique-home, edit-medina, edit-food, edit-desert

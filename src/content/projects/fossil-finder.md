---
title: "Fossil Finder"
description: "An interactive 3D globe for exploring millions of fossil records across Earth's history. Search by species, filter by era, and discover ancient life."
longDescription: "Fossil Finder is an interactive paleontology explorer built on a 3D Mapbox globe. It connects to the Paleobiology Database to surface millions of fossil occurrence records, letting you search by species, filter by geological period or taxon, and dive into detailed taxonomy and ecological data for each find. Wikipedia integration provides species summaries and reconstruction images, and a favourites system lets you save specimens for later."
label: "Web Application"
year: 2026
tech: ["JavaScript", "React", "Mapbox GL", "Vite", "Paleobiology Database API", "Wikipedia API", "Docker"]
featured: true
image: "/fossilfinder-screenshot.png"
liveUrl: "https://fossilfinder.tyrion.uk"
githubUrl: ""
order: 2
---

## The Problem

Fossil data is out there — millions of records in scientific databases — but it's locked behind clunky academic interfaces that weren't built for exploration. I'm obsessed with dinosaurs and fossils, and I wanted a way to actually *explore* ancient life: spin a globe, tap a time period, and see what lived there 200 million years ago.

## The Approach

I built an interactive 3D globe using Mapbox GL with a cinematic space atmosphere, pulling real fossil data from the Paleobiology Database. The app clusters fossil markers at wide zoom levels and reveals individual specimens as you zoom in. A geological timeline slider spans 541 million years from the Cambrian to present day, colour-coded by era. Each fossil links to detailed taxonomy, ecological lifestyle data, and Wikipedia summaries with reconstruction images — turning dry database records into something you actually want to explore.

---
title: "Fossil Finder"
description: "An interactive 3D globe for exploring millions of fossil records across Earth's history. Search by species, filter by geological era, and discover ancient life."
longDescription: "Fossil Finder is an interactive paleontology explorer built on a 3D Mapbox globe. It pulls from the Paleobiology Database to let you search by species, filter by geological period or creature type, and explore detailed taxonomy and ecological data for each find. There's also Wikipedia integration for species summaries and reconstruction images, plus a favourites system so you can save the ones you love."
label: "Web Application"
year: 2026
tech: ["JavaScript", "React", "Mapbox GL", "Vite", "Paleobiology Database API", "Wikipedia API", "Docker"]
featured: true
image: "/fossilfinder-screenshot.png"
liveUrl: "https://fossil-finder.tyrion.uk/"
githubUrl: ""
order: 2
---

## The Problem

There are millions of fossil records sitting in scientific databases, but they're buried behind academic interfaces that weren't really built for curious people to explore. I've always been fascinated by dinosaurs and ancient life, and I wanted a way to actually discover it. Spin a globe, pick a time period, and see what was living there 200 million years ago.

## The Approach

I built a 3D globe using Mapbox GL with a cinematic space atmosphere that pulls real fossil data from the Paleobiology Database. At wide zoom levels the app clusters fossil markers together, then reveals individual specimens as you zoom in. There's a geological timeline slider that spans 541 million years from the Cambrian to present day, colour-coded by era. Each fossil links through to detailed taxonomy, ecological lifestyle data, and Wikipedia summaries with reconstruction images. The goal was to take dry database records and turn them into something you actually want to spend time exploring.

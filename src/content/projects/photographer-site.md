---
title: "Photographer Portfolio"
description: "A portfolio site for a photographer, with swipeable slideshows, a shuffling polaroid wall, and a CMS the photographer runs on their own."
longDescription: "Client work: a portfolio site for a photographer who wanted something minimal that lets the photos do the talking, and that they could keep up to date themselves without calling me. The screenshots here use placeholder images to keep the client's work and name private."
label: "Client Website"
year: 2026
tech: ["Astro", "React", "TypeScript", "Framer Motion", "Sanity CMS", "Cloudflare Workers", "Resend"]
featured: true
image: "../../assets/projects/photographer-home.png"
gallery:
  - src: "../../assets/projects/photographer-slideshow.png"
    alt: "A shoot page with its slideshow and previous and next controls"
  - src: "../../assets/projects/photographer-mobile.png"
    alt: "The slideshow on a phone"
order: 2
---

## The brief

The photographer wanted a site that felt quiet and editorial, where the photos are the whole point. It also had to be something they could update on their own. Adding a new shoot shouldn't mean messaging a developer, and it shouldn't cost a monthly fee either.

## The approach

The home page is a list of shoots. Hover one and its cover photo fills the screen. With nothing hovered, a wall of polaroids quietly swaps photos in and out. I rebuilt that effect frame by frame from a reference the client loved, and it waits for each new photo to load before swapping, so nothing ever flashes in half-loaded.

Each shoot opens as a slideshow that works like Instagram on a phone. The photo follows your finger, snaps to the next one past a small threshold or on a quick flick, and the frame eases into the shape of the next photo. iOS Safari kept cancelling the swipe partway through, which took some digging to fix. The headings unscramble letter by letter as they appear, without shifting the page and while still reading properly to screen readers.

## Behind the scenes

The content lives in Sanity, so the photographer edits shoots, photos and the about page in a simple dashboard, and I wrote them a plain-English guide to go with it. When they hit publish, a webhook rebuilds the site on Cloudflare, and the photos are served from Sanity's image CDN in the right size for each screen. The contact form sends email through a small Cloudflare Worker and Resend. It keeps spam out without a captcha, using a hidden field, a minimum time on the page and a per-visitor rate limit. It all runs on free plans.

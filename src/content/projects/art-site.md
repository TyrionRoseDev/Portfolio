---
title: "The Weekend Painter"
description: "A calm, phone-first website for a painter to show and sell original acrylic paintings, with sales handled through Etsy."
longDescription: "A portfolio and shop front for a painter who works in acrylics. Paintings are grouped into albums, every piece has its own page with its size, price and a link to buy it on Etsy, and the contact page is written like a postcard. It's built to cost nothing to run."
label: "Website"
year: 2026
tech: ["Astro", "TypeScript", "Cloudflare Workers", "Sharp"]
featured: true
status: "in-progress"
image: "../../assets/projects/art-cover.jpg"
gallery:
  - src: "../../assets/projects/art-painting.jpg"
    alt: "A painting's page, with its description, Etsy button and details"
  - src: "../../assets/projects/art-mobile.jpg"
    alt: "The home page on a phone, with the sunflower painting filling the screen"
  - src: "../../assets/projects/art-album.jpg"
    alt: "The Water album, with two paintings and their prices"
order: 3
---

## The brief

The painter needed somewhere to point people that felt more personal than an Etsy listing, but without the cost and admin of running a real online shop. It had to look good on a phone, because that's where most people find it, and it had to let the paintings be the star.

## The research

I did a lot of reading before building anything. I looked at twenty other artists' sites, compared how much the painter would actually take home from each sale on Etsy against taking payments through Stripe, and worked through UK rules on selling online, shipping costs by painting size, and print production. Etsy came out on top, so each painting links to its listing, and there's an "ask me about this painting" link that opens an email with the painting already named.

## The approach

The home page opens on a painting filling the whole screen, with the name set over it in a soft serif. Paintings are grouped into albums like Water and Flowers, and every piece gets its own page with the details, the price, and delivery worked out from its size. The contact page is a fill-in-the-blanks letter on a postcard that opens your email app with everything written out. Some of the paintings are fan art, so there's a check that keeps brand names out of page addresses and file names. The site is designed for phones first and checked at 390px wide on every page.

## Where it's up to

The main pages are built and the real paintings are in, with their sizes, prices and Etsy links. Next up are close-ups of the brushwork, a full-screen viewer, and an "on the wall" preview that shows each painting's real size next to a sofa, so you can picture it at home.

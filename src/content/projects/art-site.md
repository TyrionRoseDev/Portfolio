---
title: "Artist Website"
description: "A calm, phone-first site for a painter to show and sell original paintings and prints, with sales handled through Etsy."
longDescription: "A portfolio and shop front for a painter who works in acrylics. It shows the paintings in albums, gives every piece its own page with sizes, prices and close-ups, and links out to Etsy to buy. It's built to cost nothing to run, and the painter will be able to add new work from their phone."
label: "Website"
year: 2026
tech: ["Astro", "TypeScript", "Cloudflare Workers", "Sharp"]
featured: false
status: "in-progress"
image: "../../assets/projects/art-albums.png"
gallery:
  - src: "../../assets/projects/art-painting.png"
    alt: "A painting's page, with buying options, close-ups and a preview of its size on a wall"
order: 5
---

## The brief

The painter needed somewhere to point people that felt more personal than an Etsy listing, but without the cost and admin of running a real online shop. They also wanted to add new paintings from their phone, straight after taking the photos.

## The research

I did a lot of reading before building anything. I looked at twenty other artists' sites, compared how much the painter would actually take home from each sale on Etsy against running payments through Stripe, and worked through UK rules on selling online, shipping costs by painting size, and print production. Etsy came out on top, so each painting links to its listing, and there's an "ask me about this painting" link that opens an email with the painting already named.

## The approach

Every painting gets its own page with close-up crops, the details, and a little "on the wall" picture that shows its real size next to a sofa, so you can picture it at home. Shipping bands are worked out from the painting's size. The contact page is a fill-in-the-blanks letter on a postcard that opens your email app with everything written out. The site is designed for phones first and is checked at 390px wide on every page. I explored several visual directions before settling on this soft blue and gold one. Next up is a simple editor so new paintings can go up straight from a phone.

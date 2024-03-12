---
en:
  title: Dynamic Fields
  sections:
    - name: Text
      dynamicField:
        - type: text
          dfText: This is a text field
        - type: text
          dfText: This is another text field
      dfSettings:
        size: small
        background: light
    - name: image
      dynamicField:
        - type: image
          image: /cld-sample-2.jpg
      dfSettings:
        size: large
        background: dark
    - name: carousel
      dynamicField:
        - type: images
          images:
            - /cld-sample-5.jpg
            - /cld-sample-2.jpg
            - /cld-sample-3.jpg
            - /cld-sample.jpg
          displayType: carousel
      dfSettings:
        size: large
        background: dark
    - name: lightbox
      dynamicField:
        - type: images
          images:
            - /cld-sample-5.jpg
            - /cld-sample-2.jpg
            - /cld-sample-3.jpg
            - /cld-sample.jpg
          displayType: lightbox
      dfSettings:
        size: large
        background: dark
    - name: video
      dynamicField:
        - type: video
          video: /sea-turtle.mp4
          autoplay: true
          muted: true
          loop: true
      dfSettings:
        size: large
        background: light
  SEOmetaData:
    metaTitle: Dynamic Fields
    metaDescription: These are an example of dynamic fields in Decap CMS
    metaImage: /cld-sample.jpg
    keywords: Nuxt, Decap, CMS, page building, dynamic fields
nl:
  title: Dynamic Fields
  sections:
    - name: Text
      dynamicField:
        - type: text
          dfText: Dit is een tekst veld
        - type: text
          dfText: Dit is nog een tekst veld
      dfSettings:
        size: small
        background: light
    - name: image
      dynamicField:
        - type: image
          image: /cld-sample-2.jpg
      dfSettings:
        size: large
        background: dark
    - name: carousel
      dynamicField:
        - type: images
          images:
            - /cld-sample-5.jpg
            - /cld-sample-2.jpg
            - /cld-sample-3.jpg
            - /cld-sample.jpg
          displayType: carousel
      dfSettings:
        size: large
        background: dark
    - name: lightbox
      dynamicField:
        - type: images
          images:
            - /cld-sample-5.jpg
            - /cld-sample-2.jpg
            - /cld-sample-3.jpg
            - /cld-sample.jpg
          displayType: lightbox
      dfSettings:
        size: large
        background: dark
    - name: video
      dynamicField:
        - type: video
          image: /sea-turtle.mp4
      dfSettings:
        size: large
        background: light
  SEOmetaData:
    metaTitle: Dynamic Fields
    metaDescription: Dit is een voorbeeld van dynamic fields in Decap CMS
    metaImage: /cld-sample.jpg
    keywords: Nuxt, Decap, CMS, page building, dynamic fields
---

# RMKV Interactive Saree Customization — Master Prompt

## Objective

Create a **real-time customizable traditional South Indian silk saree rendering system** based on the provided reference saree.

The saree must be generated **layer by layer**, not as a single flattened image, so that customers can customize individual sections such as:

- Base color
- Body motif / butti / dot pattern
- Motif color
- Left border
- Right border
- Border color
- Separator stripes
- Pallu ornamental bands
- Pallu center texture
- Pallu colors
- Zari tone
- Pattern scale
- Pattern spacing
- Pattern density

The final render must be suitable for:

- Website-based customization
- Live rendering
- Admin control
- Projection mapping through MadMapper
- Real-time customer interaction

The overall structure, proportions, richness, and traditional visual character should remain inspired by the reference saree.

---

# 1. Core Visual Direction

Create a premium silk saree renderer with a fixed traditional layout and modular customizable layers.

The default saree should be inspired by the reference:

- Deep traditional red/crimson body
- Small gold butti motifs
- Symmetrical gold zari side borders
- Thin horizontal gold separator stripes
- Rich lower pallu section
- Ornamental gold bands
- Dense woven-style zari central pallu area
- Red finishing section at the bottom

The result should feel like a **premium woven silk saree**, not a flat digital poster.

---

# 2. Saree Structure

The saree should be divided into the following logical areas.

## Main Body

The large upper section of the saree.

It should contain:

1. Base body color
2. Repeating motif layer
3. Optional cloth texture / sheen
4. Optional subtle fabric shading

The body must remain the largest visual area.

The motifs should be evenly distributed and should not feel overcrowded.

---

## Left Side Border

A separate vertical border layer on the left side.

It should support:

- Border design selection
- Border color
- Zari color
- Border width
- Pattern scale
- Pattern repeat

---

## Right Side Border

A separate vertical border layer on the right side.

By default it can match the left border, but the system should allow it to be controlled independently if required.

---

## Separator Stripe Area

Thin horizontal zari stripes separating the body from the pallu.

Controls should include:

- Number of stripes
- Stripe thickness
- Stripe spacing
- Stripe color
- Zari tone

---

## Pallu Top Ornamental Band

A rich decorative band placed above the main pallu area.

Possible design styles:

- Floral
- Peacock
- Elephant
- Temple
- Traditional geometric
- Heritage zari

---

## Pallu Central Fill

The main large zari-filled section.

Possible fill patterns:

- Diamond lattice
- Fine zari grid
- Geometric weave
- Floral lattice
- Plain metallic zari
- Traditional woven texture

---

## Pallu Bottom Ornamental Band

A second rich ornamental band near the lower section.

This can:

- Match the upper ornamental band
- Use a complementary pattern
- Use a completely different pattern

---

## Bottom Finishing Edge

The final lower edge.

Possible options:

- Base saree color
- Thin zari line
- Decorative finish
- Contrast color

---

# 3. Required Layer Stack

Render the saree from back to front using this exact conceptual order:

```text
Layer 01 — Background / Transparent Canvas
Layer 02 — Saree Silhouette / Base Shape
Layer 03 — Body Base Color
Layer 04 — Body Cloth Texture / Subtle Sheen
Layer 05 — Body Motif / Butti Layer
Layer 06 — Left Border
Layer 07 — Right Border
Layer 08 — Separator Stripes
Layer 09 — Pallu Top Ornamental Band
Layer 10 — Pallu Central Fill
Layer 11 — Pallu Bottom Ornamental Band
Layer 12 — Bottom Finishing Edge
Layer 13 — Optional Global Cloth Shading
Layer 14 — Optional Highlight / Projection Compensation Layer
```

Every decorative layer must remain independent.

Changing one layer must not destroy or regenerate unrelated layers.

---

# 4. Body Base Color

The main body must begin with a solid customizable base color.

Examples:

- Crimson
- Maroon
- Emerald
- Royal Blue
- Navy
- Purple
- Mustard
- Orange
- Magenta
- Teal

The system should also support custom HEX / RGB colors from the admin panel.

Example:

```json
{
  "baseColor": "#B3203C"
}
```

---

# 5. Body Motif Layer

Place the repeating motif above the base body color.

The default reference motif should resemble a small traditional gold butti.

Supported motif categories may include:

- Butti dot
- Mango
- Peacock
- Lotus
- Chakra
- Floral
- Diamond
- Star
- Traditional geometric
- Minimal dot

Motifs must be rendered independently from the body color.

---

## Motif Controls

Support:

```text
Motif Type
Motif Color
Motif Size
Motif Spacing X
Motif Spacing Y
Motif Offset X
Motif Offset Y
Motif Rotation
Motif Density
Motif Arrangement
```

Possible arrangements:

```text
Grid
Staggered Grid
Diagonal
Alternate Row
Sparse
Dense
```

The motif layer must always remain clipped inside the body mask.

It must never overlap:

- Side borders
- Pallu
- Outside saree boundaries

---

# 6. Side Border System

Treat the left and right borders as independent reusable layers.

Each border should support:

```text
Design
Width
Base Color
Zari Color
Pattern Scale
Pattern Repeat
Opacity
```

Possible border styles:

- Temple
- Floral
- Peacock
- Elephant
- Geometric
- Zari classic
- Minimal
- Heritage

The default reference style should be a rich traditional gold zari border.

---

# 7. Separator Stripe System

Above the pallu, add thin horizontal stripes.

Support:

```text
Stripe Count
Stripe Thickness
Stripe Gap
Stripe Color
Stripe Style
```

Example:

```json
{
  "lineCount": 3,
  "lineColor": "#D4AF37",
  "lineThickness": 2,
  "lineGap": 6
}
```

---

# 8. Pallu System

The pallu must be treated as multiple separate customizable layers.

Do not create the pallu as one single image.

Structure:

```text
Pallu
├── Top Ornamental Band
├── Main Central Fill
├── Bottom Ornamental Band
└── Bottom Finish
```

---

## Pallu Top Band

Allow designs such as:

- Elephant sequence
- Peacock sequence
- Floral vine
- Temple motif
- Geometric zari
- Traditional heritage ornament

---

## Pallu Center Fill

Allow:

- Diamond lattice
- Cross hatch
- Fine zari grid
- Floral weave
- Plain metallic zari
- Repeated geometric pattern

---

## Pallu Bottom Band

Allow independent selection from the top band.

---

## Pallu Controls

```text
Pallu Height
Top Band Height
Center Fill Height
Bottom Band Height
Pallu Color
Zari Color
Pattern Scale
Pattern Density
Pattern Selection
```

---

# 9. Suggested Default Proportions

Use responsive percentages instead of fixed pixel values where possible.

Suggested starting proportions:

```text
Left Border Width:      5%
Right Border Width:     5%

Main Body Height:       60–68%

Separator Area:         2–4%

Pallu Total Height:     28–35%
```

Within the pallu:

```text
Top Ornamental Band:    20%
Central Fill:           55–60%
Bottom Ornamental Band: 20%
Bottom Finish:          Remaining space
```

These values should be editable through the admin configuration if necessary.

---

# 10. Mask System

Create reusable masks for:

```text
body-mask
left-border-mask
right-border-mask
separator-mask
pallu-top-mask
pallu-center-mask
pallu-bottom-mask
bottom-finish-mask
```

Every layer must render only inside its assigned mask.

Example:

```text
Body Color
    ↓
BODY MASK
    ↓
Body Motif
    ↓
BODY MASK
```

This prevents decorative assets from leaking into other sections.

---

# 11. Asset Strategy

Do **not** store hundreds of completed saree images.

Instead maintain reusable design assets.

Recommended structure:

```text
/assets

  /motifs
    butti-01.svg
    mango-01.svg
    peacock-01.svg
    lotus-01.svg

  /borders
    temple-01.png
    zari-01.png
    floral-01.png
    peacock-01.png

  /pallu
    /top
      elephant-01.png
      floral-01.png

    /center
      diamond-grid-01.png
      zari-grid-01.png

    /bottom
      elephant-01.png
      floral-01.png

  /textures
    silk-subtle.png
    zari-grain.png

  /masks
    body.png
    left-border.png
    right-border.png
    pallu-top.png
    pallu-center.png
    pallu-bottom.png
```

Prefer:

- SVG for scalable motifs
- Transparent PNG for complex ornamentation
- Grayscale / monochrome assets for dynamic recoloring

---

# 12. Dynamic Colorization

Where possible, store artwork in monochrome form and apply colors programmatically.

For example, do not create:

```text
gold-mango.png
green-mango.png
red-mango.png
silver-mango.png
```

Instead use:

```text
mango.svg
```

Then apply:

```text
Motif Color = Gold
Motif Color = Silver
Motif Color = Green
Motif Color = Red
```

This keeps the design system scalable.

---

# 13. Customer Customization UI

The customer-facing interface should remain simple.

Do not expose technical rendering controls.

Example interface:

```text
DESIGN YOUR SAREE

BODY COLOR
[ Maroon ] [ Emerald ] [ Blue ] [ Purple ]

BODY DESIGN
[ Butti ] [ Mango ] [ Peacock ] [ Floral ]

MOTIF COLOR
[ Gold ] [ Silver ] [ Contrast ]

BORDER
[ Temple ] [ Floral ] [ Peacock ] [ Classic ]

BORDER COLOR
[ Gold ] [ Silver ] [ Contrast ]

PALLU
[ Heritage ] [ Peacock ] [ Floral ] [ Geometric ]

[ RESET ]
[ VIEW MY SAREE ]
```

Changes should reflect instantly.

There should be no "Apply" button for every option.

---

# 14. Admin Panel

Create an admin interface for RMKV staff or event operators.

Recommended route:

```text
/admin
```

Admin capabilities:

- Add new motif
- Add new border
- Add new pallu
- Add new color
- Disable a design
- Enable a design
- Create preset sarees
- Reorder customer options
- Set default saree
- Configure motif scale
- Configure motif spacing
- Configure border width
- Configure pallu proportions

---

## Admin Live Controls

Also provide:

```text
RESET SESSION
FORCE WHITE
BLACKOUT
SHOW BODY
SHOW LEFT BORDER
SHOW RIGHT BORDER
SHOW PALLU
TEST GRID
DEBUG COLORS
RETURN TO CUSTOMER MODE
```

---

# 15. Live Output

Create a dedicated clean rendering page.

Recommended route:

```text
/live
```

The `/live` page must contain:

- No navigation
- No buttons
- No cursor
- No text labels
- No admin UI
- No browser controls
- No unnecessary branding

It should contain only the generated visual required for projection mapping.

---

# 16. Live Texture Atlas Mode

In addition to a flattened saree preview, support a projection-friendly **texture atlas**.

Example:

```text
┌──────────────────────────────┬──────────────┐
│                              │              │
│                              │              │
│            BODY              │    PALLU     │
│                              │              │
│                              │              │
├──────────────────────────────┴──────────────┤
│                                             │
│                  BORDER                     │
│                                             │
└─────────────────────────────────────────────┘
```

MadMapper can then map each region independently.

Possible zones:

```text
BODY
LEFT BORDER
RIGHT BORDER
PALLU
OPTIONAL DECORATIVE BAND
```

---

# 17. Rendering Modes

Provide two output modes.

## Mode A — Complete Saree

Render the entire saree as one complete composition.

Use for:

- Website preview
- Saved customer design
- QR preview
- Screenshot
- Marketing output

---

## Mode B — Projection Texture Atlas

Render each projection area in a fixed region.

Use for:

- MadMapper
- Projection calibration
- Live mapping

---

# 18. Real-Time State

Maintain one central saree state.

Example:

```json
{
  "body": {
    "baseColor": "#B3203C",
    "motifType": "gold_butti_dot",
    "motifColor": "#D4AF37",
    "motifSize": 18,
    "motifSpacingX": 120,
    "motifSpacingY": 100,
    "motifOffsetX": 0,
    "motifOffsetY": 0,
    "motifRotation": 0,
    "motifDensity": 1
  },

  "leftBorder": {
    "design": "traditional_zari_floral",
    "color": "#D4AF37",
    "width": 0.05
  },

  "rightBorder": {
    "design": "traditional_zari_floral",
    "color": "#D4AF37",
    "width": 0.05
  },

  "separator": {
    "lineCount": 3,
    "lineColor": "#D4AF37",
    "lineThickness": 2,
    "lineGap": 6
  },

  "pallu": {
    "topBandDesign": "ornamental_elephant_floral",
    "topBandColor": "#D4AF37",

    "centerFillType": "diamond_zari_grid",
    "centerFillColor": "#E0BE62",

    "bottomBandDesign": "ornamental_elephant_floral",
    "bottomBandColor": "#D4AF37",

    "height": 0.32
  },

  "finish": {
    "bottomEdgeColor": "#B3203C",
    "clothSheen": 0.2
  }
}
```

All pages must use this same state.

---

# 19. Real-Time Update Behaviour

Whenever a customer changes something:

```text
Customer Selection
        ↓
Update Saree State
        ↓
Update Website Preview
        ↓
Send State Through WebSocket
        ↓
Update /live Renderer
        ↓
Projection Source Changes
        ↓
MadMapper Receives New Pixels
        ↓
Projected Saree Changes
```

Only the affected layer should update.

Example:

```text
Customer changes body color
```

Update:

```text
Body Base Layer
```

Do not regenerate:

```text
Border
Pallu
Motif asset
Other unrelated sections
```

---

# 20. Debug / Calibration Mode

Include a special projection calibration mode.

Possible debug output:

```text
BODY          = RED
LEFT BORDER   = GREEN
RIGHT BORDER  = YELLOW
PALLU         = BLUE
SEPARATOR     = MAGENTA
```

Also include:

```text
Grid Overlay
Center Crosshair
Corner Numbers
Section Outlines
Safe Area
UV Guides
```

This is used only during setup and calibration.

---

# 21. Projection Requirements

The rendered output must:

- Maintain a fixed resolution
- Maintain a fixed aspect ratio
- Never shift layout unexpectedly
- Never change canvas dimensions during runtime
- Never show browser UI
- Never reload during normal customer interaction
- React instantly to customization changes

Suggested initial output:

```text
1920 × 1080
```

or:

```text
3840 × 2160
```

depending on the projector and MadMapper workflow.

---

# 22. Cloth Realism

For the customer preview, optionally include:

- Subtle silk texture
- Fine highlights
- Mild cloth grain
- Slight sheen
- Gentle fold shading

However, for projection output, provide the ability to reduce or disable fake cloth folds because the real white fabric already has physical folds.

Create a setting such as:

```text
Preview Cloth Shading: ON
Projection Cloth Shading: OFF
```

---

# 23. Projection Color Compensation

Provide optional controls for:

```text
Brightness
Contrast
Saturation
Gamma
Warmth
Zari Intensity
Black Level
```

These are useful because projected colors will not look exactly like screen colors.

Do not change the customer's actual saved color values.

Apply compensation only in projection output.

---

# 24. Saree Presets

Support predefined saree combinations.

Examples:

```text
Traditional Red
Royal Maroon
Emerald Heritage
Blue Peacock
Wedding Gold
Minimal Contemporary
Temple Classic
```

A customer can choose a preset first and customize from there.

Example preset:

```json
{
  "name": "Traditional Red",
  "bodyColor": "#B3203C",
  "motif": "butti-01",
  "motifColor": "#D4AF37",
  "border": "traditional-zari-01",
  "borderColor": "#D4AF37",
  "pallu": "heritage-01"
}
```

---

# 25. Performance Requirements

The renderer must:

- Run smoothly in real time
- Avoid full-page reloads
- Preload required assets
- Cache pattern assets
- Update only changed layers
- Avoid unnecessary network requests
- Maintain stable frame output

Target customer interaction response:

```text
Immediate / visually instantaneous
```

---

# 26. Suggested Technical Stack

Recommended implementation:

```text
Frontend:
Next.js
React
TypeScript

Rendering:
Canvas / WebGL
Preferably PixiJS for 2D compositing

Real-Time Sync:
WebSocket / Socket.IO

Local State:
Zustand / Context / Redux Toolkit

Admin Data:
JSON initially
SQLite / PostgreSQL later if needed

Projection:
Live browser render
    ↓
OBS / Spout
    ↓
MadMapper
    ↓
Projector
```

TouchDesigner is **not required** for this architecture.

---

# 27. Suggested Application Routes

```text
/customer
```

Customer customization UI.

```text
/admin
```

Admin and event control panel.

```text
/live
```

Clean projection texture output.

```text
/preview
```

Full saree visual preview.

```text
/debug
```

Projection calibration and testing.

---

# 28. Suggested Project Structure

```text
rmkv-saree-project/

├── app/
│   ├── customer/
│   ├── admin/
│   ├── live/
│   ├── preview/
│   └── debug/
│
├── components/
│   ├── configurator/
│   ├── renderer/
│   ├── admin/
│   └── common/
│
├── renderer/
│   ├── body.ts
│   ├── motifs.ts
│   ├── borders.ts
│   ├── separator.ts
│   ├── pallu.ts
│   ├── masks.ts
│   └── composite.ts
│
├── assets/
│   ├── motifs/
│   ├── borders/
│   ├── pallu/
│   ├── textures/
│   └── masks/
│
├── config/
│   ├── colors.json
│   ├── motifs.json
│   ├── borders.json
│   ├── pallu.json
│   └── presets.json
│
├── lib/
│   ├── socket.ts
│   ├── state.ts
│   └── projection.ts
│
└── server/
    └── websocket/
```

---

# 29. Final User Experience

The live experience should feel like:

```text
Customer approaches display
        ↓
Selects body color
        ↓
Physical saree color changes
        ↓
Selects motif
        ↓
Motifs appear
        ↓
Selects border
        ↓
Border changes
        ↓
Selects pallu
        ↓
Pallu changes
        ↓
Customer sees final customized saree
        ↓
Optional Save / QR / Share
        ↓
Reset for next customer
```

---

# 30. Final Requirement

Build the system as a **modular saree design engine**, not as a gallery of pre-rendered saree images.

The system must allow a traditional silk saree to be constructed dynamically from independent layers while preserving the reference saree's overall composition.

The most important principles are:

```text
FIXED LAYOUT
+
INDEPENDENT LAYERS
+
MASKED REGIONS
+
REUSABLE ASSETS
+
DYNAMIC COLORS
+
REAL-TIME STATE
+
LIVE PROJECTION OUTPUT
```

The final result should feel visually premium, technically stable, easy for customers to use, and easy for RMKV staff to expand with new patterns in the future.

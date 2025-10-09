# Kustra Color System

This document defines the official Kustra color palette and usage guidelines. **Always reference this file when working with colors in the application.**

---

## 🎨 Color Palette

### Primary Colors

#### 🔷 Primary – Calm Blue
**Hex:** `#778DB0`

**Usage:**
- Primary buttons (e.g., "Save", "Create", "Continue")
- Important icons and symbols in navigation
- Active menu items and CTA elements
- Selected states in toolbars and interfaces
- Focus rings on interactive elements

**Feeling:** Calm, reliable, safe, and professional.

**Tip:** Use as the dominant accent on light backgrounds.

---

#### 🩵 Primary Light – Mist Blue
**Hex:** `#AFC2D9`

**Usage:**
- Hover effects for primary buttons
- Background on cards, information fields, or modals
- Subtle illustrations and graphic surfaces
- Secondary avatars

**Feeling:** Light and airy, softens the app's expression.

---

#### 🔵 Primary Dark – Deep Slate
**Hex:** `#5C6E8B`

**Usage:**
- Headings, titles, or dark sections in navigation
- Text or icons on top of light surfaces
- Active link color against white background

**Feeling:** Deep, contrast, and seriousness.

---

### Neutral Colors

#### ⚪️ Background – Cloud White
**Hex:** `#F9FAFB`

**Usage:**
- Main app background (dashboard, cards, sections)
- Modal and card backgrounds
- Sections that need to feel clean and professional

**Feeling:** Fresh, neutral, and airy.

---

#### ⚫️ Text – Charcoal Gray
**Hex:** `#2E2E2E`

**Usage:**
- Headings, primary body text, labels
- High contrast against light backgrounds

**Feeling:** Clear but not harsh – perfect for UX texts.

**Implementation:**
- Replace `text-gray-900` with `text-[#2E2E2E]`
- Use for all primary text content

---

#### 🩶 Secondary Text – Slate Gray
**Hex:** `#8A8A8A`

**Usage:**
- Secondary text (metadata, dates, subtitles)
- Icons in "inactive" state
- Placeholder text in input fields

**Feeling:** Modern, subtle, and balanced.

**Implementation:**
- Replace `text-gray-500`, `text-gray-600` with `text-[#8A8A8A]`
- Use for all secondary/supporting text

---

### Accent Colors

#### 🌿 Accent – Mint Insight
**Hex:** `#77BB92`

**Usage:**
- Positive statuses ("NPS +10", "CX Improving")
- Success messages ("Saved successfully")
- Diagrams or insight visualizations with positive results
- Resolved states

**Feeling:** Fresh, encouraging, and "insightful".

---

#### 🧡 Highlight – Bittersweet
**Hex:** `#ED6B5A`

**Usage:**
- Important CTAs that stand out (e.g., "Create new journey")
- Graphic highlights, marked areas
- Hover color for secondary buttons
- Warning states (not errors)

**Feeling:** Warmth and humanity as contrast to blue.

---

#### 🩸 Error – Deep Terracotta
**Hex:** `#C45A49`

**Usage:**
- Error messages, warnings
- Red text or icon for incorrect input
- "Destructive" buttons (e.g., "Delete", "Remove")
- Critical severity indicators

**Feeling:** Harmonious and clear without feeling harsh.

---

## 🧭 Color Principles in Kustra

### 1. **Primary First**
`#778DB0` should always be the color that signals action and guidance in the interface.

**Examples:**
- Primary buttons: `bg-[#778DB0] hover:bg-[#6a7fa0]`
- Selected states: `bg-[#778DB0] text-white`
- Focus rings: `ring-2 ring-[#778DB0]`

---

### 2. **Accents Balance**
Use Mint and Bittersweet for emotion and warmth.

**Examples:**
- Success: `text-[#77BB92] bg-[#77BB92]/10`
- Important CTA: `text-[#ED6B5A] hover:text-[#E5574A]`

---

### 3. **Neutrals Build Structure**
Cloud White + Charcoal Gray create clarity.

**Examples:**
- Backgrounds: `bg-[#F9FAFB]`
- Primary text: `text-[#2E2E2E]`
- Secondary text: `text-[#8A8A8A]`

---

### 4. **Few Contrasts**
Kustra should feel harmonious and never "flashy".

**Guidelines:**
- Use opacity for subtle variations: `/10`, `/30`, `/50`
- Smooth transitions: `transition-colors duration-200`
- Avoid bright, saturated colors

---

### 5. **Accessibility**
Always maintain at least 4.5:1 contrast between text and background.

**Verified Combinations:**
- ✅ `#2E2E2E` on `#F9FAFB` (Charcoal on Cloud White)
- ✅ `#C45A49` on `#FFFFFF` (Deep Terracotta on White)
- ✅ White text on `#778DB0` (White on Calm Blue)

---

## 📋 Quick Reference

### Tailwind Class Replacements

| Old Class | New Class | Color Name |
|-----------|-----------|------------|
| `text-gray-900` | `text-[#2E2E2E]` | Charcoal Gray |
| `text-gray-700` | `text-[#2E2E2E]` | Charcoal Gray |
| `text-gray-600` | `text-[#8A8A8A]` | Slate Gray |
| `text-gray-500` | `text-[#8A8A8A]` | Slate Gray |
| `text-gray-400` | `text-[#8A8A8A]` | Slate Gray |
| `bg-white` | `bg-[#F9FAFB]` | Cloud White |
| `bg-gray-50` | `bg-[#F9FAFB]` | Cloud White |
| `text-blue-600` | `text-[#778DB0]` | Calm Blue |
| `bg-blue-500` | `bg-[#778DB0]` | Calm Blue |
| `text-green-600` | `text-[#77BB92]` | Mint Insight |
| `text-red-600` | `text-[#C45A49]` | Deep Terracotta |

---

## 🎯 Common Patterns

### Primary Button
```tsx
className="px-4 py-2 bg-[#778DB0] hover:bg-[#6a7fa0] text-white rounded-lg transition-colors"
```

### Secondary Button
```tsx
className="px-4 py-2 border-2 border-[#778DB0] text-[#778DB0] hover:bg-[#778DB0]/10 rounded-lg transition-colors"
```

### Delete/Destructive Button
```tsx
className="px-4 py-2 text-[#C45A49] hover:bg-[#C45A49]/10 border border-[#C45A49]/30 rounded-lg transition-colors"
```

### Success Message
```tsx
className="px-3 py-2 bg-[#77BB92]/10 text-[#77BB92] border border-[#77BB92]/30 rounded-lg"
```

### Error Message
```tsx
className="px-3 py-2 bg-[#C45A49]/10 text-[#C45A49] border border-[#C45A49]/30 rounded-lg"
```

### Card Background
```tsx
className="bg-[#F9FAFB] border border-gray-200 rounded-xl p-4"
```

### Primary Text
```tsx
className="text-[#2E2E2E] font-semibold"
```

### Secondary Text
```tsx
className="text-[#8A8A8A] text-sm"
```

---

## 🚫 Do Not Use

These colors are **not** part of the Kustra brand palette:

- ❌ Bright reds (e.g., `#FF0000`, `red-500`)
- ❌ Bright blues (e.g., `#0000FF`, `blue-600`)
- ❌ Pure black (e.g., `#000000`, `black`)
- ❌ Pure white for backgrounds (use Cloud White `#F9FAFB` instead)
- ❌ Purple, pink, orange (except our specific accent colors)

---

## 📝 Notes

- When using opacity, prefer the `/10`, `/30`, `/50` pattern for consistency
- Always test color combinations for accessibility using tools like WebAIM Contrast Checker
- For hover states, darken colors by approximately 10-15% (e.g., `#778DB0` → `#6a7fa0`)
- Keep gradients subtle and within the same color family

---

**Last Updated:** 2025-10-09
**Maintained by:** Kustra Development Team

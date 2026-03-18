// @ts-nocheck
// Vendored from fiduswriter/mathml2omml under LGPL-3.0-or-later.
export function mglyph(element, targetParent, previousSibling, nextSibling, ancestors) {
  // No support in omml. Output alt text.
  if (element.attribs?.alt) {
    targetParent.children.push({
      type: 'text',
      data: element.attribs.alt
    })
  }
}

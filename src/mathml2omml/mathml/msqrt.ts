// @ts-nocheck
// Vendored from fiduswriter/mathml2omml under LGPL-3.0-or-later.
export function msqrt(element, targetParent, previousSibling, nextSibling, ancestors) {
  const targetElement = {
    name: 'm:e',
    type: 'tag',
    attribs: {},
    children: []
  }
  targetParent.children.push({
    name: 'm:rad',
    type: 'tag',
    attribs: {},
    children: [
      {
        name: 'm:radPr',
        type: 'tag',
        attribs: {},
        children: [
          {
            name: 'm:degHide',
            type: 'tag',
            attribs: {
              'm:val': 'on'
            },
            children: []
          }
        ]
      },
      {
        name: 'm:deg',
        type: 'tag',
        attribs: {},
        children: []
      },
      targetElement
    ]
  })
  return targetElement
}

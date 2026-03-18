// @ts-nocheck
// Vendored from fiduswriter/mathml2omml under LGPL-3.0-or-later.
export function mspace(element, targetParent, previousSibling, nextSibling, ancestors) {
  targetParent.children.push({
    name: 'm:r',
    type: 'tag',
    attribs: {},
    children: [
      {
        name: 'm:t',
        type: 'tag',
        attribs: {
          'xml:space': 'preserve'
        },
        children: [
          {
            type: 'text',
            data: ' '
          }
        ]
      }
    ]
  })
}

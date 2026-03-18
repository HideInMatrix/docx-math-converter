// @ts-nocheck
// Vendored from fiduswriter/mathml2omml under LGPL-3.0-or-later.
export function mrow(element, targetParent, previousSibling, nextSibling, ancestors) {
  if (previousSibling.isNary) {
    const targetSibling = targetParent.children[targetParent.children.length - 1]
    return targetSibling.children[targetSibling.children.length - 1]
  }
  // Ignore as default behavior
  return targetParent
}

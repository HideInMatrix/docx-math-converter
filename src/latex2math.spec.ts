import fs from 'fs';
import path from 'path';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { describe, test, expect } from 'vitest';
import { convertLatex2Math, mathJaxReady } from './latex2math';

async function createDocxFromLatex(latex: string, fileName: string) {
  await mathJaxReady();

  const mathObj = convertLatex2Math(latex);
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun("Docx Math Converter"),
            ],
          }),
          new Paragraph({
            children: [
              mathObj,
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const dirPath = path.resolve(process.cwd(), '.temp');

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(path.resolve(dirPath, fileName), buffer, { flag: 'w' });

  return buffer;
}

describe('convertLatex2Math', () => {
  test('createDocx', async () => {
    const buffer = await createDocxFromLatex(
      '\\lim_{x\\rightarrow\\infty}(1+\\frac{1}{x})^x=e',
      'latex2math.docx',
    );

    expect(buffer.length).toBeGreaterThan(0);
  });

  test('createDocx for hot formula', async () => {
    const buffer = await createDocxFromLatex(
      'hot(s,t)=\\log_{10}(\\max(|s|,1))+\\operatorname{sign}(s)\\cdot \\frac{t-t_0}{45000}',
      'latex2math-hot-formula.docx',
    );

    expect(buffer.length).toBeGreaterThan(0);
  });
});

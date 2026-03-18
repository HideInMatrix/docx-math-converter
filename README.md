# docx-math-converter

将 LaTeX、MathML 或 OMML 字符串转换为 `docx` 可用的数学对象，支持 Node.js 和浏览器环境。

项目已经内置 MathML 到 OMML 的转换能力，使用时不需要再额外安装 `@seewo-doc/mathml2omml`。

## 特性

- 支持 `LaTeX -> Math`
- 支持 `MathML -> Math`
- 支持 `OMML -> Math`
- 可直接配合 `docx` 生成 `.docx` 文件

## 安装

```bash
pnpm add @micromatrix.org/docx-math-converter docx
```

## 环境要求

- Node.js 运行环境：`>=18.0.0`
- `docx`：`^9.6.1`
- 本仓库开发和构建使用 Vite 8，建议 Node.js：`^20.19.0 || >=22.12.0`

## API

### `convertMathMl2Math`

```ts
import { convertMathMl2Math } from '@micromatrix.org/docx-math-converter';

const mathObj = convertMathMl2Math(`
  <math display="block">
    <mrow>
      <mfrac>
        <mi>a</mi>
        <mi>b</mi>
      </mfrac>
      <mo>=</mo>
      <mfrac>
        <mrow>
          <mi>a</mi>
          <mo>×</mo>
          <mi>m</mi>
        </mrow>
        <mrow>
          <mi>b</mi>
          <mo>×</mo>
          <mi>m</mi>
        </mrow>
      </mfrac>
    </mrow>
  </math>
`);
```

### `convertOmml2Math`

```ts
import { convertOmml2Math } from '@micromatrix.org/docx-math-converter';

const mathObj = convertOmml2Math(`
  <m:oMath xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math">
    <m:rad>
      <m:deg>
        <m:r>
          <m:t>3</m:t>
        </m:r>
      </m:deg>
      <m:e>
        <m:r>
          <m:t>1234</m:t>
        </m:r>
      </m:e>
    </m:rad>
  </m:oMath>
`);
```

### `mathJaxReady`

在使用 `convertLatex2Math` 之前，需要先初始化 MathJax：

```ts
import { mathJaxReady } from '@micromatrix.org/docx-math-converter';

await mathJaxReady();
```

### `convertLatex2Math`

```ts
import { mathJaxReady, convertLatex2Math } from '@micromatrix.org/docx-math-converter';

await mathJaxReady();
const mathObj = convertLatex2Math('(a\\pm b)^2=a^2\\pm2ab+b^2');
```

## 与 `docx` 一起使用

```ts
import fs from 'node:fs';
import { Document, Packer, Paragraph } from 'docx';
import { convertLatex2Math, mathJaxReady } from '@micromatrix.org/docx-math-converter';

await mathJaxReady();

const mathObj = convertLatex2Math('\\frac{a}{b}=\\frac{a\\times m}{b\\times m}');

const doc = new Document({
  sections: [
    {
      properties: {},
      children: [
        new Paragraph({
          children: [mathObj],
        }),
      ],
    },
  ],
});

const buffer = await Packer.toBuffer(doc);
fs.writeFileSync('example.docx', buffer);
```

## 开发

```bash
pnpm install
pnpm build
pnpm test
```

## 导出内容

当前导出的方法包括：

- `convertMathMl2Math`
- `convertOmml2Math`
- `mathJaxReady`
- `convertLatex2Math`

## 参考项目

- `seewo-doc/docx-math-converter`: https://github.com/seewo-doc/docx-math-converter
- `fiduswriter/mathml2omml`: https://github.com/fiduswriter/mathml2omml

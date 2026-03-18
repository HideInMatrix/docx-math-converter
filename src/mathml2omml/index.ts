// Vendored from fiduswriter/mathml2omml under LGPL-3.0-or-later.
import { parse, stringifyDoc } from './parse-stringify';
import { walker } from './walker';

export interface MML2OMMLOptions {
  disableDecode?: boolean;
  components?: Record<string, unknown>;
}

export class MML2OMML {
  private inXML: any;
  private outXML: any;
  private outString: string;

  constructor(mmlString: string, options: MML2OMMLOptions = {}) {
    this.inXML = parse(mmlString, options);
    this.outXML = false;
    this.outString = '';
  }

  run() {
    const outXML = {};
    walker({ children: this.inXML, type: 'root' }, outXML);
    this.outXML = outXML;
  }

  getResult(): string {
    this.outString = stringifyDoc([this.outXML]);
    return this.outString;
  }
}

export const mml2omml = (mmlString: string, options?: MML2OMMLOptions) => {
  const converter = new MML2OMML(mmlString, options);
  converter.run();
  return converter.getResult();
};

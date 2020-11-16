import * as nodePath from 'path';

import { validateFilenames } from '../src/validate-filenames';

const TEST_CONFIGS = {
  anyCharacter: { path: '05-contains-a-files', pattern: '^.+$' },
  nameDotExtension: {
    path: '02-name-dot-extension-files',
    pattern: '^.+\\..+$',
  },
  dotFile: { path: '03-dot-files', pattern: '^\\..+$' },
  noDot: { path: '04-no-dot-files', pattern: '^[^\\.].+$' },
  containsA: { path: '05-contains-a-files', pattern: 'a+' },
  json: { path: '06-json-files', pattern: '\\.json$' },
};

let spy: jest.SpyInstance;

beforeEach(() => {
  // We silence the console for better readability in tests
  spy = jest.spyOn(console, 'log').mockImplementation();
});

afterEach(() => {
  spy.mockRestore();
});

describe('Name of the group', () => {
  it('01 - Passes for any character files', async () => {
    const testConfig = TEST_CONFIGS.anyCharacter;
    const path = nodePath.join(__dirname, 'test-files', testConfig.path);
    const pattern = new RegExp(testConfig.pattern);

    const expected = { totalFilesAnalyzed: 5, failedFiles: [] };

    await expect(validateFilenames(path, pattern)).resolves.toEqual(expected);
  });

  it('02 - Passes for `name.ext` files', async () => {
    const testConfig = TEST_CONFIGS.nameDotExtension;
    const path = nodePath.join(__dirname, 'test-files', testConfig.path);
    const pattern = new RegExp(testConfig.pattern);

    const expected = { totalFilesAnalyzed: 1, failedFiles: [] };

    await expect(validateFilenames(path, pattern)).resolves.toEqual(expected);
  });

  it('03 - Passes for `.dotfiles`', async () => {
    const testConfig = TEST_CONFIGS.dotFile;
    const path = nodePath.join(__dirname, 'test-files', testConfig.path);
    const pattern = new RegExp(testConfig.pattern);

    const expected = { totalFilesAnalyzed: 1, failedFiles: [] };

    await expect(validateFilenames(path, pattern)).resolves.toEqual(expected);
  });

  it('04 - Passes for no `.dotfiles`', async () => {
    const testConfig = TEST_CONFIGS.noDot;
    const path = nodePath.join(__dirname, 'test-files', testConfig.path);
    const pattern = new RegExp(testConfig.pattern);

    const expected = { totalFilesAnalyzed: 5, failedFiles: [] };

    await expect(validateFilenames(path, pattern)).resolves.toEqual(expected);
  });

  it('05 - Passes for files with `a` in the name', async () => {
    const testConfig = TEST_CONFIGS.containsA;
    const path = nodePath.join(__dirname, 'test-files', testConfig.path);
    const pattern = new RegExp(testConfig.pattern);

    const expected = { totalFilesAnalyzed: 5, failedFiles: [] };

    await expect(validateFilenames(path, pattern)).resolves.toEqual(expected);
  });

  it('06 - Passes for json files `*.json`', async () => {
    const testConfig = TEST_CONFIGS.json;
    const path = nodePath.join(__dirname, 'test-files', testConfig.path);
    const pattern = new RegExp(testConfig.pattern);

    const expected = { totalFilesAnalyzed: 5, failedFiles: [] };

    await expect(validateFilenames(path, pattern)).resolves.toEqual(expected);
  });
});

import * as core from '@actions/core';
import * as github from '@actions/github';

import { validateFilenames } from './validate-filenames';

const DEFAULT_PATTERN = '^.+\\..+$';
const DEFAULT_PATH = '.';

async function run(): Promise<void> {
  try {
    console.log('====================');
    console.log('|  Lint Filenames  |');
    console.log('====================');

    const path = core.getInput('path', { required: true }) || DEFAULT_PATH;
    const pattern = new RegExp(
      core.getInput('pattern', { required: true }) || DEFAULT_PATTERN
    );

    const output = await validateFilenames(path, pattern);

    core.setOutput('total-files-analyzed', output.totalFilesAnalyzed);

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    core.debug(`The event payload: ${payload}`);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error);
    } else {
      core.setFailed('An unknown error occurred. Check the logs for details');
    }
  }
}

run();

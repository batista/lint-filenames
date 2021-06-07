import { promisify } from 'util';
import g from 'glob';
const glob = promisify(g);

export async function validateFilenames(
  path: string,
  pattern: RegExp
): Promise<{
  totalFilesAnalyzed: number;
  failedFiles: string[];
}> {
  console.log(`ℹ️  Path:    \t\t'${path}'`);
  console.log(`ℹ️  Pattern: \t\t${pattern}`);
  const failedFiles = [];
  let totalFilesAnalyzed = 0;

  try {
    const filesList = await glob(path);
    const files = filesList.map(f => {
      return {
        fullPath: f,
        name: f.split('/').pop() || '',
      };
    });

    console.log('Verification starting...');
    for await (const file of files) {
      totalFilesAnalyzed++;
      if (pattern.test(file.name)) {
        console.log(`  ✔️  ${file.fullPath}`);
      } else {
        console.log(`  ❌  ${file.fullPath}`);
        failedFiles.push(file.fullPath);
      }
    }
    console.log('Verification finished.');
    console.log(`ℹ️  Files analyzed: \t${totalFilesAnalyzed}`);
  } catch (error) {
    throw new Error('Execution failed, see log above. ❌');
  }

  if (failedFiles.length) {
    throw new Error(
      `${failedFiles.length} files not matching the pattern were found, see log above. ❌`
    );
  } else {
    console.log('✅ Success: All files match the given pattern!');
    return {
      totalFilesAnalyzed,
      failedFiles,
    };
  }
}

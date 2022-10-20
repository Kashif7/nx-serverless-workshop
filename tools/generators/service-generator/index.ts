import { Tree, names, generateFiles, joinPathFragments, formatFiles, installPackagesTask } from '@nrwl/devkit';
import { Schema } from './schema';
import { addWorkspaceConfig } from "./workspace-config";

export default async function (tree: Tree, schema: Schema) {
  const serviceRoot = `services/${schema.name}`;

  const fileName = names(schema.name);

  generateFiles(tree, joinPathFragments(__dirname, './files'), serviceRoot, {
    ...schema,
    fileName,
    tmpl: ''
  });

  addWorkspaceConfig(tree, schema.name, serviceRoot);

  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}

import { addProjectConfiguration, Tree } from '@nrwl/devkit';

const buildRunCommandConfig = (dir: string, command: string) => ({

  executor: '@nrwl/workspace:run-commands',

  options: {

    cwd: dir,

    color: true,

    command: command

  }

});

export const addWorkspaceConfig = (

  host: Tree,

  projectName: string,

  serviceRoot: string

) => {

  addProjectConfiguration(host, projectName, {

    root: serviceRoot,

    projectType: 'application',

    sourceRoot: `${serviceRoot}`,

    targets: {

      build: {

        ...buildRunCommandConfig(serviceRoot, 'sls package')

      },

      serve: {

        ...buildRunCommandConfig(serviceRoot, 'sls offline start')

      },

      deploy: {

        ...buildRunCommandConfig(serviceRoot, 'serverless deploy --verbose'),

        dependsOn: [

          {

            target: 'deploy',

            projects: 'dependencies'

          }

        ]

      },

      lint: {

        executor: '@nrwl/linter:eslint',

        outputs: ['{options.outputFile}'],

        options: {

          lintFilePatterns: [`${serviceRoot}/**/*.ts`]

        }

      },

      typeCheck: {

        executor: '@nrwl/workspace:run-commands',

        options: {

          cwd: serviceRoot,

          color: true,

          command: 'tsc --project tsconfig.lib.json --noEmit'

        }

      },
    },

    tags: ['service']

  });

};
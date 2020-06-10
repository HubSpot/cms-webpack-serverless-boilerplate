## CMS webpack-bundled serverless functions boilerplate [beta]
Simple boilerplate for using webpack to bundle serverless function with third-party deps

### Installation
1. `git clone` this repo
2. `yarn install`
3. If you're not yet set up with the [CMS CLI](https://designers.hubspot.com/tutorials/getting-started#quick_start) and have a specified `defaultPortal`, use `yarn hs init` to generate a CMS Personal Access Key.
4. `yarn build` to build with webpack into `/dist`
5. `yarn deploy` to build and deploy to `defaultPortal`
6. `yarn start` to build, deploy, and watch/auto-upload to `defaultPortal`]

### Additional setup for `/top-landing-pages` endpoint
1. Via Settings > Integrations > API Key, copy your API key.
2. Use `hs secrets add APIKEY < your api key here>` to give access to this key in your serverless functions via `process.env`. [Read more about this feature here](https://designers.hubspot.com/docs/developer-reference/local-development-cms-cli#serverless-commands).

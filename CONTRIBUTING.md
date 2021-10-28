# Contributing to a11y-tabs

Thanks for your interest in contributing to a11y-tabs.

## Setup
All the following commands assume you're in the project's root-level directory.

### Install dependencies

```shell
yarn install # or npm install
```

### Run Cypress

Everything is done against the cypress/fixtures/*.html pages at the moment. You can run cypress in CI aka headless or in test mode which fires up a browser (useful for debugging and visual inspection).

```shell
yarn ci # run headless
yarn test # run in a browser / cypress development environment
```

_Alternatively, at time of writing you can just double click one of the `cypress/fixtures/*.html` files to experiment directly in the browser's file:/// viewer._

### Build the project

```shell
yarn build # or npm run build
```

This utilize rollup to generate both esm and umd builds in the `./dist` directory.

### Size

You can view the size of minified and gzip'd of a11y-tabs.js by running:

```shell
yarn size # generates a tarball, lists its size, then removes said tarball
```
## Pull requests

**Please suggest a change before starting to code a new feature or bugfix.**

We'd really hate for you to invest a lot of time and effort into a bugfix or new feature just to
have it rejected because it's already being tackled, or the idea doesn't align with our roadmap. To avoid this, we request that contributors first create [an issue](https://github.com/agnosticui/agnosticui/issues) to first discuss the bug or feature.

## Bug reports

A bug is a _demonstrable problem_ that is caused by the code in the repository.
Good bug reports are extremely helpful, so thanks!

Here are some best practices before creating an issue:

0. **[Validate your HTML](https://html5.validator.nu/)** to ensure your
   problem isn't caused by a simple error in your own code.

1. **Use the GitHub issue search** &mdash; check if the issue has already been
   reported.

2. **Check if the issue hasn't already been fixed** &mdash; try to reproduce it using the
   latest `master` in the repository.

3. **Isolate the problem** &mdash; ideally create a [reduced test
   case](https://css-tricks.com/reduced-test-cases/) and a live example. For more dynamic
   examples use [codesandbox](https://codesandbox.io/), [codepen](https://codepen.io/), or any
   tool that suffienntly loads the dependencies required to reproduce said use case.

Please try to be as detailed as possible in your report. What is
your environment, OS, browser, etc.? List the exact steps to reproduce the issue. Then,
list the expected results vs. actual results. These seemingly mundane details will really
help contributors and/or reviewers understand and tackle the problem efficiently.

Example template:

> Short descriptive bug report and title
>
> A summary of issue, browser/OS environment; and steps to reproduce:
>
> 1. This is the first step
> 2. This is the second step
> 3. Further steps, etc.
>    Expected outcome.
>    Actual outcome.
>
> `<url>` - a link to the reduced test case

## Feature requests

Feature requests are certainly welcome. But, first please take a moment to determine
whether your idea fits with the scope of AgnosticUI. Keep in mind that we''d like to
keep the surface API from growing too large (we may eventually open an _Addons_ side
project for more complex components. But, our goal is to cover core primitive components
that can be used as building blocks for your own custom design systems.

Of course if you're willing to contribute with pull requests and/or proof-of-concept code
sandboxes or pens, all the better. As is with many open source projects, this is a labor of
love done on the maintainer's spare time; so, unfortnately, we can't tackle everything that
comes our way.

## Pull requests
### License

By contributing your code,, you agree to allow the project owners to
license your work under the terms of the [The MIT License (MIT)](./LICENSE).


We deeply appreciate bug reports or feature suggestions that come with an
investment from the reporter. Especially a GitHub pull request!

However, again **please do ask first** before embarking on any **significant** coding
effort so we can confirm the idea. For something more trivial that doesn't require too
much of your time, you can go ahead and make a PR preemptively.

### Forking model

We use the following fork-pull-request model:

1. [Fork](https://help.github.com/articles/fork-a-repo/) the project, clone your fork,
   and configure the remotes:

   ```bash
   # Use GitHub interface to fork the repo into your own forked repo
   # Then, clone your fork of the repo onto your local machine
   git clone https://github.com/<your-username>/agnosticui.git
   # Navigate to the newly cloned directory
   cd agnosticui
   # Now add "upstream" for our upstream repo to a remote called "upstream"
   git remote add upstream https://github.com/agnosticui/agnosticui.git
   ```

2. If you cloned a while ago, get the latest changes from upstream:

   ```bash
   git checkout master
   git pull --rebase upstream master
   ```

3. Create a new topic branch (off the main project development branch) to
   contain your feature, change, or fix:

   ```bash
   git checkout -b <topic-branch-name>
   ```

4. Commit your changes in logical chunks. Please adhere to these [git commit
   message guidelines](https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
   or your code is unlikely be merged into the main project. Use Git's
   [interactive rebase](https://help.github.com/articles/about-git-rebase/)
   feature to tidy up your commits before making them public.

5. Locally merge (or rebase) the upstream development branch into your topic branch:

   ```bash
   git pull [--rebase] upstream master
   ```

6. Push your topic branch up to your fork:

   ```bash
   git push origin <topic-branch-name>
   ```

7. [Open a Pull Request](https://help.github.com/articles/about-pull-requests/)
   with a clear title and description against the `master` branch.

_For visual changes, it never hurts to leave some screen grabs on the pull request._

**IMPORTANT**: By submitting a patch, you agree to allow the project owners to
license your work under the terms of the [The MIT License (MIT)](./LICENSE).

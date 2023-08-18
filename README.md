# sg-toolkit-version-incrementor
This action serves as a valuable tool for version control when extending an existing ShotGrid toolkit app, framework, or engine with minor enhancements. When engaging in this type of development, the workflow typically involves taking the original parent code, incorporating your modifications, and subsequently deploying this customized version into your pipeline. In essence, your deployment encapsulates both the base version of the app and the specific changes you've introduced.

To achieve this, the action appends a version suffix to the existing version number, facilitating clear differentiation between the original and the enhanced versions.

## Input

The input `tag` refers to the specific tag against which you wish to increment the version. Typically, this would correspond to the most recent tag within the repository.

On the other hand, the input `base-version` pertains to the version of the original parent application, framework, or engine from which you initially forked.

* `tag`: `v1.2.3.1`
* `base-version`: `v1.2.3`

## Output

This action has an output, `version`, indicating the newly bumped version.

* `version`: `v1.2.3.2`

## Example

The following example works together with the [`Falcons-Creative-Group/github-action-get-previous-tag`](https://github.com/Falcons-Creative-Group/github-action-get-previous-tag) action.

```yaml
name: Create and push a new tag
jobs:
  pushtag:
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0 # Required due to the way Git works, without it this action won't be able to find any or the correct tags

      - name: 'Get Previous tag'
        id: previoustag
        uses: "Falcons-Creative-Group/github-action-get-previous-tag@v1"
        with:
          fallback: v1.2.3 # Optional fallback tag to use when no tag can be found

      - name: 'Increment version'
        id: increment-version
        uses: "Falcons-Creative-Group/sgtk-version-increment-action@v2"
        with:
          tag: ${{ steps.previoustag.outputs.tag }}
          base-version: 'v1.2.3'

      - name: Push tag
        id: tag-version
        uses: "Falcons-Creative-Group/github-tag-action@v6.1"
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          custom_tag: ${{ steps.increment-version.outputs.version }}
          tag_prefix: ''  # Ignore 'v' prefix because custom_tag has 'v' prefix already
```

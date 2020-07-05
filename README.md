# semantic-git-version-action
Github action that extracts a version number from the git branch name

ex: releases/release-v1.0.0 -> 1.0.0

## Outputs

| Output |  |
| ------ | ------ |
| VERSION |The full extracted version |
| MAJOR_VERSION | Major version extracted from the name. First digit in the version scheme |
| MINOR_VERSION | Minor version extracted from the name. Second digit in the version scheme (if present) |
| PATCH_VERISON | Patch version extracted from the name. Third digit in the version scheme (if present) |

This plugin only looks at the first 3 digits, rest is ignored.
